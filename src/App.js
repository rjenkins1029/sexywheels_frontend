import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import NotFound from "./NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Root from "./pages/Root";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "home",
            element: <Home />,
          },
          
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "Checkout",
            element: <Checkout />
          }
        ],
  },
]);

function App() {
  return (
      <div className="App">
          <RouterProvider router={router} />
      </div>
  )
}

export default App;