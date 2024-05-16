import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography, Switch, Select, MenuItem, ListItemText, InputLabel, FormHelperText, FormControl, Alert, Snackbar, CircularProgress, Rating } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { factorValidationSchema } from './FactorValidationSchema';
import { endPoints } from '../../../endPoints/endPoints';
import { Factor, NewFactor } from '../../../interfaces/interfaces';
import { storageGetToken, storageGetUser } from '../../../storage/localStorage';
import { useEffect, useState } from 'react';
import { checkIfCanVote } from './utils/checkIfCanVote';



interface Props {
  open: boolean;
  onClose: () => void;
  handleSnackbar: () => void;
  revalidator: any
regionsList: any
unitsList: any
yearsList: any
factorId: string | null
selectedFactorName: string | null
}

const FactorDetailsModal: React.FC<Props> = ({ open, onClose, handleSnackbar, revalidator, regionsList, unitsList, yearsList, factorId, selectedFactorName }) => {
   
  const [loading, setLoading] = useState<boolean>(false);

  const [factor, setFactor] = useState<Factor | null>(null);
  const [author, setAuthor] = useState<string | null>(null);

  const [canVote, setCanVote] = useState<boolean>(false)

      interface FormValues {
        name : string
        region: string
        year: string
        value: number
        units: string
        comment: string
        isPublic: boolean
        addedBy: string
      }
      
      const handleClose = () => {
        resetForm(); 
        onClose(); 
      };

    const onSubmit = async (values:FormValues, actions:FormikHelpers<FormValues>) => {
    
        const user = storageGetUser();
        const token = storageGetToken();
        console.log(values)
        const newFactor: NewFactor = {
            name : values.name,
            region: values.region,
            year: values.year,
            value: values.value,
            units: values.units,
            comment: values.comment,
            isPublic: values.isPublic,
            addedBy: user._id,
    
        }
        
        try {
          const response = await fetch(endPoints.addEmissionFactor, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: "Bearer "+ token
            },
            body: JSON.stringify(newFactor),
          });
    
          const data = await response.json()
    
          if(!response.ok){
            throw new Error(data.message || `Something went wrong`);
          }
          
          actions.resetForm();
          actions.setSubmitting(false);
          handleSnackbar();
          handleClose();
          revalidator.revalidate();
    
        } catch (error: any) {
          actions.setFieldError(`general`, error.message);
        } 
      };
      

    const initialValues: FormValues = {
        name : factor?.name || '',
        region: factor?.region || '',
        year: factor?.year || '',
        value: factor?.value || 0, 
        units: factor?.units || '',
        comment: factor?.comment || '',
        isPublic: factor?.isPublic || true,
        addedBy: '',
    };
    
    const {values, errors, touched, handleBlur, handleChange, isSubmitting, handleSubmit, resetForm} = useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: factorValidationSchema,
      onSubmit
    });


    useEffect(() => {
      if (factorId) {
        setLoading(true);
        const token = storageGetToken();
        const fetchFactor = async () => {
          try {
          const response = await fetch(`${endPoints.getEmissionFactors}/${factorId}`, {
            headers: {
              Authorization: "Bearer "+token
            }
          });
          const data = await response.json();
            setFactor(data.factor);
            setAuthor(data.author);

            setCanVote(checkIfCanVote(data.factor));
            

        } catch (error) {
          //TODO proper error handler
          console.error(error);
        } finally {
          
          setLoading(false);
        }
        };
        fetchFactor();
      }
    }, [factorId]);
  
  const handleRatingSubmit = (x:any) => {
    console.log(canVote)
  }
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ paddingBottom: 0, paddingTop: 2 }}>{selectedFactorName}</DialogTitle>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
      <form onSubmit={handleSubmit}>
      <DialogContent sx={{ paddingTop: 0 }}>
       
      <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="name" 
        label="nazwa" 
        name="name" 
        autoComplete="name" 
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)} 
        helperText={touched.name && errors.name}
        /> 
      
      <Box display="flex" flexDirection="row">  
        <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="value" 
        label="wartość" 
        name="value" 
        autoComplete="value" 
        value={values.value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.value && Boolean(errors.value)} 
        helperText={touched.value && errors.value}
        />
        
        <FormControl sx={{ marginLeft: 1, marginTop: 2, minWidth: 120 }}>
        <InputLabel id="region-label">miara</InputLabel>
        <Select
          labelId="units-label"
          required
          id="units"
          name="units"
          value={values.units}
          label="units"
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{
            height: 56, 
            '& .MuiSelect-select': {
              paddingTop: '5px',
              paddingBottom: '5px'
            }
          }}
        >
          {unitsList.map((unit:any) => {
                return (
                  <MenuItem key={unit.id} value={unit.id}>
                    <ListItemText primary={unit.name} />
                  </MenuItem>
                );
              })}
        </Select>
        <FormHelperText>{touched.units && errors.units}</FormHelperText>
        </FormControl>
      </Box>

        <Box display="flex" flexDirection="row">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="region-label">region</InputLabel>
        <Select
          labelId="region-label"
          id="region"
          name="region"
          value={values.region}
          label="Region"
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{
            height: 56, 
            '& .MuiSelect-select': {
              paddingTop: '5px',
              paddingBottom: '5px'
            }
          }}
        >
          {regionsList.map((region:any) => {
                return (
                  <MenuItem key={region.id} value={region.id}>
                    <ListItemText primary={region.name} />
                  </MenuItem>
                );
              })}
        </Select>
        <FormHelperText>{touched.region && errors.region}</FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="year-label">rok</InputLabel>
        <Select
          labelId="year-label"
          id="year"
          name="year"
          value={values.year}
          label="year"
          onChange={handleChange}
          onBlur={handleBlur}
          sx={{
            height: 56, 
            '& .MuiSelect-select': {
              paddingTop: '5px',
              paddingBottom: '5px'
            }
          }}
        >
          {yearsList.map((year:any) => {
                return (
                  <MenuItem key={year} value={year}>
                    <ListItemText primary={year} />
                  </MenuItem>
                );
              })}
        </Select>
        <FormHelperText>{touched.year && errors.year}</FormHelperText>
      </FormControl>
      <Typography component="div" marginTop={2}>
        <Switch 
        name="isPublic"
        checked={values.isPublic}
        onChange={handleChange}
        onBlur={handleBlur} 
        inputProps={{ 'aria-label': 'marketing consent' }} />
        publiczny
        </Typography>
      </Box>
      
      <TextField 
        variant="outlined" 
        multiline
        margin="normal"  
        fullWidth id="comment" 
        label="komentarz" 
        name="comment" 
        autoComplete="comment" 
        value={values.comment}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.comment && Boolean(errors.comment)} 
        helperText={touched.comment && errors.comment}
        />
      
      <Box mt={2} display={"flex"} justifyContent="center" alignItems="center">
                {canVote && (
                <Typography mr={2} component="legend">Oceń ten wskaźnik</Typography>
                )}
                <Rating
                  name="rating"
                  readOnly = {!canVote}
                  value={factor?.ranks.average}
                  onChange={(event, newValue) => {
                    handleRatingSubmit(newValue as number);
                  }}
                />
      </Box>
        
      </DialogContent>
      <DialogActions>
      <Box display="flex" flexDirection="row" sx={{marginBottom:"10px"}}>
        <Button variant="text" sx={{marginRight:"20px"}} onClick={handleClose}>Cancel</Button>
        <Button variant="outlined" sx={{marginRight:"20px"}} type="submit">Add</Button>
      </Box>
        
      </DialogActions>
      </form>
      )}
    </Dialog>
            
  );
};

export default FactorDetailsModal;
