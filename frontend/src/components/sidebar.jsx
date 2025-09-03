import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HotelIcon from "@mui/icons-material/Hotel";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";

const expandedWidth = 180;
const collapsedWidth = 50;

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { text: "Historical Data", icon: HistoryIcon, path: "/historicaldata" },
    { text: "Predicted Data", icon: ShowChartIcon, path: "/predicteddata" },
  ];

  const handleLogout = () => alert("Logout clicked!");

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? expandedWidth : collapsedWidth,
        flexShrink: 0,
        transition: "width 0.3s",
        [`& .MuiDrawer-paper`]: {
          width: open ? expandedWidth : collapsedWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e1e2f",
          color: "#fff",
          borderRight: "none",
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={open ? "flex-start" : "center"}
            width="100%"
            py={2}
          >
            <HotelIcon
              sx={{ fontSize: 32, color: "#ead186ff", mr: open ? 1 : 0 }}
            />
            {open && (
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  GRAND
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  METROPOLITAN
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 , display: 'block'  }}>
                  PLAZA
                </Typography>
              </Box>
            )}
          </Box>
        </Toolbar>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mx: 2 }} />

        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => {
            const IconComp = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Tooltip
                title={!open ? item.text : ""}
                placement="right"
                key={item.text}
              >
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(item.path)}
                  sx={{
                    mx: 1,
                    mb: 4,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: open ? "flex-start" : "center",
                    height: 40,
                    "&.Mui-selected": { backgroundColor: "#33334d" },
                    "&:hover": { backgroundColor: "#2c2c3e" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#ead186ff",
                      minWidth: 0,
                      mr: open ? 2 : 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComp sx={{ fontSize: 22, mx: "auto" }} />
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* === LOGOUT AT BOTTOM === */}
      <Box sx={{ mb: 2 }}>
        <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mx: 2, mb: 1 }} />
        <Tooltip title={!open ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              mx: 0,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#2c2c3e" },
            }}
          >
            <ListItemIcon
              sx={{ color: "#cd3535ff", minWidth: 0, display: "flex" }}
            >
              <LogoutIcon sx={{ fontSize: 26, mx: "auto" }} />
            </ListItemIcon>
            {open && (
              <ListItemText
                primary="Logout"
                primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
              />
            )}
          </ListItemButton>
        </Tooltip>
      </Box>
    </Drawer>
  );
};

export default Sidebar;