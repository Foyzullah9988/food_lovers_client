import React from 'react';
import { CiStar } from 'react-icons/ci';

const ProductCard = ({ d }) => {
    const { date, description, email, foodImage, foodName, location, rating, restaurantName, reviewText, reviewerName
    } = d
    return (
        <div className="rounded-xl bg-[#A7C1A8]  shadow-sm">
            <figure>
                <img className='w-full h-52 object-cover rounded-xl'
                    src={foodImage}
                    alt="Food" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{foodName}</h2>
                <div className='border text-[#FFC107] w-12 p-1 rounded-full flex'>
                    <span className='bg-[#FFC107'><CiStar /></span>
                    <span>{rating}</span>
                </div>

                <div>
                    <h2>{reviewerName}</h2>
                    <p>{reviewText}</p>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;