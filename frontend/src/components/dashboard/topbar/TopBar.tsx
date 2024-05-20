import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../../home/Logo";
import useSnackbar from "../../../hooks/useSnackBar";
import { useEffect } from "react";
import { eventBus } from "../../../hooks/eventBus";

interface Props {
  handleDrawerToggle: () => void;
}

const TopBar = (props: Props) => {

  const handleDrawerToggle = props.handleDrawerToggle;
  //snackbar
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      //console.log(customEvent.detail.message);
      showSnackbar(customEvent.detail.message, customEvent.detail.severity);
    };

    eventBus.on('customEvent', handleEvent);

    return () => {
      eventBus.off('customEvent', handleEvent);
    };
  }, []);

  return (
    <>
    <AppBar position="fixed" elevation={0} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
      <Toolbar>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
      </IconButton>
        <Logo/>
      </Toolbar>
    </AppBar>
    <SnackbarComponent />
    </>
  )
}

export default TopBar