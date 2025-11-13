import Aos from 'aos';
import React, { use, useEffect, useState } from 'react';
import { FaBookmark, FaHeart, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';
import 'aos/dist/aos.css';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const ProductCard = ({ d }) => {
    console.log(d);

    const { user } = use(AuthContext)
    const { foodImage, foodName, location, rating, restaurantName, reviewText, _id, reviewerName } = d;

    const [favorite, setFavorite] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    // const [loading, setLoading] = useState(false)
    // console.log(favorite);

    useEffect(() => {
        Aos.init({ duration: 2000 });
        Aos.refresh();
    }, []);

    useEffect(() => {
        if (!user) return
        // if(!loading) return
        fetch('https://foodies-zone-eta.vercel.app/favorites')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setFavorite(data)
                const favoriteExists = data.some(f =>
                    f.favorite_by === user?.email && f.foodId === _id
                )
                setIsFavorite(favoriteExists)
                // setLoading(false)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [_id, user,])

    const handleFavorite = () => {
        if (!user) {
            toast.error('login')
            return
        }

        const existFavoriteItem = favorite.find(f => f.favorite_by === user.email && f.foodId === _id);

        if (!existFavoriteItem) {
            const newFavorite = {
                foodImage, foodName, location, rating, restaurantName, reviewText, reviewerName,
                favorite_by: user.email,
                foodId: _id
            };
            setIsFavorite(true)

            fetch(`https://foodies-zone-eta.vercel.app/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFavorite)
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    setFavorite([...favorite, data])

                    toast.success('Added to favorite')
                }).catch(err => {
                    console.log(err.message);
                })
        }
    }
    return (
        <div  className="rounded-xl bg-[#E8EDE5] shadow-sm shadow-[#8D9776] flex flex-col overflow-hidden">





            <figure>
                <img
                    className="w-full h-52 object-cover "
                    src={foodImage}
                    alt={foodName}
                />
            </figure>


            <div className="flex flex-col flex-1 p-4">
                <div className="flex gap-4 justify-between items-center mb-2">
                    <h2 className="card-title font-semibold text-lg text-[#2B2B2B]">{foodName}</h2>
                    <div className="flex justify-end ">
                        <button
                            onClick={handleFavorite} disabled={isFavorite} 
                            className="relative flex items-center justify-center w-12 h-12 rounded-lg focus:outline-none"
                        >

                            <FaHeart title='Favorite' className={`w-7 h-7 transition-transform duration-200 ${isFavorite
                                ? 'scale-125 text-[#E63946] fill-pink-500'
                                : 'text-gray-300 fill-gray-300'}`} />


                        </button>
                    </div>

                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <span className="text-sm text-[#6B7A72]">{restaurantName}</span>
                        <span className="text-sm text-[#6B7A72]">{location}</span>
                    </div>
                    <div className="border text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1">
                        <span className="mb-[3px] text-[#FFC107]"><FaStar /></span>

                        <span>{rating}</span>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="font-semibold text-[15px] text-[#5E6D63]">{reviewerName}</h2>
                    </div>
                    <p className="text-sm text-[#4B4B4B]">{reviewText}</p>
                </div>

                <div className="mt-auto flex justify-end">
                    <Link
                        to={`/products-details/${_id}`}
                        className="bg-[#52796F] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#355E52] hover:text-[#F1F1F1] transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
