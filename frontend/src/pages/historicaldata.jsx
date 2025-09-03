import React, { useState, useEffect, useRef } from "react";
import {
  Box, Card, CardContent, Typography, Select, MenuItem, FormControl,
  IconButton, LinearProgress, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, CssBaseline, ThemeProvider, createTheme, Tooltip as MuiTooltip,
  Skeleton
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";
import TableViewIcon from "@mui/icons-material/TableView";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as XLSX from "xlsx";
import { uploadFileToServer } from "../services/api";

const theme = createTheme({
  palette: { primary: { main: "#5865F2" } },
  typography: { fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif' },
  shape: { borderRadius: 12 },
});

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const monthNumFromName = (name) => MONTHS.indexOf(name) + 1;
const clamp01 = (v) => Math.max(0, Math.min(100, v || 0));

/* ---------- DashboardHeader ---------- */
const DashboardHeader = ({ year, month, setYear, setMonth, onOpenTable, onUploadClick, uploading }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", md: "auto auto 1fr auto" },
      alignItems: "center",
      gap: 1.5,
      mb: 3,
      p: 1.5,
      borderRadius: 3,
      border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <Select value={year} onChange={(e) => setYear(e.target.value)} disabled={uploading}>
        <MenuItem value="All">All Years</MenuItem>
        <MenuItem value="2023">2023</MenuItem>
        <MenuItem value="2024">2024</MenuItem>
        <MenuItem value="2025">2025</MenuItem>
      </Select>
    </FormControl>
    <FormControl size="small" sx={{ minWidth: 180 }}>
      <Select value={month} onChange={(e) => setMonth(e.target.value)} disabled={uploading}>
        <MenuItem value="All">All Months</MenuItem>
        {MONTHS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
      </Select>
    </FormControl>
    <Box sx={{ display: { xs: "none", md: "block" } }} />
    <Box sx={{ display: "flex", gap: 1 }}>
      <MuiTooltip title="Upload file">
        <span>
          <IconButton onClick={onUploadClick} disabled={uploading}>
            <UploadFileIcon />
          </IconButton>
        </span>
      </MuiTooltip>
      <Button variant="outlined" startIcon={<TableViewIcon />} onClick={onOpenTable} disabled={uploading}>
        View Table
      </Button>
    </Box>
  </Box>
);

/* ---------- ProgressCard ---------- */
const ProgressCard = ({ title, progress, value, suffix = "%" }) => (
  <Card sx={{ borderRadius: 3, bgcolor: "#f5f6ff" }}>
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>{title}</Typography>
      {value === null ? (
        <Typography variant="body2" sx={{ fontWeight: 500, color: "gray" }}>No data uploaded</Typography>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={clamp01(progress)}
              sx={{ height: 10, borderRadius: 999, "& .MuiLinearProgress-bar": { transition: "transform 300ms ease,width 300ms ease" } }}
            />
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 700 }}>{value}{suffix}</Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

/* ---------- ChartCard ---------- */
const ChartCard = ({ chartData, loading }) => (
  <Card sx={{ borderRadius: 3, mt: 3, bgcolor: "#f5f6ff", height: 320 }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>Monthly Occupancy Analytics</Typography>
      <Box sx={{ width: "100%", height: 280, position: "relative" }}>
        {loading ? <Skeleton variant="rectangular" width="100%" height="100%" /> : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid stroke="rgba(0,0,0,0.1)" vertical={false} />
              <XAxis dataKey="MonthLabel" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chartData.length > 0 && (
                <Line type="monotone" dataKey="Occupancy" stroke="#5865F2" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        )}
      </Box>
    </CardContent>
  </Card>
);

/* ---------- TableDialog ---------- */
const TableDialog = ({ open, onClose, tableData, loading }) => {
  const filteredRows = tableData.filter(row =>
    typeof row === "object" && Object.keys(row).length > 1
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle>Historical Data Table</DialogTitle>
      <DialogContent dividers>
        {loading ? [...Array(8)].map((_, idx) => <Skeleton key={idx} variant="rectangular" height={40} sx={{ mb: 1 }} />) :
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {filteredRows.length > 0 && Object.keys(filteredRows[0]).map((col, i) => <TableCell key={i} sx={{ fontWeight: 700 }}>{col}</TableCell>)}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row, i) => (
                  <TableRow key={i} hover>
                    {Object.values(row).map((val, j) => <TableCell key={j}>{String(val ?? "--")}</TableCell>)}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

/* ---------- Main Component ---------- */
export default function HistoricalData() {
  const [year, setYear] = useState("All");
  const [month, setMonth] = useState("All");
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [occValue, setOccValue] = useState(null);
  const [adrValue, setAdrValue] = useState(null);
  const fileInputRef = useRef(null);

  const parseCsv = async (file) => {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    const headers = lines[0].split(",").map(h => h.trim());
    return lines.slice(1).map(line => {
      const values = line.split(",").map(v => v.trim());
      const obj = {};
      headers.forEach((header, index) => obj[header] = values[index] || "");
      return obj;
    });
  };

  const parseXlsx = async (file) => {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(worksheet);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    try {
      let rows = [];
      const fileName = file.name.toLowerCase();

      if (fileName.endsWith(".json")) {
        const text = await file.text();
        rows = JSON.parse(text);
      } else if (fileName.endsWith(".csv")) {
        rows = await parseCsv(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        rows = await parseXlsx(file);
      } else throw new Error("Please upload a .csv, .json, or .xlsx file");

      if (!Array.isArray(rows) || rows.length === 0) throw new Error("No data rows found in the file");

      // 🔹 Call API service to upload
      await uploadFileToServer(rows);

      setData(rows);
      setYear("All");
      setMonth("All");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  // Filtering, chart calculation, and value calculations here (same as original)
  useEffect(() => {
    if (!data.length || uploading) { setFiltered([]); setChartData([]); setOccValue(null); setAdrValue(null); return; }
    let result = [...data];

    if (year !== "All") {
      const yearCol = Object.keys(data[0]).find(key => key.toLowerCase().includes("year"));
      if (yearCol) result = result.filter(r => String(r[yearCol]) === year);
    }
    if (month !== "All") {
      const monthCol = Object.keys(data[0]).find(key => key.toLowerCase().includes("month"));
      if (monthCol) result = result.filter(r => Number(r[monthCol]) === monthNumFromName(month));
    }

    setFiltered(result);

    const occCol = Object.keys(result[0] || {}).find(k => k.toLowerCase().includes("occupancy") || k.toLowerCase().includes("occ"));
    const adrCol = Object.keys(result[0] || {}).find(k => k.toLowerCase().includes("adr") || k.toLowerCase().includes("rate"));

    setOccValue(occCol ? Math.round(result.reduce((a,b)=>a+Number(b[occCol]||0),0)/result.length) : null);
    setAdrValue(adrCol ? Math.round(result.reduce((a,b)=>a+Number(b[adrCol]||0),0)/result.length) : null);

    const monthCol = Object.keys(result[0] || {}).find(k => k.toLowerCase().includes("month"));
    if (monthCol && occCol) {
      const monthlyData = {};
      result.forEach(r => monthlyData[Number(r[monthCol])] = Number(r[occCol]||0));
      const chartArray = MONTHS.map((m,i)=>({MonthLabel:m,Occupancy:monthlyData[i+1]||0}));
      setChartData(chartArray);
    }
  }, [year, month, data, uploading]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <DashboardHeader year={year} month={month} setYear={setYear} setMonth={setMonth}
            onOpenTable={() => setOpen(true)} onUploadClick={handleUploadClick} uploading={uploading} />

          <input type="file" accept=".csv,.json,.xlsx,.xls" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} disabled={uploading} />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2.5, mb: 3 }}>
            <ProgressCard title="Average Occupancy (%)" progress={occValue ?? 0} value={occValue} />
            <ProgressCard title="Average ADR" progress={adrValue !== null ? clamp01(adrValue / 10) : 0} value={adrValue} suffix="" />
          </Box>

          <ChartCard chartData={chartData} loading={uploading} />
          <TableDialog open={open} onClose={() => setOpen(false)} tableData={filtered.length ? filtered : data} loading={uploading} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}