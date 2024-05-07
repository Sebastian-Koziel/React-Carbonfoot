import { Box, Container, Typography, TextField, Button, Paper, Divider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Logo from '../home/Logo';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './loginFetch';
import { User } from '../../interfaces/interfaces';
import { loginValidationSchema } from './loginValidationSchema';
import { FormikHelpers, useFormik } from 'formik';
import { isLogged, storageSetToken, storageSetUser } from '../../storage/localStorage';

interface LoginResponse {
  user: User,
  access_token: string
}

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = async (values:FormValues, actions:FormikHelpers<FormValues>) => {
    
    
    const authData = {
      email: values.email,
      password: values.password,
    };

    try {
      const response: LoginResponse = await login(authData);
      
      const token = response.access_token;
      const user = response.user;
      console.log(user);

      storageSetToken(token);
      storageSetUser(user);

      actions.resetForm();
      actions.setSubmitting(false);
      navigate("/dashboard");
      
    } catch (err:any) {
      setError(err.message);
      console.log(err.message);
    }
  };
  const initialValues = {  
    email: '',
    password: ''
};
  const {values, errors, touched, handleBlur, handleChange, isSubmitting, handleSubmit} = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit
  });

  return (
    <Container maxWidth="sm" sx={{marginTop:"25px"}}>
        <Logo />
      <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
      <form onSubmit={handleSubmit}>
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
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)} 
          helperText={touched.email && errors.email}
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
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)} 
          helperText={touched.password && errors.password}
          InputProps={{
            startAdornment: <LockOutlinedIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isSubmitting}
        >
          ZALOGUJ SIĘ
        </Button>
        </form>
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
