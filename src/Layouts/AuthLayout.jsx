import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>


            <Navbar fixed={false} />

            <div className='relative flex-1  mx-auto bg-center bg-cover w-full min-h-[84vh]' style={{ backgroundImage: "url('/bg.png')" }}>

                <div className='absolute inset-0 backdrop-blur-md bg-black/30'>
                    <div className='relative z-10 flex justify-center items-center '>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;