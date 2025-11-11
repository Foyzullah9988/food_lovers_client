import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col min-h-screen bg-base-100'>
            <Navbar />
            <div className='flex flex-col justify-center items-center '>
                <div className=''>
                   <img src='/error-404.png' alt="" className='h-96'/>
                </div>
                <div className='space-y-2  flex flex-col justify-center items-center '>
                    
                    <Link to={'/'} className='btn bg-linear-to-bl to-[#ff1a1a] from-[#F16767]text-white'>Go Back To Home !</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Error;