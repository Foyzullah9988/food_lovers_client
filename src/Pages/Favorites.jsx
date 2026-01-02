import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useLoaderData } from 'react-router';
import { FaHeart, FaStar, FaRegHeart, FaArrowLeft, FaUtensils, FaLocationDot, FaClock, FaFire } from 'react-icons/fa6';
import { FaRegStar, FaRegClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { use, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Favorites = () => {
    const data = useLoaderData();
    const [favorite, setFavorite] = useState(data);
    const [deletingId, setDeletingId] = useState(null);
    const [sortBy, setSortBy] = useState('recent');
    
    const { user } = use(AuthContext);
    const userFav = favorite.filter(dat => dat.favorite_by === user.email);

    // Sort favorites based on selected option
    const sortedFavorites = [...userFav].sort((a, b) => {
        if (sortBy === 'recent') return new Date(b.added_date || 0) - new Date(a.added_date || 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.foodName.localeCompare(b.foodName);
        return 0;
    });

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
                    toast.success(`"${foodName}" removed from favorites`);
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

    // Get popular categories from favorites
    const getPopularCategories = () => {
        const categories = {};
        userFav.forEach(item => {
            if (item.category) {
                categories[item.category] = (categories[item.category] || 0) + 1;
            }
        });
        return Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    };

    const popularCategories = getPopularCategories();

    return (
        <div className='flex flex-col min-h-screen bg-linear-to-b from-[#F8F9F7] to-[#E8EDE5]'>
            <Navbar fixed={false} />

            <div className='container mx-auto flex-1 px-4 py-8'>
                {/* Enhanced Header Section */}
                <div className='mb-8'>
                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8'>
                        <div className='flex-1'>
                           
                            <h1 className='text-4xl md:text-5xl font-bold text-[#2B2B2B] mb-4'>
                                My Favorites
                                <span className='block text-[#52796F] text-2xl md:text-3xl font-normal mt-2'>
                                    Your personal food collection
                                </span>
                            </h1>
                            <div className='flex flex-wrap items-center gap-4 text-[#5E6D63]'>
                                <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm'>
                                    <div className='w-2 h-2 bg-[#E63946] rounded-full'></div>
                                    <span className='font-semibold'>{userFav.length} items</span>
                                </div>
                                
                                {popularCategories.length > 0 && (
                                    <div className='flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm'>
                                        <FaFire className='text-[#FF6B35]' />
                                        <span>Top: {popularCategories[0][0]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Sort Options */}
                        {userFav.length > 0 && (
                            <div className='bg-white p-4 rounded-xl shadow-sm border border-[#E8EDE5] w-full md:w-auto'>
                                <label className='block text-sm font-medium text-[#6B7A72] mb-2'>
                                    Sort by
                                </label>
                                <select 
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className='w-full md:w-48 bg-[#F8F9F7] border border-[#E8EDE5] rounded-lg px-3 py-2 text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:border-transparent'
                                >
                                    <option value="recent">Recently Added</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="name">Name (A-Z)</option>
                                </select>
                            </div>
                        )}
                    </div>

                   
                </div>

                {/* Empty State - Enhanced */}
                {userFav.length === 0 ? (
                    <div className='max-w-2xl mx-auto text-center py-20 px-4'>
                        <div className='relative mb-8'>
                            <div className='relative w-32 h-32 mx-auto'>
                                <div className='absolute inset-0 bg-linear-to-br from-[#52796F] to-[#355E52] rounded-full opacity-10'></div>
                                <div className='absolute inset-4 bg-linear-to-br from-[#52796F] to-[#355E52] rounded-full flex items-center justify-center'>
                                    <FaRegHeart className='w-16 h-16 text-white' />
                                </div>
                                <div className='absolute -top-2 -right-2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-[#E8EDE5]'>
                                    <FaUtensils className='w-6 h-6 text-[#52796F]' />
                                </div>
                            </div>
                        </div>
                        
                        <h2 className='text-3xl font-bold text-[#2B2B2B] mb-4'>
                            Your favorites collection is empty
                        </h2>
                        <p className='text-lg text-[#6B7A72] mb-10 max-w-md mx-auto'>
                            Start building your personal food library! Save dishes you love and they'll appear here for quick access.
                        </p>
                        
                        <div className='space-y-6'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                                <div className='p-4 bg-white rounded-xl shadow-sm border border-[#E8EDE5]'>
                                    <div className='w-12 h-12 bg-[#F8F9F7] rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaHeart className='w-6 h-6 text-[#E63946]' />
                                    </div>
                                    <h4 className='font-semibold text-[#2B2B2B] mb-1'>Click the heart</h4>
                                    <p className='text-sm text-[#6B7A72]'>On any product page</p>
                                </div>
                                <div className='p-4 bg-white rounded-xl shadow-sm border border-[#E8EDE5]'>
                                    <div className='w-12 h-12 bg-[#F8F9F7] rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaStar className='w-6 h-6 text-[#FFC107]' />
                                    </div>
                                    <h4 className='font-semibold text-[#2B2B2B] mb-1'>Rate & Save</h4>
                                    <p className='text-sm text-[#6B7A72]'>Your reviewed items</p>
                                </div>
                                <div className='p-4 bg-white rounded-xl shadow-sm border border-[#E8EDE5]'>
                                    <div className='w-12 h-12 bg-[#F8F9F7] rounded-lg flex items-center justify-center mb-3 mx-auto'>
                                        <FaClock className='w-6 h-6 text-[#52796F]' />
                                    </div>
                                    <h4 className='font-semibold text-[#2B2B2B] mb-1'>Quick Access</h4>
                                    <p className='text-sm text-[#6B7A72]'>Find them here later</p>
                                </div>
                            </div>
                            
                            <Link 
                                to={'/products'} 
                                className='inline-flex items-center justify-center gap-3 bg-linear-to-r from-[#52796F] to-[#355E52] text-white px-10 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 font-semibold text-lg group'
                            >
                                <FaUtensils className='group-hover:rotate-12 transition-transform' />
                                Start Exploring Foods
                                <span className='group-hover:translate-x-2 transition-transform'>→</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Favorites Grid - Enhanced */}
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12 bg-base-300 p-6 rounded-2xl'>
                            {sortedFavorites.map((d) => (
                                <div 
                                    key={d._id} 
                                    className='group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#E8EDE5]'
                                >
                                    {/* Image Section with linear Overlay */}
                                    <div className='relative h-56 overflow-hidden'>
                                        <img
                                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                                            src={d.foodImage}
                                            alt={d.foodName}
                                        />
                                        <div className='absolute inset-0 bg-linear-to-t from-black/30 to-transparent'></div>
                                        
                                        {/* Top Actions */}
                                        <div className='absolute top-4 right-4 flex flex-col gap-2'>
                                            <button
                                                onClick={() => handleDelete(d._id, d.foodName)}
                                                disabled={deletingId === d._id}
                                                className={`relative p-3 rounded-full backdrop-blur-md bg-white/20 hover:bg-white/30 transition-all duration-200 ${
                                                    deletingId === d._id ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                title='Remove from favorites'
                                            >
                                                {deletingId === d._id ? (
                                                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                                ) : (
                                                    <FaHeart className='w-5 h-5 text-red-500 animate-heartbeat' />
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Bottom Info */}
                                        <div className='absolute bottom-4 left-4 right-4'>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-2 backdrop-blur-sm bg-white/20 px-3 py-1.5 rounded-full'>
                                                    <FaStar className='w-4 h-4 text-[#FFD700]' />
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
                                            <h3 className='font-bold text-xl text-[#2B2B2B] mb-2 line-clamp-1 group-hover:text-[#52796F] transition-colors'>
                                                {d.foodName}
                                            </h3>
                                            <div className='flex items-center gap-2 text-[#6B7A72] text-sm mb-3'>
                                                <FaLocationDot className='w-3 h-3' />
                                                <span className='font-medium'>{d.restaurantName}</span>
                                                <span className='text-[#E8EDE5]'>•</span>
                                                <span>{d.location}</span>
                                            </div>
                                        </div>

                                        {/* Review Preview - Enhanced */}
                                        {d.reviewText && (
                                            <div className='mb-5 p-4 bg-linear-to-br from-[#F8F9F7] to-[#E8EDE5] rounded-xl border border-[#E8EDE5] group/review'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <div className='w-8 h-8 bg-linear-to-br from-[#52796F] to-[#355E52] rounded-full flex items-center justify-center text-xs text-white font-bold'>
                                                        {d.reviewerName?.charAt(0) || 'U'}
                                                    </div>
                                                    <div>
                                                        <span className='font-semibold text-[#2B2B2B] text-sm'>
                                                            {d.reviewerName || 'Anonymous'}
                                                        </span>
                                                        <div className='flex items-center gap-1'>
                                                            {[...Array(5)].map((_, i) => (
                                                                <FaStar 
                                                                    key={i}
                                                                    className={`w-3 h-3 ${i < Math.floor(d.rating) ? 'text-[#FFC107]' : 'text-[#E8EDE5]'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='text-sm text-[#5E6D63] line-clamp-2 italic'>
                                                    "{d.reviewText}"
                                                </p>
                                            </div>
                                        )}

                                        {/* Price & Actions */}
                                        <div className='flex items-center justify-between pt-4 border-t border-[#E8EDE5]'>
                                            {d.price && (
                                                <div className='text-lg font-bold text-[#52796F]'>
                                                    ${parseFloat(d.price).toFixed(2)}
                                                </div>
                                            )}
                                            <Link
                                                to={`/products-details/${d.foodId}`}
                                                className='block w-full bg-linear-to-r from-[#426733] to-[#4e7a3d] text-white rounded-lg hover:from-green-800 hover:to-emerald-800 shadow-sm hover:shadow text-center py-3 px-4 font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0'
                                            >
                                                View Details
                                                <span className='group-hover/link:translate-x-1 transition-transform'>
                                                    →
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        

                        {/* Add More CTA */}
                        <div className='text-center py-8'>
                            <p className='text-[#6B7A72] mb-4'>Want to add more favorites?</p>
                            <Link 
                                to={'/products'} 
                                className='group inline-flex items-center gap-3 bg-linear-to-r from-[#426733] text-white  rounded-lg  hover:bg-[#2f4a24]  shadow-sm hover:shadow-lg to-[#4e7a3d]   text-center py-4 px-8  font-semibold  text-lg hover:shadow-emerald-200 hover:scale-105 transition-all duration-300 hover:from-green-800 hover:to-emerald-800 '
                            >
                                <FaHeart className='text-[#E63946]' />
                                Browse More Reviews
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