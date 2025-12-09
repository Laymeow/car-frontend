import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateCar, getOwners } from '../api/carapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { Car, Owner } from '../types';

interface EditCarDialogProps {
  open: boolean;
  cardata: Car;
  onClose: () => void;
}

function EditCarDialog({ open, cardata, onClose }: EditCarDialogProps) {
  const [car, setCar] = useState<Car>({
    id: 0,
    brand: '',
    model: '',
    color: '',
    regNum: '',
    price: 0,
    dateOfCreation: '',
    owner: null,
  });
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Загрузка владельцев
  const { data: owners = [] } = useQuery<Owner[]>({
    queryKey: ['owners'],
    queryFn: getOwners,
    enabled: open,
  });

  useEffect(() => {
    if (cardata) {
      setCar({
        id: cardata.id,
        brand: cardata.brand || '',
        model: cardata.model || '',
        color: cardata.color || '',
        regNum: cardata.regNum || '',
        price: cardata.price || 0,
        dateOfCreation: cardata.dateOfCreation || '',
        owner: cardata.owner || null,
      });
    }
  }, [cardata]);

  const { mutate } = useMutation({
    mutationFn: () => updateCar(car),
    onSuccess: () => {
      onClose();
      setError(null);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err: Error) => {
      setError(err.message);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCar({
      ...car,
      [name]: name === 'price' ? (value === '' ? 0 : Number(value)) : value,
    });
  };

  const handleSelectChange = (event: any) => {
    const selectedOwnerId = event.target.value;
    const selectedOwner = selectedOwnerId 
      ? owners.find(owner => owner.id === Number(selectedOwnerId)) || null
      : null;
    
    setCar({
      ...car,
      owner: selectedOwner,
    });
  };

  const handleSave = () => {
    // Валидация
    if (!car.brand.trim()) {
      setError('Brand is required');
      return;
    }
    if (!car.model.trim()) {
      setError('Model is required');
      return;
    }
    if (!car.regNum.trim()) {
      setError('Registration number is required');
      return;
    }
    if (car.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }
    
    mutate();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Brand *"
            name="brand"
            value={car.brand}
            onChange={handleChange}
            fullWidth
            required
            error={!car.brand.trim()}
            helperText={!car.brand.trim() ? "Brand is required" : ""}
          />
          <TextField
            label="Model *"
            name="model"
            value={car.model}
            onChange={handleChange}
            fullWidth
            required
            error={!car.model.trim()}
            helperText={!car.model.trim() ? "Model is required" : ""}
          />
          <TextField
            label="Color"
            name="color"
            value={car.color}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Registration Number *"
            name="regNum"
            value={car.regNum}
            onChange={handleChange}
            fullWidth
            required
            error={!car.regNum.trim()}
            helperText={!car.regNum.trim() ? "Registration number is required" : ""}
          />
          <TextField
            label="Price *"
            name="price"
            type="number"
            value={car.price || ''}
            onChange={handleChange}
            fullWidth
            required
            inputProps={{ min: 0, step: 0.01 }}
            error={car.price <= 0}
            helperText={car.price <= 0 ? "Price must be greater than 0" : ""}
          />
          <FormControl fullWidth>
            <InputLabel>Owner</InputLabel>
            <Select
              value={car.owner?.id || ''}
              label="Owner"
              onChange={handleSelectChange}
            >
              <MenuItem value="">No Owner</MenuItem>
              {Array.isArray(owners) && owners.map((owner) => (
                  <MenuItem key={owner.id} value={owner.id}>
                    {owner.firstName || ''} {owner.lastName || ''}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          {car.dateOfCreation && (
            <TextField
              label="Created Date"
              value={new Date(car.dateOfCreation).toLocaleString()}
              disabled
              fullWidth
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCarDialog;