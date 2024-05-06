import { Box, Button, Container, Stack, Typography } from "@mui/material"
import mainPic from "../../assets/main.png"


const Introduction = () => {
  return (
    <Container >
        <Stack direction={{ xs: 'column', md: 'row' }} sx={{height:`100%`}}>
            <Box bgcolor="blue" sx={{flex:`1`}}>
            <Typography variant="h4" marginTop="80px">Darmowy kalkulator śladu węglowego Twojej firmy</Typography>
                <Typography variant="h5" marginTop="30px">Dołącz do naszej społeczności i staw czoła wyzwaniom zrównoważonego rozwoju.</Typography>
                <Stack marginTop="70px" direction="row">
                    <Box sx={{flex:`1`}}>
                    <Button>Dołącz teraz</Button>
                    </Box>
                    <Box sx={{flex:`1`}}>
                    <Typography variant="h6">Sprawdź co nowego</Typography> 
                    </Box>
                </Stack>
            </Box>
            <Box bgcolor="yellow" sx={{flex:`1`}} textAlign="center">
                <img src={mainPic}
                style={{
                    objectFit: `contain`,
                    maxWidth: `70%`,
                }}
                />
   
            </Box>
        </Stack>
    </Container>
  )
}

export default Introduction