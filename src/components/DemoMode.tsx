import { useState } from 'react';
import { Button, Stack, Typography, Paper } from '@mui/material';

const DEMO_CARS = [
  { id: 1, brand: 'Toyota', model: 'Camry', color: 'Red', regNum: 'ABC123', price: 25000, owner: { firstName: 'John', lastName: 'Doe' } },
  { id: 2, brand: 'Honda', model: 'Civic', color: 'Blue', regNum: 'XYZ789', price: 22000, owner: { firstName: 'Jane', lastName: 'Smith' } },
  { id: 3, brand: 'BMW', model: 'X5', color: 'Black', regNum: 'BMW001', price: 65000, owner: { firstName: 'Mike', lastName: 'Johnson' } },
];

function DemoMode() {
  const [isDemo, setIsDemo] = useState(false);

  if (isDemo) {
    return (
      <div>
        {/* Покажите таблицу с DEMO_CARS */}
      </div>
    );
  }

  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Для демонстрации работы интерфейса используйте демо-режим
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => setIsDemo(true)}
      >
        Включить демо-режим
      </Button>
    </Paper>
  );
}