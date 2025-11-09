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
       
        {
            !user &&
            <li>
                <NavLink to='/auth/login'
                    className={({ isActive }) =>
                        isActive ? 'bg-green-400' : ''
                    }
                >Login</NavLink>
            </li>

        }
        {
            !user &&
            <li>
                <NavLink to='/auth/register'
                    className={({ isActive }) =>
                        isActive ? 'bg-green-400' : ''
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
        <div className='bg-base-100 shadow-sm'>

            <div className="navbar z-50 container mx-auto ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost text-2xl font-bold"><span className='text-[#FCB53B]'>Food</span> Zone</Link>
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
                            <Link to={'/profile'} className='text-indigo-500 font-bold'>
                                <img src={user.photoURL} alt=""
                                    referrerPolicy="no-referrer"
                                    className='w-12  rounded-full h-12 object-cover' title={user.displayName} />
                            </Link>
                            <Link to={'/'} onClick={handleLogout} className="btn btn-secondary bg-[#84994F]">Logout</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;