import { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert,
    Container,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography
} from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Carlist from './Carlist';

type User = {
    username: string;
    password: string;
};

const queryClient = new QueryClient();

function Login() {
    const [user, setUser] = useState<User>({ username: '', password: '' });
    const [isAuthenticated, setAuth] = useState(false);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const handleLogin = () => {
        axios.post(`${import.meta.env.VITE_API_URL}/login`, user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            const jwtToken = res.headers.authorization;
            if (jwtToken) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
        })
        .catch(() => {
            setErrorMessage('Login failed: Check your username and password');
            setOpen(true);
        });
    };

    const handleLogout = () => {
        setAuth(false);
        sessionStorage.setItem("jwt", "");
    };

    if (isAuthenticated) {
        return (
            <QueryClientProvider client={queryClient}>
                <Carlist logOut={handleLogout} />
            </QueryClientProvider>
        );
    }

    return (
        <Container maxWidth="xl">
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Car Shop
                    </Typography>
                </Toolbar>
            </AppBar>
            
            <Stack spacing={2} alignItems="center" mt={5}>
                <TextField
                    name="username"
                    label="Username"
                    onChange={handleChange}
                    sx={{ width: '300px' }}
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleChange}
                    sx={{ width: '300px' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ width: '300px' }}
                >
                    Login
                </Button>
            </Stack>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Login;