import React from 'react';
import { FaFacebook, FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube, IoLocationOutline, IoCallOutline, IoMailOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import { FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
    

    return (
        <footer className="bg-linear-to-b mt-6 from-[#1E2729] to-[#2C3639] text-[#DADADA] pt-12 pb-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#FFB703] via-[#A7C957] to-[#FFB703]"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br from-[#FFB703]/10 to-[#A7C957]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-linear-to-tr from-[#A7C957]/10 to-[#FFB703]/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
                    {/* Logo */}
                    <Link to={'/'} className="flex items-center space-x-3 mb-6 lg:mb-0 group">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-linear-to-br  flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                <img 
                                    src="/nav.png" 
                                    className="w-10 h-10 rounded-full object-cover" 
                                    alt="Foodies Zone Logo" 
                                />
                            </div>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#A7C957] rounded-full animate-ping opacity-75"></div>
                        </div>
                        <div className="text-left">
                            <h2 className="text-3xl font-bold leading-tight">
                                <span className="text-[#FFB703]">Foodies</span>{' '}
                                <span className="text-[#A7C957]">Zone</span>
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">Discover • Taste • Share</p>
                        </div>
                    </Link>

                   
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-[#3D4A4D] relative inline-block">
                            Quick Links
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-linear-to-r from-[#FFB703] to-[#A7C957]"></span>
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { to: '/about-us', label: 'About us' },
                                { to: '/jobs', label: 'Jobs' },
                                { to: '/privacy-policy', label: 'Privacy Policy' },
                               
                            ].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.to}
                                        className="flex items-center text-gray-400 hover:text-white group/link transition-colors duration-200"
                                    >
                                        <span className="group-hover/link:text-[#FFB703] transition-colors duration-200">{item.label}</span>
                                        <FiArrowUpRight className="ml-2 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-200" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-[#3D4A4D] relative inline-block">
                            Contact Info
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-linear-to-r from-[#FFB703] to-[#A7C957]"></span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <IoLocationOutline className="text-[#FFB703] mt-1 mr-3 shrink-0" size={20} />
                                <span className="text-gray-400">Khulna , Bangladesh</span>
                            </li>
                            <li className="flex items-center">
                                <IoCallOutline className="text-[#FFB703] mr-3 shrink-0" size={20} />
                                <span className="text-gray-400">+880 170809-9988</span>
                            </li>
                            <li className="flex items-center">
                                <IoMailOutline className="text-[#FFB703] mr-3 shrink-0" size={20} />
                                <span className="text-gray-400">lmdifoylzullahi@gmail.com</span>
                            </li>
                        </ul>
                        
                        {/* Newsletter */}
                        <div className="mt-8">
                            <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="grow px-4 py-3 bg-[#1E2729] border border-[#3D4A4D] text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#FFB703] focus:border-[#FFB703]"
                                />
                                <button className="bg-linear-to-r from-[#FFB703] to-[#A7C957] text-white px-4 py-3 rounded-r-lg font-semibold hover:opacity-90 transition-opacity duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 pb-2 border-b border-[#3D4A4D] relative inline-block">
                            Follow Us
                            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-linear-to-r from-[#FFB703] to-[#A7C957]"></span>
                        </h3>
                        <p className="text-gray-400 mb-6">Join our community of food lovers</p>
                        
                        <div className="flex space-x-4 mb-8">
                            {[
                                { 
                                    icon: <FaSquareXTwitter size={24} />, 
                                    href: 'https://x.com/', 
                                    label: 'Twitter',
                                    color: 'hover:bg-black/20 hover:text-white'
                                },
                                { 
                                    icon: <IoLogoYoutube size={24} />, 
                                    href: 'https://www.youtube.com/', 
                                    label: 'YouTube',
                                    color: 'hover:bg-red-500/20 hover:text-red-400'
                                },
                                { 
                                    icon: <FaFacebook size={24} />, 
                                    href: 'https://www.facebook.com/', 
                                    label: 'Facebook',
                                    color: 'hover:bg-blue-600/20 hover:text-blue-400'
                                },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-12 h-12 rounded-xl bg-[#1E2729] border border-[#3D4A4D] flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} group/social relative`}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/social:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                        {social.label}
                                    </span>
                                </a>
                            ))}
                        </div>

                        
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[#3D4A4D]">
                    <div className="  text-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-gray-400 text-sm">
                                Copyright © 2025 - All rights reserved by FoodieApp Ltd
                            </p>
                            <p className="text-gray-500 text-xs mt-1">Made with love for food lovers worldwide</p>
                        </div>
                        
                        
                    </div>
                </div>

                {/* Stats Bar (Hidden on mobile) */}
                <div className="hidden lg:flex items-center justify-center space-x-8 mt-8 pt-6 border-t border-[#3D4A4D]">
                    {[
                        { value: '50K+', label: 'Foodies' },
                        { value: '10K+', label: 'Reviews' },
                        { value: '4.8', label: 'Avg Rating' },
                        { value: '500+', label: 'Restaurants' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl font-bold bg-linear-to-r from-[#FFB703] to-[#A7C957] bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;