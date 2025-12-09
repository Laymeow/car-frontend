import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  DataGrid, 
  GridColDef, 
  GridToolbar,
  GridRenderCellParams 
} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { getCars, deleteCar } from '../api/carapi';
import AddCar from './AddCar';
import EditCarDialog from './EditCar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Car } from '../types';
import { Button } from '@mui/material';

type CarlistProps = {
  logOut?: () => void;
};

function Carlist({ logOut }: CarlistProps) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const queryClient = useQueryClient();

  const { data, error, isLoading, isSuccess } = useQuery<Car[]>({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setSnackbarMessage('Car deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err: Error) => {
      console.error('Delete error:', err);
      setSnackbarMessage('Failed to delete car');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  const handleEdit = (car: Car) => {
    setSelectedCar(car);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCar(null);
    queryClient.invalidateQueries({ queryKey: ['cars'] });
  };

  const columns: GridColDef[] = [
    { 
      field: 'brand', 
      headerName: 'Brand', 
      width: 150,
    },
    { 
      field: 'model', 
      headerName: 'Model', 
      width: 150,
    },
    { 
      field: 'color', 
      headerName: 'Color', 
      width: 120,
    },
    { 
      field: 'regNum', 
      headerName: 'Reg. Number', 
      width: 150,
    },
    { 
      field: 'dateOfCreation', 
      headerName: 'Created', 
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const dateStr = params.value;
        if (!dateStr) return '';
        try {
          const date = new Date(dateStr);
          return date.toLocaleDateString();
        } catch {
          return '';
        }
      },
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 120,
      type: 'number',
      renderCell: (params: GridRenderCellParams) => {
        if (params.value == null) return '';
        return `$${params.value.toLocaleString()}`;
      },
    },
    {
      field: 'owner',
      headerName: 'Owner',
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const owner = params.value;
        if (!owner) return 'No owner';
        const firstName = owner.firstName || '';
        const lastName = owner.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();
        return fullName || 'Unknown';
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Tooltip title="Edit car">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => handleEdit(params.row)}
              sx={{ mr: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete car">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                if (window.confirm(`Delete ${params.row.brand} ${params.row.model}?`)) {
                  deleteMutation.mutate(params.row.id);
                }
              }}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <button 
              onClick={() => queryClient.invalidateQueries({ queryKey: ['cars'] })}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'inherit', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Retry
            </button>
          }
        >
          Error loading cars: {(error as Error).message}
        </Alert>
      </Box>
    );
  }

  if (!isSuccess || !Array.isArray(data)) {
    console.error('Invalid data format:', data);
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          Invalid data received from server
        </Alert>
      </Box>
    );
  }

  // Преобразуем данные для таблицы
  const rows = data.map(car => ({
    ...car,
    brand: car.brand || '',
    model: car.model || '',
    color: car.color || '',
    regNum: car.regNum || '',
    dateOfCreation: car.dateOfCreation || '',
    price: car.price || 0,
    owner: car.owner || null,
  }));

  return (
    <Box sx={{ 
      width: '100%', 
      p: 3,
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3 
      }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          Car Management
        </Typography>
        
        <Box>
          <AddCar />
          {logOut && (
            <Button 
              variant="outlined" 
              color="secondary"
              onClick={logOut}
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
      
      {rows.length === 0 ? (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          minHeight="200px"
        >
          <Typography variant="h6" color="text.secondary">
            No cars found
          </Typography>
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { 
                page: 0, 
                pageSize: 10 
              },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell': {
              display: 'flex',
              alignItems: 'center',
            },
            border: '1px solid #e0e0e0',
            borderRadius: 1,
            boxShadow: 1,
          }}
        />
      )}
      
      {selectedCar && (
        <EditCarDialog
          open={editOpen}
          cardata={selectedCar}
          onClose={handleEditClose}
        />
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: 'center' 
        }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              fontWeight: 500,
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Carlist;