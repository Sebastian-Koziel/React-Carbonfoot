// src/components/AddRaport.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Tabs, Typography, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import { CustomTabPanel } from './CustomTab';
import { Link } from "react-router-dom"

interface Expense {
  id: number;
  description: string;
  amount: number;
}

const AddRaport: React.FC = () => {

const [value, setValue] = React.useState(0);

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [employees, setEmployees] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [productsProcessed, setProductsProcessed] = useState('');

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { id: expenses.length + 1, description: expenseDescription, amount: parseFloat(expenseAmount) }
    ]);
    setExpenseDescription('');
    setExpenseAmount('');
    setOpenModal(false);
  };


  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleDelete=()=> {

  }

  return (
    <>
        <Stack marginBottom={2} direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant='h4'>Bez nazwy</Typography>
        <Box>
        <Button sx={{marginRight: 2}} component={Link} to=".." variant="text">Wróć do listy</Button>
        <Button onClick={handleDelete} color="error" variant="outlined">Usuń ten raport</Button>
        </Box>
        </Stack>
      <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dane" {...a11yProps(0)} />
        <Tab label="Zakres 1" {...a11yProps(1)} />
        <Tab label="Zakres 2" {...a11yProps(2)} />
        <Tab disabled label="Zakres 3 - wkrótce" {...a11yProps(3)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
            d
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
    </Box>
 

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, backgroundColor: 'white', padding: 4, boxShadow: 24 }}>
          <TextField label="Expense Description" fullWidth value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} sx={{ marginBottom: 2 }} />
          <TextField label="Expense Amount" fullWidth value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} sx={{ marginBottom: 2 }} />
          <Button variant="contained" color="primary" onClick={addExpense}>Add</Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddRaport;
