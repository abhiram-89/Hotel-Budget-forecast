import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";

const expandedWidth = 180;
const collapsedWidth = 50;

const Navbar = ({ sidebarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleProfileOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);

  const pageTitles = {
    "/dashboard": "Hotel Profile",
    "/historicaldata": "Historical Data",
    "/predicteddata": "Predicted Data",
  };

  const getPageTitle = () => pageTitles[location.pathname] || "Page";

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(90deg, #393963ff 0%, #1e1e2f 100%)",
        color: "#fff",
        marginLeft: sidebarOpen ? expandedWidth : collapsedWidth,
        width: sidebarOpen
          ? `calc(100% - ${expandedWidth}px)`
          : `calc(100% - ${collapsedWidth}px)`,
        transition: "margin 0.3s, width 0.3s",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          {getPageTitle()}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton sx={{ color: "#fff" }}>
            <NotificationsIcon />
          </IconButton>
          <Box
            onMouseEnter={handleProfileOpen}
            onMouseLeave={handleProfileClose}
          >
            <IconButton sx={{ color: "#fff" }}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem>
                <PersonIcon fontSize="small" sx={{ mr: 1 }} /> username
              </MenuItem>
              <MenuItem>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;