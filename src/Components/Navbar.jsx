import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { MdPerson } from "react-icons/md";
import Spinner from './Spinner';
import Error from './Error';


const Navbar = () => {
    const { user, logout } = use(AuthContext)
    // console.log(user?.photoURL);
    // console.log(user);

    
    const links = <>
        <li><NavLink to='/'
            className={({ isActive }) =>
                isActive ? 'bg-[#FFE797] text-black' : ''
            }
        >Home</NavLink></li>
        <li><NavLink to='/products'
            className={({ isActive }) =>
                isActive ? 'bg-[#FFE797] text-black' : ''
            }
        >All Reviews</NavLink></li>

        {
            !user &&
            <li>
                <NavLink to='/auth/login'
                    className={({ isActive }) =>
                        isActive ? 'bg-[#FFE797] text-black' : ''
                    }
                >Login</NavLink>
            </li>

        }
        {
            !user &&
            <li>
                <NavLink to='/auth/register'
                    className={({ isActive }) =>
                        isActive ? 'bg-[#FFE797] text-black' : ''
                    }
                >Register</NavLink>
            </li>

        }
    </>
    // if (loading) return ;
    const handleLogout = () => {
        logout().then(() => {
            toast('Logged out successfully')
        }).catch((err) => {
            <Error />
            console.log(err);
        })
    }

    return (
        <div className='bg-[#9e6161fa] fixed top-0 left-0 w-full shadow-sm z-50 '>

            <div className="navbar z-50 container mx-auto ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn bg-[#c9a69f9a] hover:bg-[#b48e86] btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu bg-[#EBD9D1] menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-[#B0CE88] text-2xl font-bold"><span className='text-[#FCB53B]'>Food</span> Zone</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end space-x-2">

                    {user
                        && <div className='flex justify-center items-center gap-3'>

                            <div className="dropdown  dropdown-left  ">
                                <div tabIndex={0} role="button" className=" m-1">
                                    <div className='text-indigo-500 font-bold'>
                                        <img src={user.photoURL} alt=""
                                            referrerPolicy="no-referrer"
                                            className='w-12  rounded-full h-12 object-cover' title={user.displayName} />
                                    </div>
                                </div>
                                <ul tabIndex="-1" className="dropdown-content menu bg-[#B77466]  rounded-box z-1 w-52 p-2 shadow-sm space-y-1">
                                    <NavLink to={'/products/add-review'} className={({ isActive }) =>`${
                                        isActive ? 'bg-linear-to-r from-amber-800 to-yellow-600 hover:from-yellow-800  text-white font-semibold py-2 rounded-lg shadow-lg transition-all' : ''} p-1 rounded-sm hover:bg-linear-to-r hover:from-amber-600  hover:to-yellow-800 text-white `}>
                                        <li className=''>Add Review</li>
                                    </NavLink>
                                    <NavLink to={'/products/my-review'} className={({ isActive }) =>`${
                                        isActive ? 'bg-linear-to-r from-amber-800 to-yellow-600  text-white font-semibold py-2 rounded-lg shadow-lg transition-all' : ''} p-1 rounded-sm hover:bg-linear-to-r  hover:from-yellow-600 hover:to-amber-800 text-white `}>
                                        <li> My Reviews</li>
                                    </NavLink>
                                    <li><Link to={'/'} onClick={handleLogout} className="btn btn-secondary bg-linear-to-r from-yellow-500 to-amber-600 
                                    hover:bg-linear-to-r 
                                    hover:from-yellow-600 hover:to-red-700 ">Logout</Link></li>
                                </ul>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;