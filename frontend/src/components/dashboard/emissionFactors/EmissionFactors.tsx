import { Box } from "@mui/material"
import DataTable from "../../../utils/DataTable"

const EmissionFactors = () => {

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
      EmissionFactorissionFactorsEmissionFactorsEmissionFactorsEmissionFactors
      <DataTable columns={columnsSetup} data={data} />

      </Box>
  )
}

export default EmissionFactors