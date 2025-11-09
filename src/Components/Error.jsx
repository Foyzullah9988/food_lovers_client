import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-1 flex flex-col justify-center items-center'>
                <div>
                   <img src='/error-404.png' alt="" />
                </div>
                <div className='space-y-2 mt-2 flex flex-col justify-center items-center'>
                    <h2 className='text-xl font-bold'>Oops, page not found!</h2>
                    <p>The page you are looking for is not available.</p>
                    <Link to={'/'} className='btn bg-gradient-to-bl to-green-400 from-green-800 text-white'>Go Back To Home !</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Error;