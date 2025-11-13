import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { MdOutlineReviews, MdPerson } from "react-icons/md";
import Spinner from './Spinner';
import Error from './Error';
import { FaHome } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';





const Navbar = ({ fixed = true }) => {
    const { user, logout } = use(AuthContext)
    // console.log(user?.photoURL);
    // console.log(user);


    const links = <>
        <li><NavLink to='/'
            className='p-1 rounded-sm  hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'
        ><FaHome />Home</NavLink></li>

        <li><NavLink to='/products' end
            className=' p-1 rounded-sm  hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'
        ><MdOutlineReviews />All Reviews</NavLink></li>

        {
            !user &&
            <li>
                <NavLink to='/auth/login'
                    className=' p-1 rounded-sm  hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'
                >Login</NavLink>
            </li>

        }
        {
            !user &&
            <li>
                <NavLink to='/auth/register'
                    className='p-1 rounded-sm  hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'
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
    // bg-[#2F3E46]
    return (
        <div className={`${fixed ? 'fixed top-0 left-0 w-full shadow-sm z-50' : 'relative'} bg-[#003450]`}>

            <div className="navbar z-50 container mx-auto ">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn bg-[#002133] hover:bg-[#003b5a] btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="dropdown-content menu bg-[#3C4F57]  rounded-box z-1 w-52 p-2 shadow-sm font-semibold space-y-1">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <div className="">
                        <Link to={'/'} className="bg-[#003450] ml-2 text-[#A7C957] text-2xl md:text-4xl font-bold flex items-center space-x-2">
                        <figure>
                            <img src="/nav.png" className='md:w-12  rounded-full md:h-12 h-8 w-8 object-cover' alt="" />
                        </figure>
                        <p><span className='text-[#FFB703]'>Foodies</span> Zone</p>
                        </Link> 
                        
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-2">
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
                                <ul tabIndex="-1" className="dropdown-content menu bg-[#3C4F57]  rounded-box z-1 w-52 p-2 shadow-sm font-semibold space-y-1">
                                    <li>
                                        <NavLink to={'/products/add-review'} end
                                            className='p-1 rounded-sm  hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'>
                                            Add Reviews
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/products/my-review'} end className='p-1 rounded-sm hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'>
                                            My Reviews
                                        </NavLink>
                                    </li>
                                    <NavLink to={'/favorites'} className=' p-1 rounded-sm hover:bg-linear-to-r hover:from-[#307491] hover:to-[#014d70]'>
                                        <li className=''>My Favorites</li>
                                    </NavLink>
                                    <li><Link to={'/'} onClick={handleLogout} className="btn  bg-linear-to-r to-cyan-800 from-cyan-600 hover:bg-linear-to-r hover:to-cyan-600  hover:from-cyan-800">Logout<IoLogOut /></Link></li>
                                </ul>
                                <p className='bg-[#4a2424]'></p>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;