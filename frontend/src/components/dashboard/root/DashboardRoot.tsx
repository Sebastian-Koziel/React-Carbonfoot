import { Navigate, Outlet, useNavigate } from "react-router-dom"
import MainNav from "../mainNav/MainNav"
import TopBar from "../topbar/TopBar"
import { Box, Container, CssBaseline, Toolbar } from "@mui/material"
import { useState } from "react";
import { isLogged } from "../../../storage/localStorage";

const drawerWidth = 200;

const DashboardRoot = () => {

  const isLoggedIn = isLogged();
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
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;  // Use Navigate component to redirect
  }

  return (
    <>
      <Container>
      <Box sx={{ display: 'flex' }}>
        
        <TopBar handleDrawerToggle={handleDrawerToggle} />
        <MainNav width={drawerWidth} mobileOpen={mobileOpen} handleDrawerClose={handleDrawerClose} handleDrawerTransitionEnd={handleDrawerTransitionEnd} />
        <Box component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: { xs: `10px`, sm: `200px` }
          }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      </Container>
    </>
  )
}


export default DashboardRoot
