import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';


const Root = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#F4F6F5]'>
            <Navbar />
            <div className='flex-1 mt-16 dark:bg-base-200'>

                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;