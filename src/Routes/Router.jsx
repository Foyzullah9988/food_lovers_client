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
import AboutUs from "../Components/Footer/AboutUs";
import JoinCommunity from "../Components/Footer/JoinComunity";
import Jobs from "../Components/Footer/Jobs";
import PrivacyPolicy from "../Components/Footer/PrivacyPolicy";
import ChallengeGuide from "../Components/Footer/ChallengeGuide ";




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
                loader: () => fetch('https://foodies-zone-eta.vercel.app/reviews')
            }
        ],
    },
    {
        path: '/reviews',
        element: <Root />,
        errorElement: <Error />,
        hydrateFallbackElement: <Spinner />,
        children: [
            {
                path: "",
                element: <Products />,
                // loader: () => fetch('https://foodies-zone-eta.vercel.app/reviews')
            },
            {
                path: '/reviews/my-review',
                element: <PrivateRoute><MyReview /></PrivateRoute>,
                loader: () => fetch('https://foodies-zone-eta.vercel.app/reviews')
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
        path: '/reviews-details/:id',
        loader: ({ params }) => fetch(`https://foodies-zone-eta.vercel.app/reviews-details/${params.id}`),
        hydrateFallbackElement: <Spinner />,
        element: <ProductsDetails />
    },
    {
        path: '/update-products/:id',
        loader: ({ params }) => fetch(`https://foodies-zone-eta.vercel.app/reviews-details/${params.id}`),
        hydrateFallbackElement: <Spinner />,
        element: <PrivateRoute><UpdateReview /></PrivateRoute>
    },
    {
        path: '/reviews/add-review',
        element: <PrivateRoute><AddReview /></PrivateRoute>
    },
    {
        path: '/favorites',
        element: <PrivateRoute><Favorites /></PrivateRoute>,
        hydrateFallbackElement: <Spinner />,
        loader: () => fetch('https://foodies-zone-eta.vercel.app/favorites'),
    },
    {
        path: '/about-us',
        element: <AboutUs />
    },
    {
        path: '/join-community',
        element: <JoinCommunity />
    },
    {
        path: '/jobs',
        element: <Jobs />
    },
    {
        path: '/privacy-policy',
        element: <PrivacyPolicy />
    },
    {
        path: '/challenge-guide',
        element: <ChallengeGuide />
    },




])