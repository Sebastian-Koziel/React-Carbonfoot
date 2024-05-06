import { Container, Typography, Button, Paper} from '@mui/material';
import { Link } from "react-router-dom"

import Logo from '../home/Logo';

const RegisterConfirmation = () => {
  return (
    <Container maxWidth="sm" sx={{marginTop:"25px"}}>
        <Logo />
      <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Typography>
            Dziękujemy za rejestrację! Potwierdz swojego maila aby się zalogować.
        </Typography>
        <Button component={Link} to={"/login"} variant="text">PRZEJDŹ DO LOGOWANIA</Button>
      </Paper>
    </Container>
  );
};

export default RegisterConfirmation;
