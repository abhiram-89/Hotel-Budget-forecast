import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "hotel_budget")
SOURCE_COLLECTION_NAME = os.getenv("SOURCE_COLLECTION_NAME", "historical_data")
PREPROCESS_COLLECTION_NAME = os.getenv("PREPROCESS_COLLECTION_NAME", "historical_data")
FORECAST_COLLECTION_NAME = os.getenv("FORECAST_COLLECTION_NAME", "predicted_data")
