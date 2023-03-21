
const BASE_URL = 'https://sexywheels-api.onrender.com/api';
export const getUserByUsername = async (username, password) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: `${username}`,
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
    username
}) => {
  console.log(username, "USERNAME")
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        // not sure if the body object needs to be setup like it is in loginUser below or not
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            phone: phone,
            email: email,
            
        })
    });
    console.log(response,"STRING")
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
export const loginUser = async (username, password) => {
  // console.log(password, "PASSWORD ELIJAH")
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    // console.log(response, "responsey boys")
    
    const data = await response.json();
    console.log(data , "RICKY")
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

export const getCarCategories = async () => {
  const response = await fetch(`${BASE_URL}/cars/categories`, {
      headers: {
        'Content-Type': 'application/json'
      },
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
      const { data } = await fetch('/api/health');
      return data;
    } catch (err) {
      console.error(err);
      return { healthy: false };
    }
  }

  export const getUser = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}
export const getOrders = async (token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}

export const getStripeCheckout = async (checkoutId) => {
  const response = await fetch(`${BASE_URL}/cart/stripe/${checkoutId}`, {
      headers: {
        'Content-Type': 'application/json'
      }
  });
  const data = await response.json();
  return data;
}
export const stripeCheckoutSession = async (cartItems) => {
  const response = await fetch(`${BASE_URL}/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          cartItems
      })
  });
  const data = await response.json();
  return data;
}
