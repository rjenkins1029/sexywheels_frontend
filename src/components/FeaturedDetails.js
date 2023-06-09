import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from 'react';
 
import { Button, CardActionArea, CardActions } from '@mui/material';

import { addCarToCart, getCart, getCarById } from "../utils/API";


const FeaturedDetails = ({ featuredCar, setFeaturedCar, setIsLoading, token, cartItems, setCartItems }) => {
    const {
        id,
        image1,
        image2,
        name,
        price,
        description,
        
    } = featuredCar;
    

    let inCart = false;
    for (let item of cartItems) {
        if (item.id === id) {
            inCart = true;
            break;
        }
    }

    const handleBackClick = async (event) => {
        setIsLoading(true);
        setFeaturedCar({});
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

    return <Grid item xs={12}>
        <Paper elevation={6} sx={{ border: '1px solid black', minWidth: '980px' }}>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', position: 'relative', top: 25, height: 0, margin: 0, padding: 0 }}>
                <Button
                    variant="contained"
                    
                    onClick={handleBackClick}
                    sx={{ ml: 1 }}
                >
                    Back
                </Button>
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
            <Box sx={{ display: 'flex', borderBottom: '1px solid black' }}>
                <img
                    src={image1}
                    alt=""
                    className="featuredImages"
                />
                <img
                    src={image2 ? image2 : 'https://hotwheelsunleashed.com/wp-content/uploads/2022/04/Veicolo_HOT-WHEELS%E2%84%A2-ScreenshotCollection_096_Camera_Marketing.png'}
                    alt={image2 ? "" : "Placeholder image"}
                    className="featuredImages"
                />
            </Box>
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
                            <Typography variant="h2" component="h1" sx={{ fontWeight: "bold" }}>
                                {name}
                            </Typography>
                        </Box>
                        
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", minWidth: '980px', textAlign: 'center', mt: 2 }}>
                        
                    </Typography>
                    <Typography variant="h6" component="p" sx={{ fontWeight: "bold", minWidth: '980px', textAlign: 'center', borderTop: '1px solid black', borderBottom: '1px solid black', mt: 2, p: 2 }}>   
                        {description}
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: "bold", minWidth: '980px', textAlign: 'center', mt: 2 }}>
                        
                        
                        
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
                        <Typography variant="h4" component="h2" sx={{ mt: 1, fontWeight: "bold", display: 'flex', justifyContent: 'center', pb: 1, mt: 2}}>
                            Price: ${price}
                        </Typography>
                        
                </Box>
            </Box>      
        </Paper>
    </Grid>
}

export default FeaturedDetails;