import { Alert, Box, Button, Container, Snackbar, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import FactorFormModal from "./AddNewFactorModal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLoaderData } from "react-router-dom";
import { Factor } from "../../../interfaces/interfaces";
import { useRevalidator } from "react-router-dom";



const EmissionFactors = () => {

  
  const regionsList = [
    {id:0, name:"all"},
    {id:1, name:"Polska"},
    {id:2, name:"Niemcy"},
    {id:3, name:"EU"}
    ]
  

  const unitsList = [
      {id:0, name:"g"},
      {id:1, name:"kg"},
      {id:2, name:"tony"},
      
    ]

  const yearsList = [
        {id:0, name:"2021"},
        {id:1, name:"2022"},
        {id:2, name:"2023"},
        {id:3, name:"2024"},
        
    ]


  let revalidator = useRevalidator();

  //handle modal
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //handle fetching
  const routeData = useLoaderData() as Factor[];

const factors = routeData;

console.log(factors);
  
const updatedFactors = factors.map(factor => {
  return {
      ...factor,  
      id: factor._id  
  };
});

  const rows = updatedFactors;

  const columns = useMemo(()=>[
    {field:'name', headerName:'nazwa', minWidth: 150},
    {field:'value', headerName:'wartość', minWidth: 150},
    {field:'year', headerName:'rok'}
  ],[])

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbar = () => {
    setSnackbarOpen(true);
  };

  const snackbarHandleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <>
    <Container>
    <Box>
      
      <Typography variant="h6">Witaj w świecie wskaźników emisji!</Typography>
      
      <Box display={"flex"} alignItems="center" flexDirection={"row-reverse"}>
      <Button sx={{marginLeft:2, marginBottom:2}} variant="contained" onClick={handleOpenModal}>Dodaj nowy</Button>
      <Typography>Brakuje wskaźnika którego szukasz?</Typography>
      
    </Box>
      
      <FactorFormModal 
      open={isModalOpen} 
      onClose={handleCloseModal} 
      handleSnackbar={handleSnackbar} 
      revalidator={revalidator} 
      regionsList={regionsList}
      unitsList={unitsList}
      yearsList={yearsList}

      />
    </Box>

    <Box width={`100%`}>
    <DataGrid 
    autoHeight 
    disableColumnFilter
    disableColumnSelector
    disableDensitySelector
    columns={columns}
    rows={rows}
    components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
    
    
    >
    </DataGrid>
    </Box>
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={snackbarHandleClose}>
        <Alert
          onClose={snackbarHandleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Wskaźnik emisji dodany!
        </Alert>
      </Snackbar>
    </Container>
    </>
  )
}

export default EmissionFactors