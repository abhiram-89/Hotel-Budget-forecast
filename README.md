
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
-------------
Home Page [Dashboard]

![Home page](https://github.com/user-attachments/assets/3e314b99-7503-4aea-8be7-fd4b2e017a43)
![Rooms](https://github.com/user-attachments/assets/2454bb68-210c-444e-a5bc-7acc0372ebf9)
![features](https://github.com/user-attachments/assets/e819da16-8098-446b-8ced-9cdf51e2d43b)
![Reviews](https://github.com/user-attachments/assets/ee7fa140-ee8e-4e31-9b4e-337f145bfeea)
![Nearby hotels](https://github.com/user-attachments/assets/a395c86f-8584-42ef-9ab6-7fd4077de94e)
![Facilities](https://github.com/user-attachments/assets/482d2bf1-b663-4b74-894a-11ec0485f753)
![Footer](https://github.com/user-attachments/assets/e139914e-6db5-40ce-8f52-dbe6998fd87a)

Historical Data page
--------------------

![Data graph](https://github.com/user-attachments/assets/5ae2db3f-4a79-4f75-a879-c9cb9a972aa5)
![Output](https://github.com/user-attachments/assets/5adb84cc-ec0c-46c8-a00b-9b7c68dd1ee1)
![Table](https://github.com/user-attachments/assets/27d816b1-6a1c-4056-b7cf-d5fa620546bf)
![Month](https://github.com/user-attachments/assets/f8f7f4ca-688c-495b-9196-4efd793500ee)
![Monthtable](https://github.com/user-attachments/assets/a0af909d-f87c-4206-9ba2-e5acb4230042)


Predicted Data Page
-------------------

![Predict prompt](https://github.com/user-attachments/assets/67cbe4a0-2b57-4119-a3ff-ac6343c8eaa5)
![Graphical](https://github.com/user-attachments/assets/d683800b-a267-4c10-bbc4-7b1ff404126d)
![Graph ,table](https://github.com/user-attachments/assets/aba15792-4360-4298-9b0d-dbc8c5357628)




