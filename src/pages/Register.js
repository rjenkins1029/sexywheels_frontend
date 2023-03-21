import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { registerUser } from '../utils/API';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/home">
        Sexy Wheels
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, [token, navigate]);
      
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const data = new FormData(event.currentTarget);
        const password = data.get('password');
        const passwordConfirm = data.get('passwordConfirm');

        if (password.length < 8) {
            setPasswordError(true);
        } else if (password.length >= 8) {
            setPasswordError(false);
        }
        
        if (passwordConfirm.length < 8) {
            setPasswordConfirmError(true);
        } else if (passwordConfirm.length >= 8) {
            setPasswordConfirmError(false);
        }
        
        if (passwordError || passwordConfirmError) {
            setIsLoading(false);
            return;
        }

        if (password !== passwordConfirm) {
            setPasswordsMatch(false);
            setIsLoading(false);
            return;
        } else {
            setPasswordsMatch(true);
        }

        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const phone = data.get('phone');
        const email = data.get('email');
        const username = data.get('username');
        
       

        const userData = {
            firstName,
            lastName,
            password,
            phone,
            email,
            username
            
        };
        // console.log(userData);
        const registeredUser = await registerUser(userData);
        // console.log(registeredUser);
        if (registeredUser.error) {
            setErrorMessage(registeredUser.message);
        } else {
            localStorage.setItem('token', registeredUser.token);
            setToken(registeredUser.token);
        }
        setIsLoading(false);
    };

    return (
    <>
        {
            isLoading && <Loading />
        }
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                />
                            </Grid>
                            {
                                !errorMessage ?
                                    <Grid item xs={12}>
                                        <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        />
                                    </Grid>
                                :
                                    <Grid item xs={12}>
                                        <TextField
                                        error
                                        helperText={errorMessage}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        />
                                    </Grid>
                            }
                            {
                                passwordError ?
                                        <Grid item xs={12}>
                                            <TextField
                                            error
                                            helperText="Password too short"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            />
                                        </Grid>
                                :
                                    !passwordsMatch ? 
                                        <Grid item xs={12}>
                                            <TextField
                                            error
                                            helperText="Passwords don't match"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            />
                                        </Grid>
                                    :
                                        <Grid item xs={12}>
                                            <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            />
                                        </Grid>   
                            }
                            {
                                passwordConfirmError ?
                                    <Grid item xs={12}>
                                        <TextField
                                        error
                                        helperText="Password too short"
                                        required
                                        fullWidth
                                        name="passwordConfirm"
                                        label="Confirm Password"
                                        type="password"
                                        id="passwordConfirm"
                                        autoComplete="new-password"
                                        />
                                    </Grid>
                                :
                                    !passwordsMatch ? 
                                        <Grid item xs={12}>
                                            <TextField
                                            error
                                            helperText="Passwords don't match"
                                            required
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirm"
                                            autoComplete="new-password"
                                            />
                                        </Grid>
                                    :
                                        <Grid item xs={12}>
                                            <TextField
                                            required
                                            fullWidth
                                            name="passwordConfirm"
                                            label="Confirm Password"
                                            type="password"
                                            id="passwordConfirm"
                                            autoComplete="new-password"
                                            />
                                        </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type="number"
                                    id="phone"
                                    autoComplete="phone"
                                />
                            </Grid>
                        
                                
                                   
                        </Grid>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    </>
  );
}