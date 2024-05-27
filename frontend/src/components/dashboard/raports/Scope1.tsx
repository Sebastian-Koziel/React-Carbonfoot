import { Box, Button, Tooltip, Typography } from '@mui/material'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

const Scope1 = ({addNewFactor}) => {
  return (
    <>
    <Typography>Zakres 1 obejmuje bezpośrednie emisje gazów cieplarnianych ze źródeł należących do organizacji lub przez nią kontrolowanych</Typography>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Spalanie stacjonarne</Typography>
          <Tooltip title="gaz ziemny, olej opałowy, LPG, CNG">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{mt:2}}  onClick={()=>{addNewFactor('stationaryCombustion')}} variant="text">dodaj emisje</Button>
        </Box>
        
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Spalanie mobilne</Typography>
          <Tooltip title="benzyna, olej napędowy, LPG, CNG">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={{mt:2}}  onClick={()=>{addNewFactor('mobileCombustion')}} variant="text">dodaj emisje</Button>
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Emisje procesowe</Typography>
          <Tooltip title="spawanie, elektroliza, kalcynacja, oczyszczalnie ścieków, SF6">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Emisje ulotne</Typography>
          <Tooltip title="rurociągi gazowe, instalacje klimatyzacyjne">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center" mt={2} sx={{backgroundColor: "orange"}}>
          <Typography variant='h5'>Emisje rolnicze</Typography>
          <Tooltip title="nawożenie pól, fermencja jelitowa, odwadnianie i uprawa gleb, uprawa ryżu, zarządzanie obornikiem">
            <HelpOutlineRoundedIcon sx={{ ml: 1 }} />
          </Tooltip>
        </Box>
        </>
  )
}

export default Scope1