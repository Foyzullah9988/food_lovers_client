import Aos from 'aos';
import React, { use, useEffect, useState } from 'react';
import { FaBookmark, FaHeart, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';
import 'aos/dist/aos.css';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const ProductCard = ({ d }) => {
    // console.log(d);
    const { user } = use(AuthContext)
    const { foodImage, foodName, location, rating, restaurantName, reviewText, _id, reviewerName } = d;
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        Aos.init({ duration: 2000 });
        Aos.refresh();
    }, []);

    const handleFavorite = () => {
        fetch(`http://localhost:3000/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...d, favorite_by: user.email })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Added to favorite')
            }).catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div data-aos="fade-up" className="rounded-xl bg-[#99ae99] shadow-sm flex flex-col overflow-hidden">





            <figure>
                <img
                    className="w-full h-52 object-cover "
                    src={foodImage}
                    alt={foodName}
                />
            </figure>


            <div className="flex flex-col flex-1 p-4">
                <div className="flex gap-4 justify-between items-center mb-2">
                    <h2 className="card-title font-semibold text-lg">{foodName}</h2>
                    <div className="flex justify-end ">
                        <button
                            onClick={() => { handleFavorite(), setLiked(!liked) }}
                            className="relative flex items-center justify-center w-12 h-12 rounded-lg focus:outline-none"
                        >
                            <svg
                                className={`w-7 h-7 transition-transform duration-200 ${liked ? 'scale-125 text-[#e72e91] fill-pink-500' : 'text-white fill-white'}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 17.503 15.625"
                            >
                                <FaHeart title='Favorite' />
                            </svg>

                        </button>
                    </div>

                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className="text-sm">{restaurantName}</span>
                        <span className="text-sm">{location}</span>
                    </div>
                    <div className="border text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1">
                        <span className="mb-[3px] text-[#FFC107]"><FaStar /></span>

                        <span>{rating}</span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="font-semibold text-[15px]">{reviewerName}</h2>
                    </div>
                    <p className="text-sm">{reviewText}</p>
                </div>

                <div className="mt-auto flex justify-end">
                    <Link
                        to={`/products-details/${_id}`}
                        className="bg-[#63A361] text-white px-4 py-2 rounded-md hover:bg-[#ff9d00] transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
