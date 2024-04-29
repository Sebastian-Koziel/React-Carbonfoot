import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"


const Logo = () => {
  return (
    <Box display="flex" justifyContent="center">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <Typography  variant="h4" color="black" component="span">
                        carbon
        </Typography>
        <Typography variant="h4" color="black" component="span" sx={{ fontWeight: 'bold'}}>
                        foot
        </Typography>
        <Typography variant="h4" color="orange" component="span">
                        .eu
        </Typography>
        </Link>
        </Box>
  )
}

export default Logo