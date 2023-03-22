import * as React from 'react';
import NavBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Badge, Modal } from '@mui/material';
import { useState } from 'react';


export default function ButtonAppBar({ token, setToken, adminToken, setAdminToken, cartItems, setCartItems}) {
  const { href } = window.location;
  const BASE_URL = 'http://localhost:3000/'
  const [menuWindowOpen, setMenuWindowOpen] = useState(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%%',
    bgcolor: '#1976d2',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    color: 'white'
  };

  const handleMenuWindowClose = () => {
    setMenuWindowOpen(false);
  }

  const handleMenuClick = () => {
    setMenuWindowOpen(true);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('cartItems');
    setToken('');
    setAdminToken('');
    setCartItems([]);
  }

  const matches = useMediaQuery('(max-width:980px)');

  return (
    <Box sx={{ flexGrow: 1, minWidth: '980px' }}>
      <NavBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sexy Wheels
          </Typography>
            {
              matches &&
              <>
              <MenuIcon
                onClick={handleMenuClick}
                sx={{
                    ":hover": {
                        cursor: 'pointer'
              }}}/>
                <Modal
                    open={menuWindowOpen}
                    onClose={handleMenuWindowClose}
                    slotProps={{ backdrop: {sx: { background: 'transparent '}}}}>
                  <Box sx={style}>
                  {
                    href !== BASE_URL + 'home' 
                    && 
                    <Button color="inherit" href="/home">Home</Button>
                  }
                  {
                    adminToken 
                    && 
                    href !== BASE_URL + 'admin' 
                    && 
                    <Button color="inherit" href="/admin">Admin</Button>
                  }
                  {
                    token 
                    &&
                    href !== BASE_URL + 'profile' 
                    && 
                    <Button color="inherit" href="/profile">Profile</Button>
                  }
                  {
                    token 
                    &&
                    <Button color="inherit" href="/home"onClick={logout}>Logout</Button>
                  }
                  {
                    !token 
                    && 
                    href !== BASE_URL + 'register' 
                    && 
                    <Button color="inherit" href="/register">Register</Button>
                  }
                  {
                    !token 
                    &&
                    href !== BASE_URL + 'login' 
                    && 
                    <Button color="inherit" href="/login">Login</Button>
                  }
                  {
                    href !== BASE_URL + 'checkout' 
                    && 
                    <Button color="inherit" href="/checkout">
                        Cart
                    </Button>
                  }
                  </Box>
                </Modal>
              </>
            }
            {
              !matches
              &&
              href !== BASE_URL + 'home' 
              && 
              <Button color="inherit" href="/home">Home</Button>
            }
            {
              !matches
              &&
              adminToken 
              && 
              href !== BASE_URL + 'admin' 
              && 
              <Button color="inherit" href="/admin">Admin</Button>
            }
            {
              !matches
              &&
              token 
              &&
              href !== BASE_URL + 'profile' 
              && 
              <Button color="inherit" href="/profile">Profile</Button>
            }
            {
              !matches
              &&
              token 
              &&
              <Button color="inherit" href="/home"onClick={logout}>Logout</Button>
            }
            {
              !matches
              &&
              !token 
              && 
              href !== BASE_URL + 'register' 
              && 
              <Button color="inherit" href="/register">Register</Button>
            }
            {
              !matches
              &&
              !token 
              &&
              href !== BASE_URL + 'login' 
              && 
              <Button color="inherit" href="/login">Login</Button>
            }
            {
              !matches
              &&
              href !== BASE_URL + 'checkout' 
              && 
              <IconButton
                size="large"
                color="inherit"
                title="Checkout" 
                aria-label="checkout"
                href="/checkout"
              >
                <Badge badgeContent={cartItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            } 
        </Toolbar>
      </NavBar>
    </Box>
  );
}