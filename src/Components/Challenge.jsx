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
                <h2 className='text-4xl font-bold mb-4 text-[#5E6D63]'>Foodie Challenges</h2>
            </div>
            <div className='grid  xl:grid-cols-3 gap-4  justify-center '>
                {
                    data.map((d, index) => <div data-aos="flip-up" className='bg-[#F3EFEA]  p-3 rounded-xl space-y-3 flex flex-col' key={index}>
                        <h2 className='text-xl font-semibold text-[#2B2B2B]'>{d.title}</h2>
                        <p className='text-[#6B7A72] flex-1 '>{d.description}</p>
                        <div className='flex  justify-between'>
                            <span className='border border-white rounded-xl p-1 font-semibold text-[#6B7A72]'>Target : <span className='text-red-600 '>{d.target}</span></span>
                            <span className='text-green-600 border border-green-600 rounded-xl p-1 font-semibold'>{d.reward}</span>
                        </div>
                        <div className='flex  justify-center items-center'>
                            <Link to={'/products'} className='bg-[#e2c6a3] text-[#2F3E46] px-4 py-2 rounded-md hover:bg-[#E6BB50] transition-colors'>Take Challenge</Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Challenge;