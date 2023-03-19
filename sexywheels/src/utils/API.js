import axios from 'axios';
const BASE_URL = 'https://sexywheels-api.onrender.com/api';
export const getUserByUsername = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: `${email}`,
            password: `${password}`
        })
    });
    const data = await response.json();
    return data;
}
export const removeResetPassword = async (userId, password) => {
    const response = await fetch(`.${BASE_URL}/users/password_reset/${userId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: `${password}`
        })
    });
    const data = await response.json();
    return data;
}

export const getCart = async (token) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

export const registerUser = async ({
    firstName,
    lastName,
    password,
    phone,
    email,
    shippingAddress,
    billingAddress
}) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        // not sure if the body object needs to be setup like it is in loginUser below or not
        body: JSON.stringify({
            firstName: `${firstName}`,
            lastName: `${lastName}`,
            password: `${password}`,
            phone: phone,
            email: `${email}`,
            shippingAddress: shippingAddress,
            billingAddress: billingAddress
        })
    });
    const data = await response.json();
    return data;
}
export const deleteCartItem = async (token, cartItemId) => {
    const response = await fetch(`${BASE_URL}/cart/${cartItemId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
export const deleteCart = async (token) => {
    const response = await fetch(`${BASE_URL}/cart`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
export const loginUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: `${email}`,
            password: `${password}`
        })
    });
    const data = await response.json();
    return data;
}

export const getAllOrders = async (token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

export const updateUser = async ({ token, ...fields }) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...fields })
    });
    const data = await response.json();
    return data;
}
export const addCarToCart = async (token, carId) => {
    const response = await fetch(`${BASE_URL}/cart/cars/${carId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}
export const getCarById = async (carId) => {
    const response = await fetch(`${BASE_URL}/cars/${carId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}

export const getAllCars = async () => {
    const response = await fetch(`${BASE_URL}/cars`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}

export const getCarsByCategory = async (categoryId) => {
    const response = await fetch(`${BASE_URL}/categories/tagged_cars/${categoryId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}
export async function getAPIHealth() {
    try {
      const { data } = await axios.get('/api/health');
      return data;
    } catch (err) {
      console.error(err);
      return { healthy: false };
    }
  }