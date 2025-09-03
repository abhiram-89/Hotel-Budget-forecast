from typing import Any, Dict, List
import pandas as pd
from prophet import Prophet
from pymongo import MongoClient
from fastmcp import FastMCP
import os
import json
import numpy as np
from datetime import datetime

mcp = FastMCP()

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "hotel_budget"
SOURCE_COLLECTION_NAME = "historical_data"
FORECAST_COLLECTION_NAME = "predicted_data"


def _get_db():
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    return client, client[DB_NAME]


def _coerce_numeric(s):
    return pd.to_numeric(s, errors="coerce")


def _ensure_hist_schema(df: pd.DataFrame) -> pd.DataFrame:
    """
    Normalize historical schema coming from Excel/DB to ensure these columns exist and are numeric:
      - year (int)
      - month (int)
      - Room Revenue (float)
      - avg_adr (float)
      - occupancy (float, percent 0-100)
    Accepts common alternates and computes missing pieces when possible.
    """
    df.columns = [c.strip() for c in df.columns]

    # year/month
    if "year" not in df.columns or "month" not in df.columns:
        raise ValueError("Required columns 'year' and 'month' not found in historical data.")

    revenue_col = None
    for cand in ["Room Revenue", "Room Revenue", "Room Revenue", "Room Revenue", "Room Revenue"]:
        if cand in df.columns:
            revenue_col = cand
            break
    if revenue_col is None:
        raise ValueError("Could not find any revenue column (expected 'Room Revenue' or a known alias).")

    if revenue_col != "Room Revenue":
        df.rename(columns={revenue_col: "Room Revenue"}, inplace=True)

    # occupancy — accept "occupancy (%)" or "occupancy"
    if "occupancy" not in df.columns:
        if "occupancy (%)" in df.columns:
            df.rename(columns={"occupancy (%)": "occupancy"}, inplace=True)

    # avg_adr — compute if missing and rooms_sold exists
    if "avg_adr" not in df.columns:
        if "rooms_sold" in df.columns:
            df["avg_adr"] = _coerce_numeric(df["Room Revenue"]) / _coerce_numeric(df["rooms_sold"])
        else:
            # fallback: cannot compute; fill later from median after numeric coercion
            df["avg_adr"] = np.nan

    # numeric coercion
    df["year"] = _coerce_numeric(df["year"]).astype("Int64")
    df["month"] = _coerce_numeric(df["month"]).astype("Int64")
    df["Room Revenue"] = _coerce_numeric(df["Room Revenue"])
    df["avg_adr"] = _coerce_numeric(df["avg_adr"])

    if "occupancy" in df.columns:
        df["occupancy"] = _coerce_numeric(df["occupancy"])
    else:
        # If truly missing, fill with NaN; Prophet can still run on available metrics
        df["occupancy"] = np.nan

    # Fill missing avg_adr/occupancy with median where possible
    if df["avg_adr"].isna().any():
        df["avg_adr"].fillna(df["avg_adr"].median(), inplace=True)
    if df["occupancy"].isna().any():
        df["occupancy"].fillna(df["occupancy"].median(), inplace=True)

    # Drop rows missing year/month or revenue
    df = df.dropna(subset=["year", "month", "Room Revenue"])
    df["year"] = df["year"].astype(int)
    df["month"] = df["month"].astype(int)

    # Build ds
    df["ds"] = pd.to_datetime(df[["year", "month"]].assign(day=1), errors="coerce")
    df = df.dropna(subset=["ds"])

    # Clip occupancy to 0..100
    df["occupancy"] = df["occupancy"].clip(0, 100)

    return df[["year", "month", "ds", "Room Revenue", "avg_adr", "occupancy"]]


