import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='flex flex-col min-h-screen '>
            <Navbar />
            <div className='flex flex-col flex-1 justify-center items-center mt-6  '>
                <div className=''>
                    <img src='/error-404.png' alt="" className='h-96 dark:invert dark:opacity-80 dark:mix-blend-screen ' />
                </div>
                <div className='space-y-2 flex flex-col justify-center items-center'>
                    <Link 
                        to={'/'} 
                        className='group/btn w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 dark:shadow-gray-900/50 dark:from-amber-950  dark:to-black'
                    >
                        Go Back To Home !
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Error;