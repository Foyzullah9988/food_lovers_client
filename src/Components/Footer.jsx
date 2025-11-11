import React from 'react';
import { FaFacebook, FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

const Footer = () => {
    return (
        <div className='bg-base-200 pt-7'>
            <footer className="footer footer-horizontal footer-center  text-base-content rounded p-10 container mx-auto">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover"> Privacy policy</a>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a href='https://x.com/'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 28 28"
                                className="fill-current">
                                <FaSquareXTwitter size={28}/>
                            </svg>
                        </a>
                        <a href='https://www.youtube.com/'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 28 28"
                                className="fill-current">
                                <IoLogoYoutube size={28}/>
                            </svg>
                        </a>
                        <a href='https://www.facebook.com/'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 28 28"
                                className="fill-current">
                                <FaFacebook size={28}/>

                            </svg>
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by © 2025 FoodieApp Ltd</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;