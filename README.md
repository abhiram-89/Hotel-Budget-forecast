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

==> Uses Recharts for graphical visualization (line charts, bar charts, etc.).

==> Tabular data display for historical vs. predicted values.

==> Interactive controls for running forecasts and viewing reports.

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
