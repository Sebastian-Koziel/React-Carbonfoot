import { Box, Button } from "@mui/material"
import DataTable from "../../../utils/DataTable"
import { useState } from "react";
import FactorFormModal from "./AddNewFactorModal";

const EmissionFactors = () => {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const data = [
    {name: `test1`, comment:`sassdasd`},
    {name: `test2`, comment:`sassdasd`},
    {name: `test3`, comment:`sassdasd`},
    {name: `test4`, comment:`sassdasd`},
    {name: `test5`, comment:`sassdasd`},
    {name: `test6`, comment:`sassdasd`},
    {name: `test7`, comment:`sassdasd`},
    {name: `test8`, comment:`sassdasd`},
  ]

  const columnsSetup = [
    {header: "name", accessor: "name"},
    {header: "comment", accessor: "comment"},
    { header: "Actions", accessor: "actions", edit: true }
  ]

  return (
    <Box >
      <Button variant="contained" onClick={handleOpenModal}>Add New Factor</Button>
      EmissionFactorissionFactorsEmissionFactorsEmissionFactorsEmissionFactors
      <DataTable columns={columnsSetup} data={data} />
      <FactorFormModal open={isModalOpen} onClose={handleCloseModal} />
    </Box>
  )
}

export default EmissionFactors