import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>


            <Navbar />

            <div className='flex-1  mx-auto bg-center bg-cover w-full' style={{backgroundImage:"url('/bg.png')"}}>
                <div className=''>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;