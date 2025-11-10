import React from 'react';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';

const ProductCard = ({ d }) => {
    const { date, description, email, foodImage, foodName, location, rating, restaurantName, reviewText, reviewerName
    } = d;

    const dateObj = new Date(date)
    const year = dateObj.toLocaleDateString()
    const time = dateObj.toLocaleTimeString()
    console.log(year, time);

    return (
        <div className="rounded-xl bg-[#A7C1A8]  shadow-sm flex flex-col">
            <figure>
                <img className='w-full h-52 object-cover rounded-xl'
                    src={foodImage}
                    alt="Food" />
            </figure>
            <div className="card-body flex flex-col flex-1">
                <h2 className="card-title">{foodName}</h2>
                <div className='flex  justify-between items-center'>
                    <div className='border  text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1'>
                        <span className='mb-[3px] text-[#FFC107]'><FaStar /></span>
                        <span>{rating}</span>
                    </div>
                    <div>
                        <p>{year}</p>
                    </div>
                </div>

                <div>
                    <div className='flex  justify-between items-center mb-1'>
                        <h2 className='font-semibold text-[15px] '>{reviewerName}</h2>
                        <span>{time}</span>
                    </div>
                    <p>{reviewText}</p>
                </div>
                <div className="card-actions justify-end mt-auto">
                    <Link to={'/products/details'} className="btn btn-primary ">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;