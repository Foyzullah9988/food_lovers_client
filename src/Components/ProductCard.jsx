import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import 'aos/dist/aos.css';

const ProductCard = ({ d, onFavoriteToggle }) => {
    const { user } = useContext(AuthContext);
    const { foodImage, foodName, location, rating, restaurantName, reviewText, _id, reviewerName } = d;

    const [deletingId, setDeletingId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true); // Start with true to prevent flash
    const [currentFavoriteId, setCurrentFavoriteId] = useState(null);

    // Fetch favorite status for this specific product
    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            setCurrentFavoriteId(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        // Fetch specifically for this product and user
        fetch(`https://foodies-zone-eta.vercel.app/favorites?foodId=${_id}&email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                // If data is an array, find the item
                if (Array.isArray(data)) {
                    const favoriteItem = data.find(f => f.foodId === _id && f.favorite_by === user.email);
                    if (favoriteItem) {
                        setIsFavorite(true);
                        setCurrentFavoriteId(favoriteItem._id);
                    } else {
                        setIsFavorite(false);
                        setCurrentFavoriteId(null);
                    }
                } 
                // If data is a single object
                else if (data && data._id) {
                    setIsFavorite(true);
                    setCurrentFavoriteId(data._id);
                } 
                else {
                    setIsFavorite(false);
                    setCurrentFavoriteId(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log('Error fetching favorites:', err.message);
                setIsFavorite(false);
                setCurrentFavoriteId(null);
                setLoading(false);
            });
    }, [_id, user]);

    const handleFavorite = () => {
        if (!user) {
            toast.error('Please login to add favorites');
            return;
        }

        setDeletingId(_id);

        if (isFavorite) {
            // Remove from favorites
            if (!currentFavoriteId) {
                toast.error('Cannot find favorite item');
                setDeletingId(null);
                return;
            }

            fetch(`https://foodies-zone-eta.vercel.app/favorites/${currentFavoriteId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0 || data.success) {
                        // Toggle state immediately
                        setIsFavorite(false);
                        setCurrentFavoriteId(null);
                        
                        // Call parent callback if provided
                        if (onFavoriteToggle) {
                            onFavoriteToggle(_id, false);
                        }
                        
                        toast.success('Removed from favorites');
                    } else {
                        toast.error('Failed to remove from favorites');
                    }
                })
                .catch(err => {
                    console.log(err.message);
                    toast.error('Failed to remove from favorites');
                })
                .finally(() => {
                    setDeletingId(null);
                });
        } else {
            // Add to favorites
            const newFavorite = {
                foodImage,
                foodName,
                location,
                rating,
                restaurantName,
                reviewText,
                reviewerName,
                favorite_by: user.email,
                foodId: _id,
                addedAt: new Date().toISOString()
            };

            fetch('https://foodies-zone-eta.vercel.app/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFavorite)
            })
                .then(res => res.json())
                .then(data => {
                    // Update state immediately with the new favorite data
                    setIsFavorite(true);
                    setCurrentFavoriteId(data._id || data.insertedId);
                    
                    // Call parent callback if provided
                    if (onFavoriteToggle) {
                        onFavoriteToggle(_id, true, data);
                    }
                    
                    toast.success('Added to favorites');
                })
                .catch(err => {
                    console.log(err.message);
                    toast.error('Failed to add to favorites');
                })
                .finally(() => {
                    setDeletingId(null);
                });
        }
    };

    // If loading, show skeleton
    if (loading) {
        return (
            <div className="group rounded-2xl bg-linear-to-br from-white to-gray-50 shadow-lg overflow-hidden border border-gray-100 animate-pulse">
                <div className="relative overflow-hidden h-40 bg-gray-200"></div>
                <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="group rounded-2xl bg-linear-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
            {/* Image Container */}
            <div className="relative overflow-hidden h-40">
                <img
                    className="w-full h-full object-cover scale-110 transition-transform duration-500 ease-in-out group-hover:scale-100"
                    src={foodImage}
                    alt={foodName}
                    loading="lazy"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="font-bold text-gray-800">{rating}</span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    disabled={deletingId === _id}
                    className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-sm transition-all duration-300 
                        ${isFavorite ? 'bg-red-50/80' : 'bg-white/80'} 
                        hover:shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {deletingId === _id ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : isFavorite ? (
                        <FaHeart 
                            size={20} 
                            className="text-red-500 animate-heartbeat"
                        />
                    ) : (
                        <FaRegHeart 
                            size={20} 
                            className="text-gray-400 hover:text-red-400 transition-colors duration-300"
                        />
                    )}
                </button>
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Food Name & Restaurant */}
                <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {foodName}
                    </h3>
                    {restaurantName && (
                        <p className="text-sm text-gray-600 mt-1">at {restaurantName}</p>
                    )}
                </div>

                {/* Review Section */}
                <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className='flex items-center gap-2'>
                            <p className="text-sm text-gray-500">Reviewed by</p>
                            <h4 className="font-semibold text-gray-900">{reviewerName}</h4>
                        </div>
                    </div>
                    <p className="text-gray-700 line-clamp-2 italic">
                        "{reviewText}"
                    </p>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/products-details/${_id}`}
                    className="block w-full bg-linear-to-r from-[#426733] to-[#4e7a3d] text-white rounded-lg hover:from-green-800 hover:to-emerald-800 shadow-sm hover:shadow text-center py-3 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    View Details
                    <svg className="inline-block ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
            
            {/* Add CSS for heartbeat animation */}
            <style jsx>{`
                @keyframes heartbeat {
                    0% { transform: scale(1); }
                    25% { transform: scale(1.2); }
                    50% { transform: scale(1); }
                    75% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-heartbeat {
                    animation: heartbeat 0.5s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default ProductCard;