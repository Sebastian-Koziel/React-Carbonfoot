import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Logo from '../home/Logo';

interface ValidationResponse {
  message: string;
  error?: boolean;
}

interface ErrorResponse {
  error: boolean;
  message: string;
}

const ValidationComponent: React.FC = () => {
  const data = useLoaderData() as ValidationResponse | ErrorResponse;
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
        <Logo />
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6" component="h1" gutterBottom>
          {data.error ? data.message : 'Token validated successfully!'}
        </Typography>
        {data.error ? (
          <Button variant="outlined" color="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ValidationComponent;
