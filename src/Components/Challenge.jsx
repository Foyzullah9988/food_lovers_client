import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Challenge = () => {
    const [data, setData] = useState([])


    useEffect(() => {
        fetch('/challenge.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => {
                console.log(err.message);
            })
    }, [])


    return (
        <div className='mt-9 w-full mx-auto  '>
            <div className='text-center'>
                <h2 className='text-4xl font-bold mb-4 text-[#426733]'>Foodie Challenges</h2>
            </div>
            <div className='grid  xl:grid-cols-3 gap-4  justify-between '>
                {
                    data.map((d, index) => <div data-aos="flip-up" className='bg-[#c0a8a8]  p-3 rounded-xl space-y-3 flex flex-col' key={index}>
                        <h2 className='text-xl font-semibold text-white'>{d.title}</h2>
                        <p className='text-white'>{d.description}</p>
                        <div className='flex  flex-1 justify-between'>
                            <span className='border border-white rounded-xl p-1 font-semibold text-white'>Target : <span className='text-red-600 '>{d.target}</span></span>
                            <span className='text-green-600 border border-green-600 rounded-xl p-1 font-semibold'>{d.reward}</span>
                        </div>
                        <div className='flex  justify-center items-center'>
                            <Link to={'/products'} className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-[#ff9d00] transition-colors'>Take Challenge</Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Challenge;