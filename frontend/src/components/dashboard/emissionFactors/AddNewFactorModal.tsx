import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Box, Typography, Switch, Select, MenuItem } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { factorValidationSchema } from './FactorValidationSchema';
import { endPoints } from '../../../endPoints/endPoints';
import { Factor, NewFactor } from '../../../interfaces/interfaces';


interface Props {
  open: boolean;
  onClose: () => void;
}

const FactorFormModal: React.FC<Props> = ({ open, onClose }) => {
    
    const navigate = useNavigate();

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

    const onSubmit = async (values:FormValues, actions:FormikHelpers<FormValues>) => {
    
        const newUser: NewFactor = {
            name : values.name,
            region: values.region,
            year: values.year,
            value: values.value,
            units: values.units,
            comment: values.comment,
            isPublic: values.isPublic,
            addedBy: values.addedBy,
    
        }
        console.log(newUser)
        try {
          const response = await fetch(endPoints.registerUser, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });
    
          const data = await response.json()
    
          if(!response.ok){
            throw new Error(data.message || `Something went wrong`);
          }
    
          actions.resetForm();
          actions.setSubmitting(false);
          navigate("/confirmation");
    
        } catch (error: any) {
          actions.setFieldError(`general`, error.message);
        } 
      };

    const initialValues = {
        name : '',
        region: '',
        year: '',
        value: 0,
        units: '',
        comment: '',
        isPublic: true,
        addedBy: '',
    };
    
    const {values, errors, touched, handleBlur, handleChange, isSubmitting, handleSubmit} = useFormik({
      initialValues: initialValues,
      validationSchema: factorValidationSchema,
      onSubmit
    });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Emission Factor</DialogTitle>
      <DialogContent>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h1" sx={{ mb: 3 }}>
            Załóż darmowe konto
          </Typography>
        </Box>
        <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="value" 
        label="value" 
        name="value" 
        autoComplete="value" 
        value={values.value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.value && Boolean(errors.value)} 
        helperText={touched.value && errors.value}
        />
        <TextField 
        variant="outlined" 
        margin="normal" 
        required 
        fullWidth id="name" 
        label="name" 
        name="name" 
        autoComplete="name" 
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && Boolean(errors.name)} 
        helperText={touched.name && errors.name}
        />
        <Select
          labelId="year-label"
          id="year"
          value={values.year}
          label="year"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.year && Boolean(errors.year)} 
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        <Typography component="div">
        <Switch name="marketing" defaultChecked inputProps={{ 'aria-label': 'marketing consent' }} />
        Public
        </Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => console.log(`ddd`)}>Add</Button>
        
      </DialogActions>
    </Dialog>
  );
};

export default FactorFormModal;
