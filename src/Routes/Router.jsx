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
import Error from "../Components/Error";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        hydrateFallbackElement: <Spinner />,
        children: [
            {
                path: "",
                element: <Home />,
                loader: () => fetch('http://localhost:3000/products')
            }
        ],
    },
    {
        path: '/products',
        element: <Root />,
        errorElement: <Error />,
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
        errorElement: <Error />,
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