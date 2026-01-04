import React, { useEffect, useState } from 'react';
import Book from './Book';

const Guides = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/Guides.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="py-8 md:py-10 lg:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className="dark:text-white text-2xl sm:text-3xl  md:text-4xl font-bold text-slate-900  mb-3 md:mb-4">
                            Foodie <span className='text-[#5E6D63] dark:text-amber-500'>Tips & Guides</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                            Enhance your foodie adventures with expert tips and practical guides from our community.
                        </p>
                    </div>

                    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {
                            data.map(d => (
                                <div 
                                    key={d.id} 
                                    className="bg-[#F3EFEA] dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl dark:hover:shadow-gray-900/50 overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col p-4 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="relative h-48 overflow-hidden rounded-lg">
                                        <img 
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700" 
                                            src={d.image} 
                                            alt={d.title} 
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-xl font-semibold mb-3 text-[#2B2B2B] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                            {d.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm md:text-base flex-1">
                                            {d.description}
                                        </p>
                                        <div className="bg-amber-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
                                            <p className="text-amber-700 dark:text-amber-400 text-sm italic">
                                                💡 {d.tip}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex justify-end border-t border-gray-200 dark:border-gray-700 pt-3'>
                                        <a 
                                            href="https://www.cordonbleu.edu/london/cookery-tips-food-guides/en" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-black dark:text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium text-sm md:text-base flex items-center gap-2 group/link transition-colors duration-300"
                                        >
                                            Learn More
                                            <svg 
                                                className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                    {/* Additional CTA Section */}
                    {/* <div className="mt-12 md:mt-16 text-center">
                        <div className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 md:p-8 border border-amber-200 dark:border-gray-700">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                Want to Contribute Your Own Guide?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
                                Share your food expertise with our community and help fellow food lovers discover amazing culinary experiences.
                            </p>
                            <button className="bg-linear-to-r from-amber-600 to-amber-700 dark:from-amber-700 dark:to-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                Submit Your Guide
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Guides;