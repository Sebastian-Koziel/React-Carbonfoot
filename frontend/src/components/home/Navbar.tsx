
import { AppBar, Box, Button, Container, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import Logo from "./Logo"



const Navbar = () => {
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
                    <Button component={Link} to={"login"} variant="text">ZALOGUJ SIĘ</Button>
                    <Button component={Link} to={"register"} variant="outlined">ZAREJESTRUJ SIĘ</Button>
                </Box>
                </Stack>
            </Container>
        </AppBar>
    
  )
}

export default Navbar