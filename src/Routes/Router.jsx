import { createBrowserRouter } from "react-router"
import App from "../App"
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import Products from "../Pages/Products";
import Login from "../Pages/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register";
import Spinner from "../Components/Spinner";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: "",
                element: <Home />
            }
        ],
    },
    {
        path: '/products',
        element: <Root />,
        hydrateFallbackElement: <Spinner />,
        children: [
            {
                path: "",
                element: <Products />,
                loader: () => fetch('http://localhost:3000/products')
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
        ]
    },

])