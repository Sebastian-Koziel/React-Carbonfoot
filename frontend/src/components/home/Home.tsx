import { Box } from "@mui/material"
import Numbers from "./Numbers"
import Navbar from "./Navbar"
import Introduction from "./Introduction"
import Questions from "./Questions"


export const Home = () => {
  return (
    <Box>
        <Navbar />
        <Introduction />
        <Numbers />
        <Questions />
    </Box>
  )
}
