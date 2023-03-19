import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from 'react';
import { Button, CardActions } from '@mui/material';
import { addCarToCart, getCart, getCarById } from "../API";


const Car = ({ id, imgURL, name, price, car, setFeaturedCar, setIsLoading, token, cartItems, setCartItems, inCart }) => {
    const handleDetailsButtonClick = async (event) => {
        setIsLoading(true);
        const carId = Number(event.target.getAttribute('data-details'));
        const car = await getCarById(carId);
        setFeaturedCar(car);
        setIsLoading(false);                   
    }

    const handleAddToCartButtonClick = async (event) => {
        setIsLoading(true);
        const cartItemId = Number(event.target.getAttribute('data-cart'));
        if (token) {
            const cartItem = await addCarToCart(token, cartItemId);
            const userCart = await getCart(token);
            setCartItems(userCart.cartItems);
        } else {
            const guestCartItems = [ ...cartItems ]
            const cartItem = await getCarById(cartItemId);
            if (!guestCartItems.includes(cartItem)) {
                guestCartItems.push(cartItem);
            }
            const guestCartItemsString = JSON.stringify(guestCartItems)
            localStorage.setItem('cartItems', guestCartItemsString);
            setCartItems(guestCartItems);
        }
        setIsLoading(false);
    }

    return <Grid item xs={4}>
        <Paper elevation={6} sx={{ border: '1px solid black' }}>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: 375, height: 0, margin: 0, padding: 0 }}>
                <Button
                    data-cart={id}
                    variant="contained"

                    onClick={handleAddToCartButtonClick}
                    sx={{ mr: 1 }}
                    disabled={inCart}
                >
                    Add To Cart
                </Button>
            </CardActions>
            <img
                src={imgURL}
                alt=""
                className="img"
            />
            <Box paddingX={2}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        pt: 1
                    }}
                    >
                       
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'end'
                            }}
                        >
                            <Typography variant="h4" component="h2" sx={{ fontWeight: "bold" }}>
                                {name}
                            </Typography>
                        </Box>
                       
                </Box>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", textAlign: 'center' }}>   
                            {car}
                        </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'end'
                    }}
                    >
                    <Typography variant="h6" component="h2" sx={{ mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center' }}>   
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed risus pretium quam vulputate dignissim suspendisse in est ante.
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ ml: 2, mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center' }}>   
                        
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'end',
                        pb: 1
                    }}
                    >
                        
                        <Typography variant="h6" component="h2" sx={{ mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center', pb: 1 }}>
                            Price: ${price}
                        </Typography>
                        
                </Box>
            </Box>      
        </Paper>
    </Grid>
}

export default Car;