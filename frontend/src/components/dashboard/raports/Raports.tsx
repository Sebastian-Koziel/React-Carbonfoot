// src/components/RaportsList.tsx
import React from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { NewRaport, Raport } from '../../../interfaces/interfaces';
import { storageGetUser } from '../../../storage/localStorage';
import { addNewRaportFetcher } from './fetch/addRaportFetch';
import { FetchError } from './fetch/raportDetailsLoader';


const RaportsList: React.FC = () => {
  //handle fetching
  const routeData = useLoaderData() as Raport[] | FetchError;
  
  if('error' in routeData){
    return (
      (<Typography>sadasdas</Typography>)
    );
  }
const raports = routeData;

  const navigate = useNavigate();

  //handle adding new raport
  const addNewHandler = async () => {
    const user = storageGetUser();
    
    const newRaport:NewRaport = {
      name: 'Mój raport', 
      addedBy: user._id
    };
    
      try {
        const response = await addNewRaportFetcher(newRaport);
        //success toast
        navigate(`${response._id}`);
      } catch (error:any) {
       //error toast
      }
    }
  
    //handle clicked raport
    const handleClick=(id:string)=> {
      navigate(`${id}`);
    }

  return (
    <Box sx={{ padding: 4 }}>
      <Button variant="contained" onClick={addNewHandler} color="primary" sx={{ marginBottom: 2 }}>
        Add New Raport
      </Button>
      <Outlet />
      {raports.length === 0 ? (
        <Typography variant="h6">Looks like you didn't make any raports now, let's get to work!</Typography>
      ) : (
        raports.map((raport) => (
          <Card key={raport._id} sx={{ marginBottom: 2, cursor: "pointer" }} onClick={() => handleClick(raport._id)}>
            <CardContent>
              <Typography variant="h5">{raport.name}</Typography>
              <Typography variant="body2">Year: </Typography>
              <Typography variant="body2">Employees: </Typography>
              <Typography variant="body2">Yearly Income: </Typography>
              <Typography variant="body2">Products Processed: </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default RaportsList;
