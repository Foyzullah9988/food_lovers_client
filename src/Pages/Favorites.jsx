import { useContext, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaHeart, FaStar, FaRegHeart, FaUtensils, FaLocationDot, FaClock, FaFire, FaTrash, FaSort, FaFilter, FaChevronLeft, FaChevronRight, FaUser } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';

const Favorites = () => {
    const data = useLoaderData();
    const [favorite, setFavorite] = useState(data);
    const [deletingId, setDeletingId] = useState(null);
    const [sortBy, setSortBy] = useState('recent');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    
    const { user } = useContext(AuthContext);
    
    // Simulate loading for skeleton
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);
    
    const userFav = favorite.filter(dat => dat.favorite_by === user?.email);


    // Filter by category
    const filteredFavorites = selectedCategory === 'all' 
        ? userFav 
        : userFav.filter(item => item.category === selectedCategory);

    // Sort favorites based on selected option
    const sortedFavorites = [...filteredFavorites].sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.addedAt || 0) - new Date(a.addedAt || 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.foodName.localeCompare(b.foodName);
        return 0;
    });

    // Pagination Calculations
    const totalItems = sortedFavorites.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Adjust current page if it's out of bounds
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalItems, currentPage, totalPages]);

    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedFavorites.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination Functions
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        }
    };

    // Generate page numbers for pagination display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            
            if (startPage > 1) {
                if (startPage > 2) {
                    pageNumbers.unshift('...');
                }
                pageNumbers.unshift(1);
            }
            
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

    const handleDeleteForUi = (id) => {
        const remainfavorite = favorite.filter(f => f._id !== id);
        setFavorite(remainfavorite);
    }

    const handleDelete = (id, foodName) => {
        setDeletingId(id);
        
        fetch(`https://foodies-zone-eta.vercel.app/favorites/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    handleDeleteForUi(id);
                    toast.success(`"${foodName}" removed from favorites`, {
                        icon: '🗑️',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                }
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Failed to remove from favorites');
            })
            .finally(() => {
                setDeletingId(null);
            });
    }







    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className='flex flex-col min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800'>
            <Navbar fixed={false} />
            
            <div className='container mx-auto flex-1 px-4 py-8'>
                

                {/* Delete Button Skeleton */}
                <div className='flex justify-end mb-6'>
                    <div className='h-10 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-40'></div>
                </div>

                {/* Favorites Grid Skeleton */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className='group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-gray-700'>
                            {/* Image Skeleton */}
                            <div className='relative h-56 overflow-hidden bg-linear-to-br from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800'>
                                <div className='absolute top-4 right-4 w-12 h-12 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                <div className='absolute top-4 left-4 w-16 h-6 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                <div className='absolute bottom-4 left-4 right-4 flex justify-between'>
                                    <div className='w-16 h-6 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                    <div className='w-20 h-6 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                </div>
                            </div>

                            {/* Content Skeleton */}
                            <div className='p-5 space-y-4'>
                                <div>
                                    <div className='h-6 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-3/4 mb-2'></div>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-4 h-4 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                        <div className='h-4 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-2/3'></div>
                                    </div>
                                </div>

                                {/* Review Preview Skeleton */}
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-8 h-8 bg-slate-300 dark:bg-gray-600 rounded-full'></div>
                                        <div className='space-y-2'>
                                            <div className='h-3 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-24'></div>
                                            <div className='h-3 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-16'></div>
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <div className='h-3 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded'></div>
                                        <div className='h-3 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-5/6'></div>
                                    </div>
                                </div>

                                {/* Button Skeleton */}
                                <div className='h-12 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg'></div>
                            </div>

                            {/* Shimmer Effect */}
                            <div className='absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 dark:via-gray-900/20 to-transparent animate-shimmer'></div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className='flex justify-center items-center gap-2 py-4 animate-pulse'>
                    <div className='h-10 w-10 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg'></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className='h-10 w-10 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg'></div>
                    ))}
                    <div className='h-10 w-10 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg'></div>
                </div>

                {/* CTA Skeleton */}
                <div className='text-center py-8'>
                    <div className='h-6 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded w-48 mx-auto mb-4'></div>
                    <div className='h-14 bg-linear-to-r from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-800 rounded-lg w-64 mx-auto'></div>
                </div>
            </div>

            <Footer />
            
            {/* Shimmer animation CSS */}
            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );

    // Return skeleton if loading
    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className='flex flex-col min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800'>
            <Navbar fixed={false} />

            <div className='container mx-auto flex-1 px-4 py-8'>
                {/* Enhanced Header Section */}
                <div className='mb-8'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8'>
                        <div className='flex-1'>
                            <h1 className='text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4'>
                                My Favorites
                                <span className='block text-amber-600 dark:text-amber-500 text-2xl md:text-3xl font-normal mt-2'>
                                    Your personal food collection
                                </span>
                            </h1>
                            
                        </div>
                        
                        {/* Sort and Filter Options */}
                        {userFav.length > 0 && (
                            <div className='flex flex-col sm:flex-row gap-4 w-full md:w-auto'>
                               
                                
                                <div className='p-4 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700'>
                                    <label className='block text-sm font-medium text-slate-600 dark:text-gray-300 mb-2'>
                                        <FaSort className='inline mr-2' />
                                        Sort By
                                    </label>
                                    <select 
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className='w-full bg-slate-50 dark:bg-gray-700 border border-slate-200 dark:border-gray-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 focus:border-transparent'
                                    >
                                        <option value="recent">Recently Added</option>
                                        <option value="rating">Highest Rated</option>
                                        <option value="name">Name (A-Z)</option>
                                    </select>
                                </div>

                                
                            </div>
                        )}
                    </div>

                    
                </div>

               

                {/* Empty State - Enhanced */}
                {userFav.length === 0 ? (
                    <div className='max-w-2xl mx-auto text-center py-20 px-4'>
                        <div className='relative mb-8'>
                            <div className='relative w-32 h-32 mx-auto'>
                                <div className='absolute inset-0 bg-linear-to-br from-amber-500 to-amber-400 rounded-full opacity-10 animate-pulse'></div>
                                <div className='absolute inset-4 bg-linear-to-br from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg'>
                                    <FaRegHeart className='w-16 h-16 text-white' />
                                </div>
                                <div className='absolute -top-2 -right-2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-slate-200 dark:border-gray-700 animate-bounce'>
                                    <FaUtensils className='w-6 h-6 text-amber-600' />
                                </div>
                            </div>
                        </div>
                        
                        <h2 className='text-3xl font-bold text-slate-900 dark:text-white mb-4'>
                            Your favorites collection is empty
                        </h2>
                        <p className='text-lg text-slate-600 dark:text-gray-300 mb-10 max-w-md mx-auto'>
                            Start building your personal food library! Save dishes you love and they'll appear here for quick access.
                        </p>
                        
                        <div className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                                <div className='p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'>
                                    <div className='w-12 h-12 bg-linear-to-r from-amber-500/20 to-amber-600/20 dark:from-amber-500/30 dark:to-amber-600/30 rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaHeart className='w-6 h-6 text-amber-600' />
                                    </div>
                                    <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>Click the heart</h4>
                                    <p className='text-sm text-slate-600 dark:text-gray-400'>On any product page</p>
                                </div>
                                <div className='p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'>
                                    <div className='w-12 h-12 bg-linear-to-r from-amber-500/20 to-amber-600/20 dark:from-amber-500/30 dark:to-amber-600/30 rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaStar className='w-6 h-6 text-amber-500' />
                                    </div>
                                    <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>Rate & Save</h4>
                                    <p className='text-sm text-slate-600 dark:text-gray-400'>Your reviewed items</p>
                                </div>
                                <div className='p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-slate-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300'>
                                    <div className='w-12 h-12 bg-linear-to-r from-amber-500/20 to-amber-600/20 dark:from-amber-500/30 dark:to-amber-600/30 rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaClock className='w-6 h-6 text-amber-600' />
                                    </div>
                                    <h4 className='font-semibold text-slate-900 dark:text-white mb-1'>Quick Access</h4>
                                    <p className='text-sm text-slate-600 dark:text-gray-400'>Find them here later</p>
                                </div>
                            </div>
                            
                            <Link 
                                to={'/reviews'} 
                                className='group inline-flex items-center justify-center gap-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-10 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-lg shadow-lg hover:shadow-amber-500/25'
                            >
                                <FaUtensils className='group-hover:rotate-12 transition-transform duration-300' />
                                Start Exploring Foods
                                <span className='group-hover:translate-x-2 transition-transform duration-300'>→</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Active Filters Info */}
                        <div className='mb-6 p-4 bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-xl border border-amber-200 dark:border-amber-800'>
                            <div className='flex flex-wrap items-center justify-between gap-4'>
                                <div className='flex flex-wrap items-center gap-4'>
                                    <span className='font-medium text-amber-800 dark:text-amber-300'>
                                        Showing {currentItems.length} of {totalItems} items
                                        {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
                                    </span>
                                   
                                    <span className='px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm'>
                                        Sorted by: {sortBy === 'recent' ? 'Recently Added' : sortBy === 'rating' ? 'Highest Rated' : 'Name'}
                                    </span>
                                </div>
                                <div className='text-sm text-amber-700 dark:text-amber-300 font-medium'>
                                    Showing items {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, totalItems)}
                                </div>
                            </div>
                        </div>

                        {/* Favorites Grid - Enhanced */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8'>
                            {currentItems.map((d) => (
                                <div 
                                    key={d._id} 
                                    className='group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-gray-700'
                                >
                                    {/* Image Section with linear Overlay */}
                                    <div className='relative h-56 overflow-hidden'>
                                        <img
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                            src={d.foodImage}
                                            alt={d.foodName}
                                            loading='lazy'
                                        />
                                        <div className='absolute inset-0 bg-linear-to-t from-slate-900/60 via-slate-900/20 to-transparent'></div>
                                        
                                        {/* Top Actions */}
                                        <div className='absolute top-4 right-4 flex flex-col gap-2'>
                                            <button
                                                onClick={() => handleDelete(d._id, d.foodName)}
                                                disabled={deletingId === d._id}
                                                className={`relative p-3 rounded-full backdrop-blur-md transition-all duration-200   ${
                                                    deletingId === d._id 
                                                        ? 'bg-red-500/50 cursor-not-allowed' 
                                                        : 'bg-red-50/90 dark:bg-red-900/30  hover:scale-110 active:scale-95'
                                                }`}
                                                title='Remove from favorites'
                                            >
                                                {deletingId === d._id ? (
                                                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                                ) : (
                                                    <FaHeart className='w-5 h-5 text-red-500 dark:text-red-400 ' />
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Added Date Badge */}
                                        {d.addedAt && (
                                            <div className='absolute top-4 left-4 backdrop-blur-sm bg-black/40 px-3 py-1.5 rounded-full'>
                                                <span className='text-white text-xs font-medium'>
                                                    {new Date(d.addedAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        
                                        {/* Bottom Info */}
                                        <div className='absolute bottom-4 left-4 right-4'>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-2 backdrop-blur-sm bg-white/20 px-3 py-1.5 rounded-full'>
                                                    <FaStar className='w-4 h-4 text-amber-500' />
                                                    <span className='font-bold text-white'>{d.rating}</span>
                                                </div>
                                                {d.category && (
                                                    <span className='backdrop-blur-sm bg-white/20 px-3 py-1.5 rounded-full text-white text-sm font-medium'>
                                                        {d.category}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className='p-5'>
                                        <div className='mb-4'>
                                            <h3 className='font-bold text-xl text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors'>
                                                {d.foodName}
                                            </h3>
                                            
                                            {/* Location and Restaurant in one line */}
                                            <div className='flex items-center justify-between gap-2 mb-4'>
                                                <div className='flex items-center gap-2 text-slate-600 dark:text-gray-400 text-sm flex-1 min-w-0'>
                                                    <FaLocationDot className='w-3 h-3 flex-shrink-0' />
                                                    <span className='font-medium truncate'>{d.restaurantName}</span>
                                                    <span className='text-slate-300 dark:text-gray-600 flex-shrink-0'>•</span>
                                                    <span className='truncate'>{d.location}</span>
                                                </div>
                                                
                                                {d.price && (
                                                    <div className='text-lg font-bold text-amber-600 dark:text-amber-500 whitespace-nowrap ml-4'>
                                                        ${parseFloat(d.price).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Review Preview - Enhanced */}
                                        {d.reviewText && (
                                            <div className='mb-5 p-4 bg-linear-to-r from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border border-slate-200 dark:border-gray-600'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <div className='w-8 h-8 bg-linear-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-xs text-white font-bold'>
                                                        {
                                d?.reviewerPhoto ? <div className="text-white text-xs" >
                                    <img className='rounded-full object-cover' src={d.reviewerPhoto} alt="" />
                                </div> : <FaUser className="text-white text-xs" />
                            }
                                                    </div>
                                                    <div>
                                                        <span className='font-semibold text-slate-900 dark:text-white text-sm'>
                                                            {d.reviewerName || 'Anonymous'}
                                                        </span>
                                                        <div className='flex items-center gap-1'>
                                                            {[...Array(5)].map((_, i) => (
                                                                <FaStar 
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < Math.floor(d.rating) ? 'text-amber-500' : 'text-slate-300 dark:text-gray-600'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='text-sm text-slate-600 dark:text-gray-300 line-clamp-2 italic'>
                                                    "{d.reviewText}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Button */}
                                        <div className='pt-4 border-t border-slate-200 dark:border-gray-700'>
                                            <Link
                                                to={`/reviews-details/${d.foodId}`}
                                                className='group/link flex items-center justify-center gap-2 w-full bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg hover:shadow-lg shadow-sm hover:shadow-amber-500/25 text-center py-3 px-4 font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 dark:from-amber-950 dark:to-black/50'
                                            >
                                                View Details
                                                <span className='group-hover/link:translate-x-1 transition-transform duration-300'>
                                                    →
                                                </span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className='absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 rounded-2xl pointer-events-none transition-all duration-300'></div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Component */}
                        {totalPages > 1 && (
                            <div className='flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-slate-200 dark:border-gray-700'>
                                {/* Items per page info */}
                                <div className='text-sm text-slate-600 dark:text-gray-400'>
                                    <span className='font-medium'>{totalItems} items</span>
                                    <span className='mx-2'>•</span>
                                    <span>Page {currentPage} of {totalPages}</span>
                                </div>

                                {/* Pagination Controls */}
                                <div className='flex items-center gap-2'>
                                    {/* Previous Button */}
                                    <button
                                        onClick={goToPrevPage}
                                        disabled={currentPage === 1}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                                            currentPage === 1
                                                ? 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'
                                                : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-500 hover:shadow-md border border-slate-200 dark:border-gray-700'
                                        }`}
                                        title='Previous page'
                                    >
                                        <FaChevronLeft className='w-4 h-4' />
                                    </button>

                                    {/* Page Numbers */}
                                    <div className='flex items-center gap-1'>
                                        {getPageNumbers().map((pageNum, index) => (
                                            pageNum === '...' ? (
                                                <span 
                                                    key={`ellipsis-${index}`} 
                                                    className="px-2 text-slate-400 dark:text-gray-500"
                                                >
                                                    ...
                                                </span>
                                            ) : (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => goToPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                                                        currentPage === pageNum
                                                            ? 'bg-linear-to-r from-amber-600 to-amber-700 text-white shadow-lg scale-105'
                                                            : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-500 border border-slate-200 dark:border-gray-700'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            )
                                        ))}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                                            currentPage === totalPages
                                                ? 'bg-slate-100 dark:bg-gray-700 text-slate-400 dark:text-gray-500 cursor-not-allowed'
                                                : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-500 hover:shadow-md border border-slate-200 dark:border-gray-700'
                                        }`}
                                        title='Next page'
                                    >
                                        <FaChevronRight className='w-4 h-4' />
                                    </button>
                                </div>

                                {/* Jump to page */}
                                <div className='flex items-center gap-2'>
                                    <span className='text-sm text-slate-600 dark:text-gray-400'>Go to:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max={totalPages}
                                        value={currentPage}
                                        onChange={(e) => {
                                            const page = Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1));
                                            goToPage(page);
                                        }}
                                        className='w-16 px-3 py-2 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg text-center text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 focus:border-transparent'
                                    />
                                    <span className='text-sm text-slate-600 dark:text-gray-400'>/ {totalPages}</span>
                                </div>
                            </div>
                        )}

                        {/* Add More CTA */}
                        <div className='text-center py-8'>
                            <p className='text-slate-600 dark:text-gray-300 mb-4'>Want to add more favorites?</p>
                            <Link 
                                to={'/reviews'} 
                                className='group inline-flex items-center gap-3 bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg shadow-lg hover:shadow-xl hover:shadow-amber-500/25 text-center py-4 px-8 font-semibold text-lg hover:scale-105 transition-all duration-300 dark:from-amber-950 dark:to-black/50'
                            >
                                <FaHeart className='text-white group-hover:animate-pulse ' />
                                Browse More Foods
                                <span className='group-hover:translate-x-2 transition-transform duration-300'>→</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Favorites;