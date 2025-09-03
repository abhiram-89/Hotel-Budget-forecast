import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s",
        }}
      >
        <Navbar sidebarOpen={sidebarOpen} />
        <Box mt={10}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;