import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/mainlayout";
import Dashboard from "./pages/Dashboard";
import HistoricalData from "./pages/historicaldata";
import PredictedData from "./pages/predicteddata";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/historicaldata" element={<HistoricalData />} />
        <Route path="/predicteddata" element={<PredictedData />} />
      </Route>
    </Routes>
  );
};

export default App;
