import Car from "../components/Car";
import {getAllCars, createOrder, createGuestOrder, getStripeCheckout, getCart} from "../utils/API"
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from "@mui/system";
import FeaturedDetails from "../components/FeaturedDetails";
import Loading from "../components/Loading";
import { Box, Button, Autocomplete, TextField, Grid } from "@mui/material";
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */
const Home = () => {

    return (
        <>
          <Container style={{
            textAlign: "center",
          }}>
            <Link to="../car">
              <img style={{ fontSize: "48px", padding: "3%" }}
                src="https://diecastmotorsports.files.wordpress.com/2023/01/cropped-07-shellby-gt500-10-speed-machines-on-orange-track-1200px.png"></img>
            </Link>
            <Card.Text className='mt-4'
              style={{ textAlign: 'center', fontSize: '40px', fontWeight: '800' }}>
              <img src='https://st.depositphotos.com/1008768/3366/i/450/depositphotos_33667401-stock-photo-free-shipping-sign.jpg' width='10%' />
              Enjoy Free Shipping on All Orders!
            </Card.Text>
          </Container>
        </>
      )
      
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