import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';


const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
            <Hero/>
            <div className='flex-1 container mx-auto'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;