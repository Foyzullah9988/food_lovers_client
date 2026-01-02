import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
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

const Navbar = ({ fixed = true }) => {
    const { user, logout } = use(AuthContext);

    // All routes for large screens (will be centered)
    const allRoutes = [
        { path: '/', label: 'Home', icon: <MdOutlineHome className="text-lg" /> },
        { path: '/products', label: 'All Reviews', icon: <MdOutlineReviews className="text-lg" /> },
    ];

    // Add user-specific routes if logged in
    if (user) {
        allRoutes.push(
            { path: '/products/add-review', label: 'Add Review', icon: <MdOutlineAddCircleOutline className="text-lg" /> },
            { path: '/products/my-review', label: 'My Reviews', icon: <MdOutlineRateReview className="text-lg" /> },
            { path: '/favorites', label: 'My Favorites', icon: <MdOutlineFavoriteBorder className="text-lg" /> }
        );
    } else {
        // Add auth routes if not logged in
        allRoutes.push(
            { path: '/auth/login', label: 'Login', icon: <MdOutlineLogin className="text-lg" /> },
            { path: '/auth/register', label: 'Register', icon: <MdOutlinePersonAdd className="text-lg" /> }
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

    return (
        <nav className={`${fixed ? 'fixed top-0 left-0 w-full shadow-sm z-50' : 'relative'} bg-linear-to-r from-[#003450] to-[#002133]`}>
            <div className="container mx-auto px-4">
                <div className="navbar py-2">
                    {/* Logo - Always left */}
                    <div className="navbar-start">
                        <Link to={'/'} className="flex items-center space-x-2 group">
                            <div className="relative">
                                <div className="w-10   bg-linear-to-br  flex items-center ">
                                    <img
                                        src="/nav.png"
                                        className="w-12 h-12  object-cover"
                                        alt="Foodies Zone Logo"
                                    />
                                </div>
                                
                            </div>
                            <div className="text-left">
                                <h2 className="text-3xl font-bold ">
                                    <span className="text-[#FFB703]">Foodies</span>{' '}
                                    <span className="text-[#A7C957]">Zone</span>
                                </h2>
                                <p className="text-sm hidden lg:block text-gray-400 ">Discover • Taste • Share</p>
                            </div>
                        </Link>
                    </div>

                    {/* All Routes - Centered on large screens */}
                    <div className="navbar-center hidden xl:flex">
                        <div className="flex items-center justify-center space-x-4 xl:space-x-2">
                            {allRoutes.map((route) => (
                                <NavLink
                                    key={route.path}
                                    to={route.path}
                                    end={route.path === '/'}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                                            ? 'bg-white/20 text-white'
                                            : 'text-white/80 hover:text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    {route.icon}
                                    <span>{route.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Logout/User Info on large, Avatar dropdown on small */}
                    <div className="navbar-end">
                        {/* Large screens: Show only logout button if user exists */}

                        {user && (
                            <>
                                {/* Desktop - Logout button */}
                                <div className="hidden xl:flex items-center gap-4">

                                    <button
                                        onClick={handleLogout}
                                        className="btn btn-sm btn-error text-white bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 border-0 flex items-center gap-2"
                                    >
                                        <MdOutlineLogout className="text-lg" />
                                        <span className="hidden xl:inline">Logout</span>
                                    </button>
                                </div>

                                {/* Mobile/Tablet - Avatar dropdown with all user options */}
                                <div className="dropdown dropdown-end xl:hidden">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-14 rounded-full border-2 border-[#FFB703]">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                                    <MdPersonOutline className="text-2xl text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu menu-compact bg-[#003450] rounded-box mt-3 w-56 p-2 shadow-lg border border-white/10">
                                        <li className="menu-title text-white/70 p-2">
                                            <span className="truncate">{user.displayName || 'User'}</span>
                                        </li>
                                        {/* Mobile dropdown includes all routes */}
                                        {allRoutes.map((route) => (
                                            <li key={route.path}>
                                                <NavLink
                                                    to={route.path}
                                                    end={route.path === '/'}
                                                    className="text-white hover:bg-white/10 rounded-lg flex items-center gap-2"
                                                >
                                                    {route.icon}
                                                    {route.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                        <div className="divider my-1"></div>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-white hover:bg-red-500/20 hover:text-red-300 rounded-lg flex items-center gap-2"
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
                            <div className="lg:hidden">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu menu-compact bg-[#003450] rounded-box mt-3 w-56 p-2 shadow-lg border border-white/10">
                                        {allRoutes.map((route) => (
                                            <li key={route.path}>
                                                <NavLink
                                                    to={route.path}
                                                    end={route.path === '/'}
                                                    className="text-white hover:bg-white/10 rounded-lg flex items-center gap-2"
                                                >
                                                    {route.icon}
                                                    {route.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* If not logged in on large screens, nothing shows on right */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;