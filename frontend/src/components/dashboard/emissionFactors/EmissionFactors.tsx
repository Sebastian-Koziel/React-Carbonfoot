import { Alert, Box, Button, Container, IconButton, Rating, Snackbar, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react";
import FactorFormModal from "./AddNewFactorModal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLoaderData } from "react-router-dom";
import { Factor } from "../../../interfaces/interfaces";
import { useRevalidator } from "react-router-dom";
import { endPoints } from "../../../endPoints/endPoints";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import FactorDetailsModal from "./DetailsFactorModal";





const EmissionFactors = () => {

  const [language, setLanguage] = useState(navigator.language.split('-')[0]);
  const [unitsList, setUnits] = useState([]);
  const [regionsList, setregionsLists] = useState([]);

  const yearsList: string[] = ['2021', '2022', '2023', '2024'];

  useEffect(()=> {
    const fetchCountires = async () => {
      const response = await fetch(endPoints.getRegions + `?lang=${language}`)
      const data = await response.json();
      setregionsLists(data);
    }
    const fetchUnits = async () => {
      const response = await fetch(endPoints.getUnits + `?lang=${language}`)
      const data = await response.json();
      console.log(data);
      setUnits(data.units);
    }

    fetchCountires();
    fetchUnits();

  }, [language])
  
  let revalidator = useRevalidator();

  //handle form modal
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //handle details modal
  const [isDetailsModalOpen, setDetailsModalOpen] = useState<boolean>(false);
  const [selectedFactorId, setSelectedFactorId] = useState<string | null>(null);
  const [selectedFactorName, setselectedFactorName] = useState<string | null>(null);
  
  const handleOpenDetailsModal = (factorId: string, factorName: string) => {
    setSelectedFactorId(factorId);
    setselectedFactorName(factorName);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setselectedFactorName(null);
    setSelectedFactorId(null);
  };
  //handle fetching
  const routeData = useLoaderData() as Factor[];

const factors = routeData;
  
const updatedFactors = factors.map(factor => {
  return {
      ...factor,  
      id: factor._id  
  };
});

  const rows = updatedFactors;

  const columns = useMemo(()=>[
    {field:'name', headerName:'nazwa', minWidth: 100},
    {field:'value', headerName:'wartość', minWidth: 100},
    {field:'units', headerName:'miara', minWidth: 100},
    {field:'year', headerName:'rok'},
    {field: 'rating',
      headerName: 'Rating',
      width: 180,
      renderCell: (params:any) => {
        return (
          <>
          <Rating
            name="read-only"
            value={params.row.ranks.average}
            readOnly
            precision={0.5}
          />
          <Typography marginTop={"-10px"} color={"gray"} fontSize={"9px"}>({params.row.ranks.sum})</Typography>
          </>
        );
      }
    },
    {field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: (params:any) => {
       
        const onClickEdit = (e:React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation(); 
          handleOpenDetailsModal(params.id as string, params.row.name as string);
        };
  
        return (
          <>
            <IconButton color="primary" onClick={onClickEdit}>
              <SettingsRoundedIcon />
            </IconButton>
          </>
        );
      },
    },
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

      < FactorDetailsModal
      factorId={selectedFactorId}
      open={isDetailsModalOpen} 
      onClose={handleCloseDetailsModal} 
      handleSnackbar={handleSnackbar} 
      revalidator={revalidator} 
      regionsList={regionsList}
      unitsList={unitsList}
      yearsList={yearsList}
      selectedFactorName={selectedFactorName}
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