import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { updateUser } from "../utils/API";

const theme = createTheme();
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
    width: 600,
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditUserInfo = ({ token, user }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const firstName = data.get('firstName');
        const lastName = data.get('lastName');
        const phone = data.get('phone');
        const email = data.get('email');
        const streetShipping = data.get('streetShipping');
        const cityShipping = data.get('cityShipping');
        const stateShipping = data.get('stateShipping');
        const zipShipping = data.get('zipShipping');
        const streetBilling = data.get('streetBilling');
        const cityBilling = data.get('cityBilling');
        const stateBilling = data.get('stateBilling');
        const zipBilling = data.get('zipBilling');
        const shippingAddress = {
            "address": streetShipping,
            "city": cityShipping,
            "state": stateShipping,
            "zip": Number(zipShipping)
        };
        const billingAddress = {
            "address": streetBilling,
            "city": cityBilling,
            "state": stateBilling,
            "zip": Number(zipBilling)
        };

        const userData = {
            firstName,
            lastName,
            phone,
            email,
            shippingAddress,
            billingAddress
        };


        const updatedUser = await updateUser({ token, ...userData });

        if (updatedUser.error) {
            setErrorMessage(updatedUser.message)
        }
        console.log(updatedUser)
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}>
                Edit Account Info
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Account Info
                    </Typography>
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
                                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                defaultValue={user.firstName}
                                                autoComplete="given-name"
                                                name="firstName"
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                defaultValue={user.lastName}
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                defaultValue={user.email}
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                defaultValue={user.phone}
                                                fullWidth
                                                name="phone"
                                                label="Phone"
                                                type="number"
                                                id="phone"
                                                autoComplete="phone"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                defaultValue={user.phone}
                                                fullWidth
                                                name="username"
                                                label="Username"
                                                type="user"
                                                id="username"
                                                autoComplete="username"
                                            />
                                        </Grid>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Save Changes
                                        </Button>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Box>
            </Modal>
        </>
    );
}

export default EditUserInfo;