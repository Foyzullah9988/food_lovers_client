import { createBrowserRouter } from "react-router"
import App from "../App"
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Root from "../Layouts/Root";
import AllProducts from "../Pages/AllProducts";
import Login from "../Pages/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../Pages/Register";



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
        path: '/all-products',
        element: <Root />,
        children: [
            {
                path: "",
                element: <AllProducts />
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