# Excel  Mongo loader 
@mcp.tool
def process_excel_and_save(source_excel_path: str) -> Dict[str, Any]:
    """
    Reads an Excel file and inserts normalized rows into MongoDB 'historical_data'.
    Safe to skip if you're already inserting data directly into MongoDB.
    """
    if not os.path.exists(source_excel_path):
        return {"status": "error", "message": f"File not found: '{source_excel_path}'"}

    try:
        df = pd.read_excel(source_excel_path)
        df = _ensure_hist_schema(df)

        base_dir = os.path.dirname(source_excel_path)
        os.makedirs(base_dir, exist_ok=True)
        base_name = os.path.splitext(os.path.basename(source_excel_path))[0]
        csv_path = os.path.join(base_dir, f"{base_name}_processed.csv")
        df.to_csv(csv_path, index=False)

        client, db = _get_db()
        try:
            coll = db[SOURCE_COLLECTION_NAME]
            records = df.drop(columns=["ds"]).to_dict(orient="records")
            if records:
                coll.insert_many(records)
        finally:
            client.close()

        return {
            "status": "success",
            "message": f"Inserted {len(records)} rows to '{SOURCE_COLLECTION_NAME}'.",
            "csv_path": csv_path
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


#  Forecast Tool (historical_data  predicted_data) 
@mcp.tool
def forecast_tool_from_mongodb(months_to_forecast: int = 12) -> Dict[str, Any]:
    """
    Trains separate Prophet models for:
      - Room Revenue (log transform)
      - avg_adr
      - occupancy
    using historical_data, and writes forecast rows to predicted_data:
      { year, month, Room Revenue, avg_adr, occupancy }
    """
    try:
        client, db = _get_db()
        try:
            src = db[SOURCE_COLLECTION_NAME]
            hist = list(src.find({}))
            if not hist:
                return {"status": "error", "message": f"No documents found in '{SOURCE_COLLECTION_NAME}'."}

            hist_df = pd.DataFrame(hist)
            hist_df = _ensure_hist_schema(hist_df)

            # Helper to fit/forecast one metric
            def _forecast(metric: str, log_transform: bool = False) -> pd.DataFrame:
                d = hist_df[["ds", metric]].rename(columns={metric: "y"}).sort_values("ds")
                if log_transform:
                    d["y"] = np.log(d["y"].replace(0, 1))
                model = Prophet(yearly_seasonality=True, seasonality_mode="additive")
                model.fit(d)
                future = model.make_future_dataframe(periods=months_to_forecast, freq="MS")
                fc = model.predict(future).tail(months_to_forecast)[["ds", "yhat"]].copy()
                if log_transform:
                    fc["yhat"] = np.exp(fc["yhat"])
                return fc

            occ_fc = _forecast("occupancy", log_transform=False)
            adr_fc = _forecast("avg_adr", log_transform=False)
            rev_fc = _forecast("Room Revenue", log_transform=True)

            # Merge by ds
            out = occ_fc.merge(adr_fc, on="ds", suffixes=("_occ", "_adr")).merge(rev_fc, on="ds")
            out = out.rename(columns={
                "yhat_occ": "occupancy",
                "yhat_adr": "avg_adr",
                "yhat": "Room Revenue",
            })

            out["year"] = out["ds"].dt.year.astype(int)
            out["month"] = out["ds"].dt.month.astype(int)
            out["occupancy"] = out["occupancy"].clip(0, 100).round(2)
            out["avg_adr"] = out["avg_adr"].round(2)
            out["Room Revenue"] = out["Room Revenue"].round(2)

            forecast_df = out[["year", "month", "Room Revenue", "avg_adr", "occupancy"]].copy()
            records: List[Dict[str, Any]] = forecast_df.to_dict(orient="records")

            # Upsert into predicted_data keyed by (year, month)
            tgt = db[FORECAST_COLLECTION_NAME]
            upserts = 0
            for r in records:
                res = tgt.update_one(
                    {"year": r["year"], "month": r["month"]},
                    {"$set": r},
                    upsert=True
                )
                upserts += 1

        finally:
            client.close()

        return {
            "status": "success",
            "result": records,
            "message": f"Forecast generated and {len(records)} rows saved/upserted to '{FORECAST_COLLECTION_NAME}'."
            
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


#  Evaluator (cleans predicted_data) 
@mcp.tool
def evaluate_collection(collection_name: str = FORECAST_COLLECTION_NAME) -> Dict[str, Any]:
    """
    Cleans 'predicted_data': caps occupancy 0..100, rounds numbers, enforces int year/month.
    """
    try:
        client, db = _get_db()
        try:
            coll = db[collection_name]
            docs = list(coll.find({}))
            if not docs:
                return {"status": "success", "message": f"No documents found in '{collection_name}'.", "rows_updated": 0}

            updated = 0
            for doc in docs:
                set_fields: Dict[str, Any] = {}

                # normalize types
                if "year" in doc:
                    try:
                        set_fields["year"] = int(doc["year"])
                    except Exception:
                        pass
                if "month" in doc:
                    try:
                        set_fields["month"] = int(doc["month"])
                    except Exception:
                        pass

                # numeric rounding/limits
                if "occupancy" in doc and doc["occupancy"] is not None:
                    try:
                        occ = float(doc["occupancy"])
                        set_fields["occupancy"] = max(0.0, min(100.0, round(occ, 2)))
                    except Exception:
                        pass

                if "avg_adr" in doc and doc["avg_adr"] is not None:
                    try:
                        set_fields["avg_adr"] = round(float(doc["avg_adr"]), 2)
                    except Exception:
                        pass

                if "Room Revenue" in doc and doc["Room Revenue"] is not None:
                    try:
                        set_fields["Room Revenue"] = round(float(doc["Room Revenue"]), 2)
                    except Exception:
                        pass

                if set_fields:
                    coll.update_one({"_id": doc["_id"]}, {"$set": set_fields})
                    updated += 1

        finally:
            client.close()

        return {"status": "success", "message": "Evaluation applied successfully.", "rows_updated": updated}

    except Exception as e:
        return {"status": "error", "message": str(e)}


#  Report (writes Excel to ./predicted_data) 
@mcp.tool
def generate_report(output_dir: str = "./predicted_reports") -> Dict[str, Any]:
    """
    Exports all rows from 'predicted_data' to a timestamped Excel file in ./predicted_data.
    Columns: year, month, Room Revenue, avg_adr, occupancy
    """
    try:
        client, db = _get_db()
        try:
            coll = db[FORECAST_COLLECTION_NAME]
            docs = list(coll.find({}, {"_id": 0}))
            if not docs:
                return {"status": "error", "message": f"No documents found in '{FORECAST_COLLECTION_NAME}'."}

            df = pd.DataFrame(docs)
            # enforce column order
            wanted = ["year", "month", "Room Revenue", "avg_adr", "occupancy"]
            for w in wanted:
                if w not in df.columns:
                    df[w] = np.nan
            df = df[wanted].sort_values(["year", "month"]).reset_index(drop=True)

            os.makedirs(output_dir, exist_ok=True)
            ts = datetime.now().strftime("%Y%m%d_%H%M%S")
            file_path = os.path.join(output_dir, f"forecast_report_{ts}.xlsx")
            df.to_excel(file_path, index=False)

        finally:
            client.close()

        return {
            "status": "success",
            "message": f"Report generated with {len(df)} rows.",
            "file_path": file_path
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


if __name__ == "__main__":
    mcp.run()
