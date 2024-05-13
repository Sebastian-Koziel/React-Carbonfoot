import { Box, Button } from "@mui/material"
import DataTable from "../../../utils/DataTable"
import { useMemo, useState } from "react";
import FactorFormModal from "./AddNewFactorModal";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";

const EmissionFactors = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];

  return (
    <>
    <Box >
      <Button variant="contained" onClick={handleOpenModal}>Add New Factor</Button>
      EmissionFactorissionFactorsEmissionFactorsEmissionFactorsEmissionFactors
      
      <FactorFormModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>

    {/* <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      /> */}
    </>
  )
}

export default EmissionFactors