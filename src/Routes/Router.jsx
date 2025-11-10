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
import AddReview from "../Pages/AddReview";
import MyReview from "../Pages/MyReview";
import PrivateRoute from "./PrivateRoute";
import ProductsDetails from "../Pages/ProductsDetails";




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
            },
            {
                path: '/products/add-review',
                element: <PrivateRoute><AddReview /></PrivateRoute>
            },
            {
                path: '/products/my-review',
                element: <PrivateRoute><MyReview /></PrivateRoute>,
                 loader: () => fetch('http://localhost:3000/products')
            },

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
    {
        path: '/products-details/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/products-details/${params.id}`),
        hydrateFallbackElement:<Spinner/>,
        element: <PrivateRoute><ProductsDetails /></PrivateRoute>
    }


])