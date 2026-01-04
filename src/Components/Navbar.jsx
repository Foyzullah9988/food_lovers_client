import React from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import {
    MdOutlineReviews,
    MdPersonOutline,
    MdOutlineHome,
    MdOutlineLogout,
    MdOutlineAddCircleOutline,
    MdOutlineRateReview,
    MdOutlineFavoriteBorder,
    MdOutlineLogin,
    MdOutlinePersonAdd
} from "react-icons/md";
import Error from './Error';
import Theme from './Theme';

const Navbar = ({ fixed = true }) => {
    const { user, logout } = React.useContext(AuthContext);
    const location = useLocation();

    // All routes for large screens (will be centered)
    const allRoutes = [
        { path: '/', label: 'Home', icon: <MdOutlineHome className="text-lg" />, exact: true },
        { path: '/reviews', label: 'All Reviews', icon: <MdOutlineReviews className="text-lg" />, exact: false },
    ];

    // Add user-specific routes if logged in
    if (user) {
        allRoutes.push(
            { path: '/reviews/add-review', label: 'Add Review', icon: <MdOutlineAddCircleOutline className="text-lg" />, exact: true },
            { path: '/reviews/my-review', label: 'My Reviews', icon: <MdOutlineRateReview className="text-lg" />, exact: true },
            { path: '/favorites', label: 'My Favorites', icon: <MdOutlineFavoriteBorder className="text-lg" />, exact: true }
        );
    } else {
        // Add auth routes if not logged in
        allRoutes.push(
            { path: '/auth/login', label: 'Login', icon: <MdOutlineLogin className="text-lg" />, exact: true },
            { path: '/auth/register', label: 'Register', icon: <MdOutlinePersonAdd className="text-lg" />, exact: true }
        );
    }

    const handleLogout = () => {
        logout().then(() => {
            toast.success('Logged out successfully');
        }).catch((err) => {
            <Error />
            console.log(err);
        });
    };

    // Helper function to check if route is active
    const isRouteActive = (routePath, exact) => {
        if (exact) {
            return location.pathname === routePath;
        }
        // For "/reviews" route, we want it to be active only when it's exactly "/reviews"
        // Not when it's "/reviews/add-review" or "/reviews/my-review"
        if (routePath === '/reviews') {
            return location.pathname === '/reviews';
        }
        return location.pathname.startsWith(routePath);
    };

    return (
        <nav className={`${fixed ? 'fixed top-0 left-0 w-full shadow-sm z-50' : 'relative'} bg-white dark:bg-linear-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}>
            <div className="container mx-auto px-4">
                <div className="navbar lg:py-3">
                    {/* Logo - Always left */}
                    <div className="navbar-start">
                        <Link to={'/'} className="flex items-center lg:space-x-3 group">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center  backdrop-blur-sm">
                                    <img
                                        src="/nav.png"
                                        className="md:w-10 md:h-10 w-8 h-8 object-cover rounded-lg"
                                        alt="Foodies Zone Logo"
                                    />
                                </div>
                            </div>
                            <div className="text-left">
                                <h2 className="md:text-3xl sm:text-2xl text-xl font-bold tracking-tight dark:text-white">
                                    <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Foodies</span>{' '}
                                    <span className="text-[#A7C957] ">Zone</span>
                                </h2>
                                <p className="text-xs hidden lg:block text-slate-400 dark:text-gray-400 tracking-wider">DISCOVER • TASTE • SHARE</p>
                            </div>
                        </Link>
                    </div>

                    {/* All Routes - Centered on large screens */}
                    <div className="navbar-center hidden xl:flex">
                        <div className="flex items-center justify-center space-x-1">
                            {allRoutes.map((route) => {
                                const isActive = isRouteActive(route.path, route.exact);
                                return (
                                    <NavLink
                                        key={route.path}
                                        to={route.path}
                                        end={route.exact}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${isActive
                                                ? 'bg-linear-to-r from-amber-600/20 to-amber-500/10 dark:from-amber-700/30 dark:to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-600/30'
                                                : 'text-slate-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-gray-800/50'
                                            }`}
                                    >
                                        {route.icon}
                                        <span className="font-medium">{route.label}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Side - Logout/User Info on large, Avatar dropdown on small */}
                    <div className="navbar-end space-x-4">
                        {/* Theme Toggle */}
                        <Theme />

                        {user && (
                            <>
                                {/* Desktop - User info and Logout button */}
                                <div className="hidden xl:flex items-center gap-4">
                                    <div className="flex items-center gap-3 md:px-4 md:py-2 rounded-lg bg-slate-100 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700">
                                        <div className="md:w-8 md:h-8 w-6 h-6 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-full h-full rounded-full object-cover"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <span className="text-white font-semibold text-sm">
                                                    {user.displayName?.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-medium text-slate-800 dark:text-gray-100">{user.displayName}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">Food Critic</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="group flex items-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-red-600 to-red-500 dark:from-red-700 dark:to-red-600 hover:from-red-700 hover:to-red-600 border border-red-500 dark:border-red-600 hover:border-red-500/30 transition-all duration-300"
                                    >
                                        <MdOutlineLogout className="text-lg text-white group-hover:text-red-100" />
                                        <span className="font-medium text-white group-hover:text-red-100">Logout</span>
                                    </button>
                                </div>

                                {/* Mobile/Tablet - Avatar dropdown with all user options */}
                                <div className="dropdown dropdown-end xl:hidden">
                                    <div tabIndex={0} role="button" className="">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-amber-600 border-2 border-amber-500/50">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <MdPersonOutline className="text-xl text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu menu-compact bg-white dark:bg-gray-800 rounded-box mt-3 w-56 p-2 shadow-xl border border-gray-200 dark:border-gray-700">
                                        <li className="menu-title p-3 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                                                    {user.photoURL ? (
                                                        <img
                                                            src={user.photoURL}
                                                            alt={user.displayName}
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-white font-semibold">
                                                            {user.displayName?.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-gray-100">{user.displayName || 'User'}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Food Critic</p>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Mobile dropdown includes all routes */}
                                        {allRoutes.map((route) => {
                                            const isActive = isRouteActive(route.path, route.exact);
                                            return (
                                                <li key={route.path}>
                                                    <NavLink
                                                        to={route.path}
                                                        end={route.exact}
                                                        className={`flex items-center gap-2 rounded-lg ${isActive
                                                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-amber-400'
                                                            }`}
                                                    >
                                                        {route.icon}
                                                        {route.label}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                        <div className="divider my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-gray-700 dark:text-gray-300 hover:bg-linear-to-r hover:from-red-50 hover:to-red-100 dark:hover:from-red-900/20 dark:hover:to-red-800/20 hover:text-red-600 dark:hover:text-red-300 rounded-lg flex items-center gap-2"
                                            >
                                                <MdOutlineLogout className="text-lg" />
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}

                        {/* If not logged in on small screens, show hamburger menu */}
                        {!user && (
                            <div className="xl:hidden">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu menu-compact bg-white dark:bg-gray-800 rounded-box mt-3 w-56 p-2 shadow-xl border border-gray-200 dark:border-gray-700">
                                        {allRoutes.map((route) => {
                                            const isActive = isRouteActive(route.path, route.exact);
                                            return (
                                                <li key={route.path}>
                                                    <NavLink
                                                        to={route.path}
                                                        end={route.exact}
                                                        className={`flex items-center gap-2 rounded-lg ${isActive
                                                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-amber-400'
                                                            }`}
                                                    >
                                                        {route.icon}
                                                        {route.label}
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;