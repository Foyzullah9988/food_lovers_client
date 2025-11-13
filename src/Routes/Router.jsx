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
import UpdateReview from "../Pages/UpdateReview";
import Favorites from "../Pages/Favorites";
import PublicRoutes from "./PublicRoutes";




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
                loader: () => fetch('https://foodies-zone-eta.vercel.app/products')
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
                // loader: () => fetch('https://foodies-zone-eta.vercel.app/products')
            },
            {
                path: '/products/my-review',
                element: <PrivateRoute><MyReview /></PrivateRoute>,
                loader: () => fetch('https://foodies-zone-eta.vercel.app/products')
            },

        ]
    },
    {
        path: '/auth',
        element: <PublicRoutes><AuthLayout /></PublicRoutes>,
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
        loader: ({ params }) => fetch(`https://foodies-zone-eta.vercel.app/products-details/${params.id}`),
        hydrateFallbackElement: <Spinner />,
        element: <PrivateRoute><ProductsDetails /></PrivateRoute>
    },
    {
        path: '/update-products/:id',
        loader: ({ params }) => fetch(`https://foodies-zone-eta.vercel.app/products-details/${params.id}`),
        hydrateFallbackElement: <Spinner />,
        element: <PrivateRoute><UpdateReview /></PrivateRoute>
    },
    {
        path: '/products/add-review',
        element: <PrivateRoute><AddReview /></PrivateRoute>
    },
    {
        path: '/favorites',
        element: <PrivateRoute><Favorites /></PrivateRoute>,
        hydrateFallbackElement: <Spinner />,
        loader: () => fetch('https://foodies-zone-eta.vercel.app/favorites'),
    },



])