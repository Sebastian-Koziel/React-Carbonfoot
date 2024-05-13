import { Box, Button, Container, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import FactorFormModal from "./AddNewFactorModal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLoaderData } from "react-router-dom";
import { Factor } from "../../../interfaces/interfaces";

interface FetchError {
  error: string;
}

const EmissionFactors = () => {
  //handle modal
  const [isModalOpen, setModalOpen] = useState(false);
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //handle fetching
const routeData = useLoaderData() as Factor[] | FetchError;
  
if('error' in routeData){
  return (
    <Typography>Coś poszło nie tak: {routeData.error} </Typography>
  );
}
const orders = routeData;

  const rows = [
    {id:'asdsa',name: 'stefan'},
    {id:'asdsggga',name: 'misiek'},
    {id:'as1dsa',name: 'stefan'},
    {id:'asds2ggga',name: 'misiek'},
    {id:'as4dsa',name: 'stefan'},
    {id:'as5dsggga',name: 'misiek'},
    {id:'as6dsa',name: 'stefan'},
    {id:'asd7sggga',name: 'misiek'}
  ]
  const columns = useMemo(()=>[
    {field:'name', headerName:'Avatar', minWidth: 150}
  ],[])

  return (
    <>
    <Container>
    <Box>
      
      <Typography variant="h6">Witaj w świecie wskaźników emisji!</Typography>
      
      <Box display={"flex"} alignItems="center" flexDirection={"row-reverse"}>
      <Button sx={{marginLeft:2, marginBottom:2}} variant="contained" onClick={handleOpenModal}>Dodaj nowy</Button>
      <Typography>Brakuje tego czego szukasz?</Typography>
      
    </Box>
      
      <FactorFormModal open={isModalOpen} onClose={handleCloseModal} />
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
    </Container>
    </>
  )
}

export default EmissionFactors