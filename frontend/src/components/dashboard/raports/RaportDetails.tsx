// src/components/AddRaport.tsx
import React, { useState } from 'react';
import { Box, Button, Tabs, Typography, Stack, Tooltip, Card } from '@mui/material';
import { Link, useLoaderData, useNavigate } from "react-router-dom"
import { FetchError, raportDetailsConsolidatedData } from './fetch/raportDetailsLoader';
import { deleteRaport } from './fetch/deleteRaport';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { eventBus } from '../../../hooks/eventBus';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

//tabs
import Tab from '@mui/material/Tab';
import { CustomTabPanel, a11yProps } from './CustomTab';
import { Raport } from '../../../interfaces/interfaces';
import AddEmissionModal from './AddEmissionModal';
import Scope1 from './Scope1';



const RaportDetails: React.FC = () => {


const [value, setValue] = React.useState(0);
const navigate = useNavigate();

 //handle form modal
 const [isModalOpen, setModalOpen] = useState<boolean>(false);
  
 const handleOpenModal = () => {
   setModalOpen(true);
 };

 const handleCloseModal = () => {
   setModalOpen(false);
 };

  //handle fetching
  const routeData = useLoaderData() as raportDetailsConsolidatedData | FetchError;
    
  if ('error' in routeData) {
    //TODO - do proper error handling
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
    //TODO - do proper error handling
    return (<Typography>sadasdas</Typography>);
  }

  
 // Initialize raport state
 const [currentRaport, setCurrentRaport] = useState<Raport>(raport);
 //current type of emission
 const [currentEmissionType, setCurrentEmissionType] = useState<string>('');
  

  //tabs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //handle delete
  const { confirm, ConfirmDialog } = useConfirmDialog();

  const handleDelete = async () => {
    confirm(async () => {
      try {
        await deleteRaport(raport._id);
        eventBus.emit('customEvent', { message: 'Raport usunięty!', severity: 'success' });
        navigate("..");
      } catch (err: any) {
        eventBus.emit('customEvent', { message: 'Coś poszło nie tak', severity: 'error' });
      }
    });
  };
  
  const addEmissionToFactor = () => {
    
  }

  const addNewFactor = (type:string)=>{
    setCurrentEmissionType(type);
    handleOpenModal();
  }

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
      sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }}
        >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dane firmy" {...a11yProps(0)} />
        <Tab label="Zakres 1" {...a11yProps(1)} />
        <Tab label="Zakres 2" {...a11yProps(2)} />
        <Tab disabled label="Zakres 3 - wkrótce" {...a11yProps(3)} />
        <Tab label="Podsumowanie" {...a11yProps(4)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
            d
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Scope1 addNewFactor={addNewFactor} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Typography>Zakres 2 obejmuje pośrednie emisje gazów cieplarnianych związane z zakupionymi od zewnętrznego dostawcy czynnikami.</Typography>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Energia elektryczna</Typography>
          
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Ciepło</Typography>
          <Tooltip title="ciepło z sieci miejskiej">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Chłód</Typography>
          
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Para wodna</Typography>
          
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        podsumowanie
      </CustomTabPanel>
    </Box>
    <ConfirmDialog />
    < AddEmissionModal
      open={isModalOpen} 
      onClose={handleCloseModal}
      />
    </>
  );
};

export default RaportDetails;
