// src/components/AddRaport.tsx
import React, { useState } from 'react';
import { Box, Button, Tabs, Typography, Stack, Dialog } from '@mui/material';
import Tab from '@mui/material/Tab';
import { CustomTabPanel } from './CustomTab';
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { FetchError, raportDetailsConsolidatedData } from './fetch/raportDetailsLoader';
import { deleteRaport } from './fetch/deleteRaport';
import useConfirmDialog from '../../../hooks/useConfirmDialog';


const RaportDetails: React.FC = () => {

const [value, setValue] = React.useState(0);
const navigate = useNavigate();

  //handle fetching
  const routeData = useLoaderData() as raportDetailsConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    
    return (<Typography>sadasdas</Typography>);
  }
  const { factors, raport } = routeData;
  // Check for errors within consolidated data
  if ('error' in factors || 'error' in raport) {
    // Handle errors within consolidated data
    const errors = [
      'Error in emmision factors: ' + (factors as FetchError).error,
      'Error in raport: ' + (raport as FetchError).error
    ];
    return (<Typography>sadasdas</Typography>);
  }


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  //handle delete
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = async () => {
    console.log(raport)
    confirm(async () => {
      try {
        await deleteRaport(raport._id);
        // success toast
        navigate("..");
      } catch (err: any) {
        // error toast
        console.error(err);
      }
    });
  };
  

  return (
    <>
        <Stack  marginBottom={2} direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant='h4'>Bez nazwy</Typography>
        <Box>
        <Button sx={{marginRight: 2}} component={Link} to=".." variant="text">Wróć do listy</Button>
        <Button onClick={handleDelete} color="error" variant="outlined">Usuń ten raport</Button>
        </Box>
        </Stack>
      <Box
      sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dane" {...a11yProps(0)} />
        <Tab label="Zakres 1" {...a11yProps(1)} />
        <Tab label="Zakres 2" {...a11yProps(2)} />
        <Tab disabled label="Zakres 3 - wkrótce" {...a11yProps(3)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
            d
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </Box>
    <ConfirmDialog />
    </>
  );
};

export default RaportDetails;
