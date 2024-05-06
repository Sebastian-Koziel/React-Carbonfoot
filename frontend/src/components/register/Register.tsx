import { Box, Button, Container, Divider, Paper, Switch, TextField, Typography, Link } from "@mui/material"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Logo from "../home/Logo";
import { FormikHelpers, useFormik} from "formik";
import { validationSchema } from "./validationSchema";
import { endPoints } from "../../endPoints/endPoints";

const Register = () => {
  const navigate = useNavigate();

  interface FormValues {
    name: string;
    surname: string;
    company: string;
    email: string;
    password: string;
    password2: string;
    marketing: boolean;
    terms: boolean;
  }

  const onSubmit = async (values:FormValues, actions:FormikHelpers<FormValues>) => {
    
    const newUser = {
      name: values.name,
      surname: values.surname,
      company: values.company,
      email: values.email,
      password: values.password,
      marketingConsent: values.marketing,
      termsAccepted: values.terms,
    }

    try {
      const response = await fetch(endPoints.registerUser, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json()

      if(!response.ok){
        throw new Error(data.message || `Something went wrong`);
      }

      actions.resetForm();
      

    } catch (error) {
      actions.setFieldError(`general`, error.message);
    } finally {
      actions.setSubmitting(false);
      navigate("/confirmation");
    }


    
  };

  const initialValues = {
    name: '',
    surname: '',
    company: '',
    email: '',
    password: '',
    password2: '',
    marketing: false,
    terms: false,
};

const {values, errors, touched, handleBlur, handleChange, isSubmitting, handleSubmit} = useFormik({
  initialValues: initialValues,
  validationSchema: validationSchema,
  onSubmit
});



  return (
    <Container maxWidth="sm" sx={{marginTop:"25px"}}>
        <Logo />         
      <Paper elevation={3} sx={{ mt: 5, p: 3, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
            Załóż darmowe konto
          </Typography>
        </Box>
        <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="email" 
        label="email" 
        name="email" 
        autoComplete="email" 
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && Boolean(errors.email)} 
        helperText={touched.email && errors.email}
        />
        <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="name" 
        label="Name" 
        name="name" 
        autoComplete="name" 
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)} 
        helperText={touched.name && errors.name}
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
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.surname && Boolean(errors.surname)} 
        helperText={touched.surname && errors.surname}
        
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
        value={values.company}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.company && Boolean(errors.company)} 
        helperText={touched.company && errors.company}

        />
        <TextField 
        type="password" 
        variant="outlined"
        margin="normal" 
        required 
        fullWidth 
        name="password" 
        label="Hasło" 
        id="password" 
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)} 
        helperText={touched.password && errors.password}
        
        />

        <TextField 
        type="password" 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth 
        name="password2" 
        label="Powtórz hasło" 
        id="password2" 
        value={values.password2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password2 && Boolean(errors.password2)} 
        helperText={touched.password2 && errors.password2}
        
        />

        <Typography component="div">
        <Switch name="marketing" inputProps={{ 'aria-label': 'marketing consent' }} />
        Zgoda na przetwarzanie danych osobowych w celach marketingowych.
      </Typography>
      <Typography component="div">
      <Switch 
      name="terms" 
      inputProps={{ 'aria-label': 'accept terms' }}
      checked={values.terms}
      onChange={handleChange}
      onBlur={handleBlur}
      color="primary" />
        Zakładając konto akceptujesz 
        <Link component={RouterLink} to="#" underline="always">regulamin serwisu</Link>, 
        Zaakceptowanie regulaminu jest wymagane.
        {touched.terms && errors.terms ? (
        <Typography color="error" variant="body2">{errors.terms}</Typography>
        ) : null}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button type="submit" variant="outlined" disabled={isSubmitting}>
        ZAŁÓŻ KONTO
      </Button>
      </form>
      </Paper>
    </Container>
  )
}

export default Register