import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaUser, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ d, onFavoriteToggle }) => {
    const { user } = useContext(AuthContext);
    const { foodImage, foodName, reviewerPhoto, location, rating, restaurantName, reviewText, _id, reviewerName } = d;

    // const [deletingId, setDeletingId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentFavoriteId, setCurrentFavoriteId] = useState(null);
    const [favoriteLoading, setFavoriteLoading] = useState(false); // New state for favorite button loading

    // Fetch favorite status for this specific product
    useEffect(() => {
        if (!user) {
            setIsFavorite(false);
            setCurrentFavoriteId(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://foodies-zone-eta.vercel.app/favorites?foodId=${_id}&email=${user.email}`)
            .then(res => res.json())
            .then(data => {
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

        setFavoriteLoading(true); // Start loading animation

        if (isFavorite) {
            if (!currentFavoriteId) {
                toast.error('Cannot find favorite item');
                setFavoriteLoading(false);
                return;
            }

            fetch(`https://foodies-zone-eta.vercel.app/favorites/${currentFavoriteId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0 || data.success) {
                        setIsFavorite(false);
                        setCurrentFavoriteId(null);

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
                    setFavoriteLoading(false);
                });
        } else {
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
                addedAt: new Date().toISOString(),
                reviewerPhoto,
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
                    setIsFavorite(true);
                    setCurrentFavoriteId(data._id || data.insertedId);

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
                    setFavoriteLoading(false);
                });
        }
    };

    // Skeleton loading state
    if (loading) {
        return (
            <div className="group rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden border border-slate-200 dark:border-gray-700 animate-pulse">
                <div className="relative h-48 bg-linear-to-br from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800"></div>
                <div className="p-6 space-y-4">
                    <div className="h-5 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded"></div>
                    <div className="h-4 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-3/4"></div>
                    <div className="h-16 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded"></div>
                    <div className="h-10 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 dark:border-gray-700 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    className="w-full h-full object-cover 
           scale-110 
           group-hover:scale-100 
           transition-transform duration-700 ease-out"
                    src={foodImage}
                    alt={foodName}
                    loading="lazy"
                />

                {/* linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 dark:from-gray-900/60 via-slate-900/10 dark:via-gray-900/20 to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-amber-200 dark:border-amber-600 flex items-center gap-1">
                    <FaStar className="text-amber-500" />
                    <span className="font-bold text-slate-800 dark:text-white">{rating}</span>
                </div>

                {/* Favorite Button with Loading Spinner */}
                <button
                    onClick={handleFavorite}
                    disabled={favoriteLoading}
                    className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 
                        ${isFavorite ? 'bg-red-50/90 dark:bg-red-900/30' : 'bg-white/90 dark:bg-gray-800/90'} 
                        hover:shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300/50 dark:border-gray-600/50`}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {favoriteLoading ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    ) : isFavorite ? (
                        <FaHeart
                            size={20}
                            className="text-red-500 dark:text-red-400"
                        />
                    ) : (
                        <FaRegHeart
                            size={20}
                            className="text-slate-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-300"
                        />
                    )}
                </button>
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Food Name */}
                <h3 className="text-xl font-bold group-hover:text-amber-600 dark:group-hover:text-amber-500 text-slate-900 dark:text-white line-clamp-1 transition-colors duration-300">
                    {foodName}
                </h3>

                {/* Restaurant & Location */}
                <div className="flex items-center gap-2 mt-2 mb-4">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-500 text-sm" />
                    <span className="text-sm text-slate-600 dark:text-gray-300">
                        {restaurantName} • {location}
                    </span>
                </div>

                {/* Review Section */}
                <div className="mb-4">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-900 dark:to-amber-900 flex items-center justify-center ">
                            {
                                reviewerPhoto ? <div className="text-white text-xs" >
                                    <img className='rounded-full object-cover' src={reviewerPhoto} alt="" />
                                </div> : <FaUser className="text-white text-xs" />
                            }

                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-slate-500 dark:text-gray-400">Reviewed by</p>
                            <p className="font-semibold text-slate-900 dark:text-white truncate">{reviewerName}</p>
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="relative">
                        <span className="text-2xl text-amber-400/30 dark:text-amber-500/30 absolute -top-2 -left-1">"</span>
                        <p className="text-slate-700 dark:text-gray-300 text-sm line-clamp-2 italic pl-4">
                            {reviewText}
                        </p>
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/reviews-details/${_id}`}
                    className="group/btn w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:hover:to-amber-950 dark:hover:from-black text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 dark:shadow-gray-900/50 dark:from-amber-950 dark:to-black/50"
                >
                    View Details
                    <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/20 dark:group-hover:border-amber-600/30 rounded-2xl pointer-events-none transition-all duration-500"></div>
        </div>
    );
};

export default ProductCard;