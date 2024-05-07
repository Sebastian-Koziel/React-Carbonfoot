
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { isLogged } from "../../storage/localStorage";



const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


    useEffect(() => {
        const loggedIn = isLogged();
        setIsLoggedIn(loggedIn);
    }, []); 

  return (
    
        <AppBar
        elevation={0}
        sx={{
            height: 60,
            background: `white`,
            position:`sticky`,
            
        }}
        >
            <Container sx={{height: `100%`}}>
                <Stack direction="row" alignItems="center" sx={{height: `100%`}} justifyContent="space-between">
                {/* Logo */}
                <Logo />
                {/* links */}
                <Box>
                    Links
                </Box>
                {/* action buttons */}
                <Box>
                    <IconButton
                        
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleClick}
                        sx={{ mr: 2, display: { sm: 'none' }}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {isLoggedIn ? (
                            <MenuItem component={Link} to="/dashboard">PANEL UŻYTKOWNIKA</MenuItem>
                        ) : (
                            <div>
                            <MenuItem component={Link} to="/login">ZALOGUJ SIĘ</MenuItem>
                            <MenuItem component={Link} to="/register">ZAREJESTRUJ SIĘ</MenuItem>
                            </div>
                        )}
                        
                    </Menu>
                    <Box sx={{ mr: 2, '@media (max-width: 615px)': { // Directly using a custom breakpoint value
                        display: 'none',
                    } }}>
                    {isLoggedIn ? (
                            <Button component={Link} to="/dashboard" variant="outlined">PANEL UŻYTKOWNIKA</Button>
                        ) : (
                            <>
                                <Button component={Link} to="/login" variant="text">ZALOGUJ SIĘ</Button>
                                <Button component={Link} to="/register" variant="outlined">ZAREJESTRUJ SIĘ</Button>
                            </>
                    )}
                    </Box>
                </Box>
                </Stack>
            </Container>
        </AppBar>
        
  )
}

export default Navbar