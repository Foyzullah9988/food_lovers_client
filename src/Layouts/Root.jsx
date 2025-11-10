import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';


const Root = () => {
    return (
        <div className='flex flex-col min-h-screen bg-base-100'>
            <Navbar />
            <div className='flex-1 '>

                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;