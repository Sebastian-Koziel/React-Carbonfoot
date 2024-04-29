import { Outlet } from "react-router-dom"
import MainNav from "../mainNav/MainNav"
import TopBar from "../topbar/TopBar"
import { Box, CssBaseline, Toolbar } from "@mui/material"
import { useState } from "react";

const drawerWidth = 200;

const DashboardRoot = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
      console.log(`togle`)
    }
  };

  return (
    <>
     <Box sx={{ display: 'flex' }}>
     <CssBaseline />
      <TopBar handleDrawerToggle={handleDrawerToggle}/>
      <MainNav width={drawerWidth} mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} handleDrawerTransitionEnd={handleDrawerTransitionEnd}/>
      <Box component="main"
        sx={{ 
          flexGrow: 1,
          p: 3,
          marginLeft: { xs: `10px`, sm: `200px`}
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
    </>
  )
}

export default DashboardRoot
