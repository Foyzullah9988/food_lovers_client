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
        <div>
            <div className=" py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="md:text-4xl text-2xl font-bold mb-2 text-[#5E6D63]">Foodie Tips & Guides</h2>
                        <p className="text-gray-600">Enhance your foodie adventures with expert tips and practical guides from our community.</p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
                        {
                            data.map(d => <div key={d.id} className="bg-[#F3EFEA] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col p-3">
                                <img className="w-full h-44 object-cover rounded-xl" src={d.image} alt="Explore Local Markets" />
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-xl font-semibold mb-2 text-[#2B2B2B]">{d.title}</h3>
                                    <p className="text-gray-600 mb-4">{d.description}</p>
                                    <p className="text-gray-600 mb-4">{d.tip}</p>

                                </div>
                                <div className='flex justify-end'>
                                    <a href="https://www.cordonbleu.edu/london/cookery-tips-food-guides/en" className="text-black">Learn More</a>
                                </div>
                            </div>)
                        }
                    </div>
                    






                </div>
            </div>

        </div>
    );
};

export default Guides;