import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex flex-col '>


            <Navbar fixed={false} />

            <div className='relative flex-1 min-h-[135vh] mx-auto bg-center bg-cover w-full ' style={{ backgroundImage: "url('/bg.png')" }}>

                <div className='absolute inset-0 backdrop-blur-md bg-black/30'>
                    <div className='relative z-10 flex justify-center items-center '>
                        <Outlet />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AuthLayout;