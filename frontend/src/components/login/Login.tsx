import { Box, Container, Typography, TextField, Button, Paper, Divider, Link } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../home/Logo';

const LoginForm = () => {
  return (
    <Container maxWidth="sm" sx={{marginTop:"25px"}}>
        <Logo />
      <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
            Zaloguj się
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Adres email"
          name="email"
          autoComplete="email"
          autoFocus
          InputProps={{
            startAdornment: <EmailOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Hasło"
          type="password"
          id="password"
          autoComplete="current-password"
          InputProps={{
            startAdornment: <LockOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          ZALOGUJ SIĘ
        </Button>
        <Typography variant="body2" align="center" sx={{ cursor: 'pointer' }}>
          Nie pamiętam hasła do mojego konta
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" align="center">
          Nie masz jeszcze konta?
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 2 }}
        >
          ZAREJESTRUJ SIĘ
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginForm;
