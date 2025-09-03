import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Container, Typography, Paper, Card, CardContent, CircularProgress,
  Alert, Box, Grid, LinearProgress, Button, Collapse,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler
} from "chart.js";
import { fetchForecastData } from "../services/api"; 

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

function Forecast() {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [query, setQuery] = useState("Generate 12 months data");

  const handleForecastSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchForecastData(query);
      if (data.length === 0) {
        setError("No forecast data returned from the server.");
        setForecastData([]);
      } else {
        setForecastData(data);
      }
    } catch (err) {
      setError(err.message);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const kpiData = useMemo(() => {
    if (!forecastData.length) {
      return { avgOccupancy: 0, avgAdr: 0, totalRevenue: 0, maxAdr: 0, maxRevenue: 0, avgRevenue: 0 };
    }
    const totalOccupancy = forecastData.reduce((acc, item) => acc + item.occupancy, 0);
    const totalAdr = forecastData.reduce((acc, item) => acc + item.avg_adr, 0);
    const totalRevenue = forecastData.reduce((acc, item) => acc + item.room_revenue, 0);
    const maxAdr = Math.max(...forecastData.map(d => d.avg_adr));
    const maxRevenue = Math.max(...forecastData.map(d => d.room_revenue));
    return {
      avgOccupancy: totalOccupancy / forecastData.length,
      avgAdr: totalAdr / forecastData.length,
      totalRevenue,
      maxAdr,
      maxRevenue,
      avgRevenue: totalRevenue / forecastData.length
    };
  }, [forecastData]);

  const chartData = {
    labels: forecastData.map(d => d.label),
    datasets: [
      {
        label: "Occupancy (%)",
        data: forecastData.map(d => d.occupancy),
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.1)",
        tension: 0.4, fill: true, yAxisID: "y",
      },
      {
        label: "Avg ADR ($)",
        data: forecastData.map(d => d.avg_adr),
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.4, fill: true, yAxisID: "y",
      },
      {
        label: "Room Revenue ($)",
        data: forecastData.map(d => d.room_revenue),
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.1)",
        tension: 0.4, fill: true, yAxisID: "y1",
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: "top" } },
    scales: {
      x: { grid: { display: false } },
      y: {
        type: "linear", position: "left",
        title: { display: true, text: "Occupancy (%) & ADR ($)" }
      },
      y1: {
        type: "linear", position: "right",
        title: { display: true, text: "Room Revenue ($)" },
        grid: { drawOnChartArea: false },
      },
    }
  };

  const progressBarStyles = {
    mt: 2, height: 8, borderRadius: 5,
    backgroundColor: "rgba(25, 42, 86, 0.2)",
    "& .MuiLinearProgress-bar": { backgroundColor: "#192A56" }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
      {/* --- Query Input Form --- */}
      <Paper component="form" onSubmit={handleForecastSubmit}
        sx={{ p: 2, mb: 3, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
        <TextField
          fullWidth
          label="Enter Forecast Command"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" variant="contained" disabled={loading}
          sx={{ backgroundColor: "#192A56", "&:hover": { backgroundColor: "#111e3c" },
          height: "56px", minWidth: "150px", justifyContent:'center' }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Run Forecast"}
        </Button>
      </Paper>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40vh" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>Generating forecast...</Typography>
        </Box>
      )}

      {error && !loading && (
        <Alert severity="error" variant="filled" sx={{ mt: 2 }}>{error}</Alert>
      )}

      {!loading && !error && forecastData.length > 0 && (
        <>
          {/* --- KPI Cards --- */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Avg. Occupancy</Typography>
                <Typography variant="h5">{kpiData.avgOccupancy.toFixed(2)}%</Typography>
                <LinearProgress variant="determinate" value={kpiData.avgOccupancy} sx={progressBarStyles} />
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Avg. ADR</Typography>
                <Typography variant="h5">${kpiData.avgAdr.toFixed(2)}</Typography>
                <LinearProgress variant="determinate" value={(kpiData.avgAdr / (kpiData.maxAdr * 1.1)) * 100 || 0} sx={progressBarStyles} />
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Avg. Monthly Revenue</Typography>
                <Typography variant="h5">${kpiData.avgRevenue.toLocaleString()}</Typography>
                <LinearProgress variant="determinate" value={(kpiData.avgRevenue / kpiData.maxRevenue) * 100 || 0} sx={progressBarStyles} />
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Total Revenue</Typography>
                <Typography variant="h5">${kpiData.totalRevenue.toLocaleString()}</Typography>
                <LinearProgress variant="determinate" value={100} sx={progressBarStyles} />
              </CardContent></Card>
            </Grid>
          </Grid>

          {/* --- Chart --- */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography align="center" variant="h6" gutterBottom>
                Forecast Trends For Next {forecastData.length} Months
              </Typography>
              <Box sx={{ height: { xs: 250, md: 400 }, width: "100%" }}>
                <Line data={chartData} options={chartOptions} />
              </Box>
            </CardContent>
          </Card>

          {/* --- Collapsible Data Table --- */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => setIsTableVisible(!isTableVisible)}
              endIcon={isTableVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              sx={{ backgroundColor: "#192A56", "&:hover": { backgroundColor: "#111e3c" } }}
            >
              {isTableVisible ? "Hide Data Table" : "Show Data Table"}
            </Button>
          </Box>

          <Collapse in={isTableVisible}>
            <Paper sx={{ width: "100%", overflow: "auto", borderRadius: 2 }}>
              <TableContainer>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "#192A56", color: "white" }}>Metric</TableCell>
                      {forecastData.map(item => (
                        <TableCell key={`${item.year}-${item.month}`} align="center"
                          sx={{ backgroundColor: "#192A56", color: "white" }}>
                          {item.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: "bold" }}>Occupancy (%)</TableCell>
                      {forecastData.map(item => (
                        <TableCell key={`${item.year}-${item.month}-occ`} align="center">
                          {item.occupancy.toFixed(2)}%
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: "bold" }}>Avg. ADR</TableCell>
                      {forecastData.map(item => (
                        <TableCell key={`${item.year}-${item.month}-adr`} align="center">
                          ${item.avg_adr.toFixed(2)}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow hover>
                      <TableCell sx={{ fontWeight: "bold" }}>Room Revenue</TableCell>
                      {forecastData.map(item => (
                        <TableCell key={`${item.year}-${item.month}-rev`} align="center">
                          ${item.room_revenue.toLocaleString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Collapse>
        </>
      )}
    </Container>
  );
}

export default Forecast;
