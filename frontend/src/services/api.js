import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

export const fetchForecastData = async (query) => {
  try {
    const res = await axios.post(`${apiUrl}/forecast_data`, { query });
    const rawData = res.data?.data?.result;
    const resultArray = Array.isArray(rawData) ? rawData : rawData ? [rawData] : [];

    return resultArray.map(item => ({
      year: item.year,
      month: item.month,
      occupancy: Number(item.occupancy ?? 0),
      avg_adr: Number(item.avg_adr ?? 0),
      room_revenue: Number(item.room_revenue ?? item["Room Revenue"] ?? 0),
      label: new Date(item.year, item.month - 1).toLocaleDateString("en-US", {
        month: "short", year: "numeric"
      })
    }));
  } catch (err) {
    console.error("API Error:", err);
    if (err.response) {
      throw new Error(err.response.data?.detail || `Server error: ${err.response.status}`);
    } else if (err.request) {
      throw new Error("Could not connect to the forecast server.");
    } else {
      throw new Error(err.message);
    }
  }
};



// historical

export const uploadFileToServer = async (rows) => {
  try {
    const response = await fetch("http://localhost:8000/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rows }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save in database: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Saved in MongoDB with batchId:", result.batchId);
    return result;
  } catch (error) {
    console.error("Database save error:", error);
    throw error;
  }
};