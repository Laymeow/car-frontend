import { useState } from 'react';
import { Button, Typography, Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const DEMO_CARS = [
  { id: 1, brand: 'Toyota', model: 'Camry', color: 'Red', regNum: 'ABC123', price: 25000, owner: { firstName: 'John', lastName: 'Doe' } },
  { id: 2, brand: 'Honda', model: 'Civic', color: 'Blue', regNum: 'XYZ789', price: 22000, owner: { firstName: 'Jane', lastName: 'Smith' } },
  { id: 3, brand: 'BMW', model: 'X5', color: 'Black', regNum: 'BMW001', price: 65000, owner: { firstName: 'Mike', lastName: 'Johnson' } },
  { id: 4, brand: 'Mercedes', model: 'E-Class', color: 'White', regNum: 'MBZ001', price: 75000, owner: { firstName: 'Sarah', lastName: 'Williams' } },
  { id: 5, brand: 'Audi', model: 'A4', color: 'Gray', regNum: 'AUD001', price: 45000, owner: { firstName: 'Robert', lastName: 'Brown' } },
];

export default function DemoMode() {
  const [isDemo, setIsDemo] = useState(false);

  if (isDemo) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Демо-режим автомобилей
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Brand</strong></TableCell>
                <TableCell><strong>Model</strong></TableCell>
                <TableCell><strong>Color</strong></TableCell>
                <TableCell><strong>Reg. Number</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Owner</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {DEMO_CARS.map((car) => (
                <TableRow key={car.id} hover>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.regNum}</TableCell>
                  <TableCell>${car.price.toLocaleString()}</TableCell>
                  <TableCell>{car.owner.firstName} {car.owner.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Демонстрация интерфейса с моковыми данными
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => setIsDemo(false)}
            sx={{ mt: 2 }}
          >
            Вернуться
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Paper sx={{ 
      p: 4, 
      textAlign: 'center',
      maxWidth: 600,
      mx: 'auto',
      mt: 5,
      borderRadius: 2,
      boxShadow: 3
    }}>
      
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Бэк не доступен.
      </Typography>
      
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => setIsDemo(true)}
          size="large"
          sx={{ py: 1.5 }}
        >
          Войти в демо-режим
        </Button>
      </Box>
    </Paper>
  );
}