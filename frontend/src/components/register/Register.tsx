import { Box, Button, Container, Divider, Paper, Switch, TextField, Typography, Link } from "@mui/material"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink } from "react-router-dom";
import Logo from "../home/Logo";

const Register = () => {
  return (
    <Container maxWidth="sm" sx={{marginTop:"25px"}}>
        
        <Logo />       
         
      <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          {/* Your logo here */}
          <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
            Załóż darmowe konto
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
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
          id="surname"
          label="Surname"
          name="surname"
          autoComplete="surname"
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
          id="company"
          label="Company"
          name="company"
          autoComplete="company"
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
        <Typography component="div">
        <Switch
          name="marketing"
          inputProps={{ 'aria-label': 'marketing consent' }}
        />
        Zgoda na przetwarzanie danych osobowych w celach marketingowych.
      </Typography>
      <Typography component="div">
        <Switch
          name="terms"
          inputProps={{ 'aria-label': 'accept terms' }}
        />
        Zakładając konto akceptujesz 
        <Link component={RouterLink} to="#" underline="always">regulamin serwisu</Link>, 
        <Link component={RouterLink} to="#" underline="always">regulamin rejestracji</Link> oraz 
        <Link component={RouterLink} to="#" underline="always">politykę prywatności</Link>
        Zaakceptowanie regulaminu oraz polityki prywatności jest wymagane.
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button variant="outlined">
        ZAŁÓŻ KONTO
      </Button>
      </Paper>
    </Container>
  )
}

export default Register