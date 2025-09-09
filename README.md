
# Hotel-Budget-forecast
Hotel Budget Forecast is an AI-driven forecasting system designed to help hotels predict their future revenue and expenses with higher accuracy.
The project leverages FastAgents and FastMCPs to orchestrate data collection, preprocessing, forecasting, evaluation, and reporting. Results are stored in MongoDB and displayed through a React-based UI with graphical and tabular representations powered by Recharts.

This system enables hotel management teams to make data-driven budgetary decisions by visualizing historical data, predicted values, and performance evaluation reports.

System Workflow

Agents
-------

-> Data Collector Agent → Collects raw historical data.

-> Data Preprocessor Agent → Cleans and formats data for forecasting.

-> Forecast Agent → Uses Prophet MCP to generate predictions.

-> Evaluator Agent → Validates forecast accuracy using evaluation metrics.

-> Report Generator Agent → Prepares a structured forecast report for business stakeholders.

 MCPs
 ------

Excel MCP → Reads/writes Excel files.

-> MongoDB MCP → Stores historical and predicted data.

-> DataClean MCP → Handles missing values, outliers, and data normalization.

-> Prophet MCP → Generates time-series forecasts.

-> Evaluator MCP → Measures accuracy (e.g., RMSE, MAPE).

-> Report MCP → Creates structured forecast reports.

Frontend (User Interface)
-------------------------

Built with React.

=> Uses Recharts for graphical visualization (line charts, bar charts, etc.).

=> Tabular data display for historical vs. predicted values.

=> Interactive controls for running forecasts and viewing reports.

Tech Stack
----------

-> Backend: FastAPI, FastAgents, FastMCPs, Prophet
-> Database: MongoDB
-> Frontend: React, Recharts, Material-UI
-> Integration: REST APIs between FastAPI backend and React frontend

Features
--------

1.End-to-end forecast pipeline using agents and MCPs
2.Data cleaning and preprocessing for reliable predictions
3.Time-series forecasting with Prophet
4.Accuracy evaluation metrics
5.Report generation for business use
6.Interactive dashboard with charts and tables


Screenshots
-------------![WhatsApp Image 2025-09-09 at 3 56 47 PM](https://github.com/user-attachments/assets/aec26612-4d63-4b2b-af96-84fe58a241f2)
![WhatsApp Image 2025-09-09 at 3 56 48 PM (1)](https://github.com/user-attachments/assets/e5c88832-95c1-4f2c-a2ac-b857fa7c09e4)
![WhatsApp Image 2025-09-09 at 3 56 49 PM](https://github.com/user-attachments/assets/e7792502-5222-446e-a6e3-fa8260cdcda4)
![WhatsApp Image 2025-09-09 at 3 56 47 PM (2)](https://github.com/user-attachments/assets/039185ff-b17e-4622-8bf4-92307afba19d)
![WhatsApp Image 2025-09-09 at 3 56 48 PM](https://github.com/user-attachments/assets/bcc50c06-5711-4de0-af36-cc2e2c739e28)
![WhatsApp Image 2025-09-09 at 3 56 47 PM (1)](https://github.com/user-attachments/assets/a0982e9f-7983-405c-b43f-4f191b0b3f2a)
![WhatsApp Image 2025-09-09 at 3 56 50 PM (1)](https://github.com/user-attachments/assets/18d46087-1cf4-4195-91fb-dfa7ea4d338f)


