import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';


const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#F2F6D0]'>
            <Navbar/>
            
            <div className='flex-1 container mx-auto mt-16'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;