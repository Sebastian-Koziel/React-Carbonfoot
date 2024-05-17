// src/components/RaportsList.tsx
import React from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from "react-router-dom"

interface Raport {
  id: number;
  name: string;
  year: number;
  employees: number;
  yearlyIncome: number;
  productsProcessed: number;
}

const RaportsList: React.FC = () => {
  const raports = useLoaderData() as Raport[] || [];

  return (
    <Box sx={{ padding: 4 }}>
      <Button variant="contained" component={Link} to="new" color="primary" sx={{ marginBottom: 2 }}>
        Add New Raport
      </Button>
      <Outlet />
      {raports.length === 0 ? (
        <Typography variant="h6">Looks like you didn't make any raports now, let's get to work!</Typography>
      ) : (
        raports.map((raport) => (
          <Card key={raport.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h5">{raport.name}</Typography>
              <Typography variant="body2">Year: {raport.year}</Typography>
              <Typography variant="body2">Employees: {raport.employees}</Typography>
              <Typography variant="body2">Yearly Income: ${raport.yearlyIncome}</Typography>
              <Typography variant="body2">Products Processed: {raport.productsProcessed}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default RaportsList;
