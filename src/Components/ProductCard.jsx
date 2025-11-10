import Aos from 'aos';
import React, { useEffect } from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';
import 'aos/dist/aos.css';

const ProductCard = ({ d }) => {
    const {  foodImage, foodName, location, rating, restaurantName, reviewText,_id, reviewerName
    } = d;
    console.log(_id);

    

    useEffect(() => {
        Aos.init({ duration: 2000 })
        Aos.refresh();
    }, [])

    return (
        <div data-aos="fade-up" className="rounded-xl  bg-[#99ae99]  shadow-sm flex flex-col">
            <figure>
                <img className='w-full h-52 object-cover rounded-xl'
                    src={foodImage}
                    alt="Food" />
            </figure>
            <div className="card-body flex flex-col flex-1">
                <div className='flex gap-4 items-center'>
                    <h2 className="card-title">{foodName}</h2>
                <div className='border  text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1'>
                        <span className='mb-[3px] text-[#FFC107]'><FaStar /></span>
                        <span>{rating}</span>
                    </div>
                </div>
                <span>{restaurantName}</span>
                <span>{location}</span>
                <div className='flex  justify-between items-center'>
                    
                    
                </div>

                <div>
                    <div className='flex  justify-between items-center mb-1'>
                        <h2 className='font-semibold text-[15px] '>{reviewerName}</h2>
                        
                    </div>
                    <p>{reviewText}</p>
                </div>
                <div className="card-actions justify-end mt-auto">
                    <Link to={`/products-details/${_id}`} className="bg-[#63A361] text-white px-4 py-2 rounded-md hover:bg-[#ff9d00] transition-colors">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;