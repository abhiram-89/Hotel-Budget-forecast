import json
from typing import Any,List,Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pymongo import MongoClient
from mcp_agent.core.fastagent import FastAgent
import uuid
from config import MONGO_URI, DB_NAME, SOURCE_COLLECTION_NAME
from pymongo import MongoClient

class UploadRequest(BaseModel):
    rows: list[Dict[str, Any]]


fast = FastAgent("Hotel")

#  Agents 
@fast.agent(
    name="Data_Collection_Agent",
    instruction="""
Validate data presence in MongoDB collection 'historical_data'.
If an Excel path is provided in the user query, use 'process_excel_and_save' to load into 'historical_data'.
Required fields ultimately used for modeling: year, month, Room Revenue, avg_adr, occupancy.
""",
    servers=["forecast"]
)
def Data_Collection_Agent():
    pass


@fast.agent(
    name="Forecasting_Agent",
    instruction="""
Use 'forecast_tool_from_mongodb' (default 12 months) to generate forecasts from 'historical_data'.
Save outputs into MongoDB collection 'predicted_data' with fields:
year, month, Room Revenue, avg_adr, occupancy.
Return a compact JSON string of the inserted/updated records.
""",
    servers=["forecast"]
)
def Forecasting_Agent():
    pass


@fast.agent(
    name="Data_Evaluation_Agent",
    instruction="""
Use 'evaluate_collection' on 'predicted_data' to clean/standardize data:
- cap occupancy between 0..100
- round numbers appropriately
- ensure 'year' and 'month' are integers.
""",
    servers=["forecast"]
)
def Data_Evaluation_Agent():
    pass


@fast.agent(
    name="Reporting_Agent",
    instruction="""
Use 'generate_report' to export a timestamped Excel file into the local folder './predicted_data'.
The file MUST be named 'forecast_report_<timestamp>.xlsx'.
Return a JSON string including 'file_path'.
""",
    servers=["forecast"]
)
def Reporting_Agent():
    pass


#  Chain 
@fast.chain(
    name="Forecast_Workflow",
    sequence=[
        "Data_Collection_Agent",
        "Reporting_Agent",
        "Data_Evaluation_Agent",
        "Forecasting_Agent"
    ]
)
def Forecast_Workflow():
    pass


#  FastAPI 
app = FastAPI()

class QueryRequest(BaseModel):
    query: str

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/forecast_data")
async def forecast_data(request: QueryRequest):
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    try:
        async with fast.run() as agent:
            result: Any = await agent(query, agent_name="Forecast_Workflow")

        result_str = result.strip()
        if "\n" in result_str:
            lines = [ln.strip() for ln in result_str.splitlines() if ln.strip()]
            json_candidates = [ln for ln in lines if ln.startswith("{") or ln.startswith("[")]
            result_str = json_candidates[0] if json_candidates else lines[0]
        try:
            parsed = json.loads(result_str)
            return JSONResponse(content={"status": "success", "data": parsed})
        except Exception:
            return JSONResponse(content={"status": "success", "raw": result_str})

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the request: {e}"
        )



@app.post("/api/upload")
def upload_data(req: UploadRequest):
    batch_id = str(uuid.uuid4())
    docs = [{**row, "batchId": batch_id} for row in req.rows]
    with MongoClient(MONGO_URI) as client:
        db = client[DB_NAME]
        collection = db[SOURCE_COLLECTION_NAME]
        collection.insert_many(docs)
    return {"message": "Data saved", "batchId": batch_id}