import DialogContent from '@mui/material/DialogContent';
import { Car } from '../types';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

type DialogFormProps = {
  car: Car;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
    return (
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Model"
              name="model"
              value={car.model}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              value={car.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Color"
              name="color"
              value={car.color}
              onChange={handleChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
      );
}

export default CarDialogContent;