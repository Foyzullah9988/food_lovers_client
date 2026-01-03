import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaUser, FaArrowRight } from 'react-icons/fa6';
import { Link } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt } from 'react-icons/fa';

const ProductCard = ({ d, onFavoriteToggle }) => {
    const { user } = useContext(AuthContext);
    const { foodImage, foodName, location, rating, restaurantName, reviewText, _id, reviewerName } = d;

    const [deletingId, setDeletingId] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
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

        setDeletingId(_id);

        if (isFavorite) {
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
                    setDeletingId(null);
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
                    setDeletingId(null);
                });
        }
    };

    // Skeleton loading state
    if (loading) {
        return (
            <div className="group rounded-2xl bg-white shadow-lg overflow-hidden border border-slate-200 animate-pulse">
                <div className="relative h-48 bg-slate-200"></div>
                <div className="p-6 space-y-4">
                    <div className="h-5 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-16 bg-slate-200 rounded"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="group relative rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-200 hover:-translate-y-1">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={foodImage}
                    alt={foodName}
                    loading="lazy"
                />

                {/* linear Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-slate-900/10 to-transparent"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-amber-200 flex items-center gap-1">
                    <FaStar className="text-amber-500" />
                    <span className="font-bold text-slate-800">{rating}</span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavorite}
                    disabled={deletingId === _id}
                    className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 
                        ${isFavorite ? 'bg-red-50/90' : 'bg-white/90'} 
                        hover:shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-300/50`}
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
                            className="text-slate-500 hover:text-red-500 transition-colors duration-300"
                        />
                    )}
                </button>
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Food Name */}
                <h3 className="text-xl font-bold text-slate-900  line-clamp-1">
                    {foodName}
                </h3>

                

                {/* Review Section */}
                <div className="mb-4">
                    {/* Reviewer Info */}
                    <div className="flex items-center gap-3 mb-3">
                        
                        <div className="flex items-center gap-2 justify-center">
                            <p className="text-xs text-slate-500">Reviewed by</p>
                            <p className="font-semibold text-slate-900 truncate">{reviewerName}</p>
                            
                        </div>
                    </div>
                    
                    {/* Review Text */}
                    <div className="relative">
                        <span className="text-2xl text-amber-400/30 absolute -top-2 -left-1">"</span>
                        <p className="text-slate-700 text-sm line-clamp-2 italic pl-4">
                            {reviewText}
                        </p>
                    </div>
                </div>

                {/* View Details Button */}
                <Link
                    to={`/products-details/${_id}`}
                    className="group/btn w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                    View Details
                    <FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/20 rounded-2xl pointer-events-none transition-all duration-500"></div>
            
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