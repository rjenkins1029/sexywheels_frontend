import Car from "../components/Car";
import {getAllCars, createOrder, createGuestOrder, getStripeCheckout, getCart} from "../utils/API"
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import FeaturedDetails from "../components/FeaturedDetails";
import Loading from "../components/Loading";
import { Box, Button, Autocomplete, TextField, Grid } from "@mui/material";
/**
 * COMPONENT
 */
const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [cars, setCars] = useState([]);
    const [featuredCar, setFeaturedCar] = useState({});
    const [token, setToken, adminToken, setAdminToken, cartItems, setCartItems, checkoutId, setCheckoutId] = useOutletContext();

    const renderStoreFront = async () => {
        setIsLoading(true);
        if (token) {
            if (checkoutId) {
                const checkoutSession = await getStripeCheckout(checkoutId);
                const date = new Date();
                const timestamp = date.toISOString();
                if (checkoutSession.session.payment_status === "paid") {
                        localStorage.removeItem('checkoutId');
                        setCheckoutId('');
                        await createOrder(token, timestamp);
                }
            }
            const userCart = await getCart(token);
            setCartItems(userCart.cartItems)
        } else {
            if (checkoutId) {
                const checkoutSession = await getStripeCheckout(checkoutId);
                const date = new Date();
                const timestamp = date.toISOString();
                if (checkoutSession.session.payment_status === "paid") {
                    localStorage.removeItem('checkoutId');
                    setCheckoutId('');
                    await createGuestOrder(cartItems, timestamp);
                    localStorage.removeItem('cartItems');
                    setCartItems([]);
                }
                
            }
        } 
        const getCars = await getAllCars();  
            return getCars     
    }
    
}
export default Home;