import { useEffect, useState, useContext } from 'react';
import Aos from 'aos';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUtensils, FaUser, FaShareAlt, FaExternalLinkAlt, FaSpinner, FaArrowLeft, FaHeart, FaRegHeart, FaQuoteLeft } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import 'aos/dist/aos.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ProductsDetails = () => {
    const { id } = useParams(); // Get product ID from URL params
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Favorite states
    const [isFavorite, setIsFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [currentFavoriteId, setCurrentFavoriteId] = useState(null);
    const [checkingFavorite, setCheckingFavorite] = useState(true);

    // Initialize AOS
    useEffect(() => {
        Aos.init({ duration: 800, once: true });
    }, []);

    // Fetch product details
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!id) {
                setError('No product ID provided');
                setProductLoading(false);
                return;
            }

            try {
                setProductLoading(true);
                setError(null);

                const response = await fetch(`https://foodies-zone-eta.vercel.app/products-details/${id}`);

                if (!response.ok) {
                    throw new Error(`Failed to fetch product: ${response.status}`);
                }

                const data = await response.json();

                // Check if data is valid
                if (!data || Object.keys(data).length === 0) {
                    throw new Error('Product not found');
                }

                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError(error.message || 'Failed to load product details');
            } finally {
                setProductLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Check favorite status for this product
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!user || !product) {
                setIsFavorite(false);
                setCurrentFavoriteId(null);
                setCheckingFavorite(false);
                return;
            }

            try {
                setCheckingFavorite(true);
                const response = await fetch(
                    `https://foodies-zone-eta.vercel.app/favorites?foodId=${product._id}&email=${user.email}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch favorite status');
                }

                const data = await response.json();
                
                if (Array.isArray(data)) {
                    const favoriteItem = data.find(f => f.foodId === product._id && f.favorite_by === user.email);
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
            } catch (err) {
                console.error('Error checking favorite status:', err);
                setIsFavorite(false);
                setCurrentFavoriteId(null);
            } finally {
                setCheckingFavorite(false);
            }
        };

        if (product) {
            checkFavoriteStatus();
        }
    }, [product, user]);

    // Fetch top 3 rated products
    useEffect(() => {
        const fetchTopProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://foodies-zone-eta.vercel.app/products');

                if (!response.ok) {
                    throw new Error(`Failed to fetch products: ${response.status}`);
                }

                const allProducts = await response.json();

                // Sort by rating in descending order and take top 3
                // Filter out the current product from recommendations
                const sortedByRating = [...allProducts]
                    .filter(p => p._id !== id) // Exclude current product
                    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
                    .slice(0, 3);

                setTopProducts(sortedByRating);
            } catch (error) {
                console.error('Error fetching top products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!productLoading) {
            fetchTopProducts();
        }
    }, [productLoading, id]);

    // Handle favorite functionality
    const handleFavorite = async () => {
        if (!user) {
            toast.error('Please login to add favorites');
            return;
        }

        if (!product) {
            toast.error('Product data not available');
            return;
        }

        setFavoriteLoading(true);

        try {
            if (isFavorite) {
                // Remove from favorites
                if (!currentFavoriteId) {
                    toast.error('Cannot find favorite item');
                    setFavoriteLoading(false);
                    return;
                }

                const response = await fetch(
                    `https://foodies-zone-eta.vercel.app/favorites/${currentFavoriteId}`,
                    { method: 'DELETE' }
                );

                const data = await response.json();

                if (data.deletedCount > 0 || data.success) {
                    setIsFavorite(false);
                    setCurrentFavoriteId(null);
                    toast.success('Removed from favorites');
                } else {
                    toast.error('Failed to remove from favorites');
                }
            } else {
                // Add to favorites
                const newFavorite = {
                    foodImage: product.foodImage,
                    foodName: product.foodName,
                    location: product.location,
                    rating: product.rating,
                    restaurantName: product.restaurantName,
                    reviewText: product.reviewText,
                    reviewerName: product.reviewerName,
                    favorite_by: user.email,
                    foodId: product._id,
                    addedAt: new Date().toISOString()
                };

                const response = await fetch('https://foodies-zone-eta.vercel.app/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newFavorite)
                });

                const data = await response.json();
                
                setIsFavorite(true);
                setCurrentFavoriteId(data._id || data.insertedId);
                toast.success('Added to favorites');
            }
        } catch (error) {
            console.error('Error handling favorite:', error);
            toast.error('Failed to update favorites');
        } finally {
            setFavoriteLoading(false);
        }
    };

    // Handle share functionality
    const handleShare = async () => {
        const shareData = {
            title: product?.foodName || 'Food Review',
            text: `Check out this ${product?.foodName} review from ${product?.restaurantName}!`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert('Link copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        }
    };

    // Handle back to products
    const handleBack = () => {
        navigate('/products');
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';

        try {
            const dateObj = new Date(dateString);
            if (isNaN(dateObj.getTime())) return 'Invalid date';

            return dateObj.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Date unavailable';
        }
    };

    // Format time
    const formatTime = (dateString) => {
        if (!dateString) return 'Time not available';

        try {
            const dateObj = new Date(dateString);
            if (isNaN(dateObj.getTime())) return 'Invalid time';

            return dateObj.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Error formatting time:', error);
            return 'Time unavailable';
        }
    };

    // Loading state
    if (productLoading) {
        return (
            <div className='flex flex-col min-h-screen bg-linear-to-b from-slate-50 to-white'>
                <Navbar fixed={false} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <FaSpinner className="animate-spin text-4xl text-amber-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-slate-700">Loading product details...</h2>
                        <p className="text-slate-500 mt-2">Please wait while we fetch the delicious details</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className='flex flex-col min-h-screen bg-linear-to-b from-slate-50 to-white'>
                <Navbar fixed={false} />

                {/* Breadcrumb Navigation */}
                <div className='bg-white border-b border-slate-200 py-3'>
                    <div className='container mx-auto px-4'>
                        <div className='flex items-center text-sm text-slate-600'>
                            <Link to='/' className='hover:text-amber-600 transition-colors'>Home</Link>
                            <span className='mx-2'>/</span>
                            <Link to='/products' className='hover:text-amber-600 transition-colors'>Reviews</Link>
                            <span className='mx-2'>/</span>
                            <span className='text-slate-900 font-medium'>Product Details</span>
                        </div>
                    </div>
                </div>

                <main className='flex-1 container mx-auto px-4 py-16 max-w-4xl'>
                    <div className='bg-white rounded-2xl shadow-lg p-8 text-center' data-aos="fade-up">
                        <div className="text-6xl mb-6 text-slate-300">🍽️</div>
                        <h1 className='text-3xl font-bold text-slate-800 mb-4'>
                            {error ? 'Oops! Something went wrong' : 'Product Not Found'}
                        </h1>
                        <p className='text-slate-600 mb-8 max-w-md mx-auto'>
                            {error || 'The product you are looking for might have been removed or is temporarily unavailable.'}
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button
                                onClick={handleBack}
                                className='px-6 py-3 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-md hover:shadow-lg'
                            >
                                Back to Reviews
                            </button>
                            <Link
                                to='/'
                                className='px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-center hover:shadow-md'
                            >
                                Go to Homepage
                            </Link>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }

    // Destructure product data with fallbacks
    const {
        date = '',
        foodImage = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
        foodName = 'Food Name',
        location = 'Location not specified',
        rating = 0,
        restaurantName = 'Restaurant Name',
        reviewText = 'No review text available.',
        reviewerName = 'Anonymous',
        price,
        tags = []
    } = product;

    const formattedDate = formatDate(date);
    const time = formatTime(date);

    return (
        <div className='flex flex-col min-h-screen bg-linear-to-b from-slate-50 to-white'>
            <Navbar fixed={false} />

            {/* Breadcrumb Navigation */}
            <div className='bg-white border-b border-slate-200 py-3'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-wrap items-center text-sm text-slate-600'>
                        <Link to='/' className='hover:text-amber-600 transition-colors'>Home</Link>
                        <span className='mx-2'>/</span>
                        <Link to='/products' className='hover:text-amber-600 transition-colors'>Reviews</Link>
                        <span className='mx-2'>/</span>
                        <span className='text-slate-900 font-medium truncate' title={foodName}>
                            {foodName.length > 40 ? `${foodName.substring(0, 40)}...` : foodName}
                        </span>
                    </div>
                </div>
            </div>

            <main className='flex-1 container mx-auto px-4 py-8 max-w-6xl'>
                {/* Back Button */}
                <button
                    onClick={handleBack}
                    className='flex items-center gap-2 text-slate-600 hover:text-amber-600 mb-6 transition-colors group'
                    data-aos="fade-right"
                >
                    <FaArrowLeft className='group-hover:-translate-x-1 transition-transform' />
                    <span className='font-medium'>Back to Reviews</span>
                </button>

                <div className='bg-white rounded-2xl shadow-lg overflow-hidden' data-aos="fade-up">
                    {/* Hero Section */}
                    <div className='relative h-64 md:h-80 overflow-hidden'>
                        <img
                            src={foodImage}
                            alt={foodName}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
                            }}
                        />
                        <div className='absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/40 to-transparent'></div>
                        
                        {/* Title Overlay */}
                        <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white'>
                            <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
                                <div>
                                    <div className='inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-3'>
                                        <FaStar className='text-amber-300' />
                                        <span>Featured Review</span>
                                    </div>
                                    <h1 className='text-3xl md:text-4xl font-bold mb-2'>{foodName}</h1>
                                    <p className='text-amber-200 text-lg'>at {restaurantName}</p>
                                </div>
                                
                                {/* Rating Badge */}
                                <div className='flex items-center gap-3'>
                                    <div className='bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl border border-amber-300/30'>
                                        <div className='flex items-center gap-2'>
                                            <FaStar className='text-amber-300 text-2xl' />
                                            <span className='text-3xl font-bold text-white'>{rating}</span>
                                            <span className='text-amber-100'>/5.0</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 md:p-8'>
                        {/* Main Content Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Left Column - Food Image & Info */}
                            <div className='lg:col-span-2 space-y-8'>
                                {/* Restaurant Details Card */}
                                <div className='bg-linear-to-br from-slate-50 to-white rounded-xl p-6 shadow-sm border border-slate-200' data-aos="fade-right">
                                    <h2 className='text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2'>
                                        <FaUtensils className='text-amber-600' />
                                        Restaurant Information
                                    </h2>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <div className='flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200'>
                                            <div className='bg-linear-to-r from-amber-100 to-amber-50 p-3 rounded-lg'>
                                                <FaUtensils className='text-amber-600' size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm text-slate-500'>Restaurant</p>
                                                <p className='font-semibold text-slate-700'>{restaurantName}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200'>
                                            <div className='bg-linear-to-r from-amber-100 to-amber-50 p-3 rounded-lg'>
                                                <FaMapMarkerAlt className='text-amber-600' size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm text-slate-500'>Location</p>
                                                <p className='font-semibold text-slate-700'>{location}</p>
                                            </div>
                                        </div>
                                        {price && (
                                            <div className='flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200'>
                                                <div className='bg-linear-to-r from-amber-100 to-amber-50 p-3 rounded-lg'>
                                                    <span className='font-bold text-amber-600 text-xl'>$</span>
                                                </div>
                                                <div>
                                                    <p className='text-sm text-slate-500'>Average Price</p>
                                                    <p className='font-semibold text-slate-700'>{price}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200'>
                                            <div className='bg-linear-to-r from-amber-100 to-amber-50 p-3 rounded-lg'>
                                                <FaUser className='text-amber-600' size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm text-slate-500'>Reviewed by</p>
                                                <p className='font-semibold text-slate-700'>{reviewerName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Tags */}
                                    {tags && tags.length > 0 && (
                                        <div className='mt-6 pt-6 border-t border-slate-200'>
                                            <p className='text-sm text-slate-500 mb-3'>Tags</p>
                                            <div className='flex flex-wrap gap-2'>
                                                {tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className='px-3 py-1.5 bg-linear-to-r from-amber-50 to-amber-100 text-amber-700 text-sm rounded-full border border-amber-200 font-medium'
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Review Content Card */}
                                <div className='bg-linear-to-br from-slate-50 to-white rounded-xl p-6 shadow-sm border border-slate-200' data-aos="fade-up">
                                    <div className='flex items-center justify-between mb-6'>
                                        <h3 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                                            <FaQuoteLeft className='text-amber-500' />
                                            Full Review
                                        </h3>
                                        <div className='flex items-center gap-3'>
                                            <div className='text-sm text-slate-500 flex items-center gap-2'>
                                                <FaCalendarAlt className='text-amber-500' />
                                                {formattedDate}
                                            </div>
                                            <span className='text-slate-300'>|</span>
                                            <div className='text-sm text-slate-500 flex items-center gap-2'>
                                                <FaClock className='text-amber-500' />
                                                {time}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='bg-white p-6 rounded-lg border border-slate-200 min-h-[200px]'>
                                        <p className='text-slate-700 leading-relaxed text-lg'>"{reviewText}"</p>
                                    </div>
                                    
                                    <div className='mt-8 pt-8 border-t border-slate-200'>
                                        <div className='flex flex-col sm:flex-row items-center justify-between gap-6'>
                                            <div>
                                                <p className='text-sm text-slate-500 mb-2'>Overall Experience</p>
                                                <div className='flex items-center gap-3'>
                                                    <div className='flex items-center'>
                                                        {Array.from({ length: 5 }).map((_, index) => (
                                                            <FaStar
                                                                key={index}
                                                                className={index < rating ? 'text-amber-500' : 'text-slate-300'}
                                                                size={24}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className='text-2xl font-bold text-slate-800'>{rating}/5</span>
                                                </div>
                                            </div>
                                            <div className='text-center'>
                                                <div className={`px-4 py-2 rounded-full font-semibold ${
                                                    rating >= 4.5 ? 'bg-linear-to-r from-green-100 to-green-50 text-green-700 border border-green-200' :
                                                    rating >= 4 ? 'bg-linear-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200' :
                                                    rating >= 3 ? 'bg-linear-to-r from-yellow-100 to-yellow-50 text-yellow-700 border border-yellow-200' :
                                                    'bg-linear-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200'
                                                }`}>
                                                    {rating >= 4.5 ? 'Exceptional' :
                                                     rating >= 4 ? 'Excellent' :
                                                     rating >= 3 ? 'Good' : 'Average'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Review Details & Actions */}
                            <div className='space-y-6' data-aos="fade-left">
                                {/* Reviewer Card */}
                                <div className='bg-linear-to-br from-amber-50 to-white rounded-xl p-6 shadow-sm border border-amber-200'>
                                    <div className='flex items-center gap-4 mb-6'>
                                        <div className='bg-linear-to-r from-amber-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
                                            {reviewerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-bold text-slate-800'>{reviewerName}</h3>
                                            <p className='text-amber-600 font-medium'>Food Critic</p>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div className='bg-white p-4 rounded-lg text-center border border-slate-200'>
                                            <div className='flex items-center justify-center gap-2 mb-2'>
                                                <FaCalendarAlt className='text-amber-500' />
                                            </div>
                                            <p className='text-sm text-slate-500'>Visit Date</p>
                                            <p className='font-semibold text-slate-700 text-sm'>{formattedDate}</p>
                                        </div>
                                        <div className='bg-white p-4 rounded-lg text-center border border-slate-200'>
                                            <div className='flex items-center justify-center gap-2 mb-2'>
                                                <FaClock className='text-amber-500' />
                                            </div>
                                            <p className='text-sm text-slate-500'>Visit Time</p>
                                            <p className='font-semibold text-slate-700 text-sm'>{time}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons Card */}
                                <div className='bg-linear-to-br from-slate-50 to-white rounded-xl p-6 shadow-sm border border-slate-200'>
                                    <h3 className='text-lg font-bold text-slate-800 mb-4'>Actions</h3>
                                    <div className='space-y-4'>
                                        <button
                                            onClick={handleFavorite}
                                            disabled={favoriteLoading || checkingFavorite}
                                            className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                                                isFavorite 
                                                    ? 'bg-linear-to-r from-red-50 to-red-100 text-red-600 border border-red-200 hover:shadow-red-200' 
                                                    : 'bg-linear-to-r from-slate-50 to-white text-slate-700 border border-slate-300 hover:shadow-slate-200'
                                            } hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                        >
                                            {favoriteLoading ? (
                                                <FaSpinner className='animate-spin' />
                                            ) : checkingFavorite ? (
                                                <>
                                                    <FaSpinner className='animate-spin' />
                                                    Checking...
                                                </>
                                            ) : isFavorite ? (
                                                <>
                                                    <FaHeart className='text-red-500' />
                                                    Remove from Favorites
                                                </>
                                            ) : (
                                                <>
                                                    <FaRegHeart />
                                                    Add to Favorites
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={handleShare}
                                            className='w-full flex items-center justify-center gap-3 py-3 px-4 bg-linear-to-r from-slate-50 to-white text-slate-700 rounded-xl font-semibold border border-slate-300 hover:shadow-md transition-all duration-300 hover:shadow-slate-200'
                                        >
                                            <FaShareAlt />
                                            Share Review
                                        </button>

                                        <button
                                            onClick={() => {
                                                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantName + ' ' + location)}`;
                                                window.open(mapUrl, '_blank');
                                            }}
                                            className='w-full flex items-center justify-center gap-3 py-3 px-4 bg-linear-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 shadow-md hover:shadow-lg transition-all duration-300'
                                        >
                                            <FaExternalLinkAlt />
                                            View on Map
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className='bg-linear-to-br from-slate-50 to-white rounded-xl p-6 shadow-sm border border-slate-200'>
                                    <h3 className='text-lg font-bold text-slate-800 mb-4'>Quick Stats</h3>
                                    <div className='space-y-3'>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-slate-600'>Food Rating</span>
                                            <span className='font-bold text-slate-800'>{rating}/5</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-slate-600'>Restaurant</span>
                                            <span className='font-semibold text-slate-800'>{restaurantName}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-slate-600'>Location</span>
                                            <span className='font-semibold text-slate-800 text-right'>{location}</span>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <span className='text-slate-600'>Favorite Status</span>
                                            <span className={`font-semibold ${isFavorite ? 'text-red-500' : 'text-slate-600'}`}>
                                                {isFavorite ? 'In Favorites' : 'Not Added'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Products Section */}
                        <div className='mt-12 pt-12 border-t border-slate-200' data-aos="fade-up">
                            <div className='flex flex-col sm:flex-row items-center justify-between mb-8'>
                                <div>
                                    <h3 className='text-2xl font-bold text-slate-800 mb-2'>You Might Also Like</h3>
                                    <p className='text-slate-600'>Discover more amazing dishes from our community</p>
                                </div>
                                <Link
                                    to='/products'
                                    className='mt-4 sm:mt-0 flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold group'
                                >
                                    View All Reviews
                                    <FaExternalLinkAlt className='group-hover:translate-x-1 transition-transform' />
                                </Link>
                            </div>

                            {loading ? (
                                <div className="flex justify-center">
                                    <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className='bg-slate-200 rounded-xl p-4'>
                                                <div className='h-40 bg-slate-300 rounded-lg mb-4'></div>
                                                <div className='h-4 bg-slate-300 rounded w-3/4 mb-2'></div>
                                                <div className='h-3 bg-slate-300 rounded w-1/2'></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : topProducts.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                                    {topProducts.map((product) => (
                                        <Link
                                            key={product._id}
                                            to={`/products-details/${product._id}`}
                                            className='block group bg-linear-to-br from-white to-slate-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border border-slate-200 hover:-translate-y-1'
                                        >
                                            <div className='h-40 w-full overflow-hidden rounded-lg mb-4'>
                                                <img
                                                    src={product.foodImage}
                                                    alt={product.foodName}
                                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
                                                    }}
                                                />
                                            </div>
                                            <h4 className='font-bold text-slate-800 truncate text-lg mb-1'>{product.foodName}</h4>
                                            <p className='text-slate-600 text-sm mb-3 truncate'>at {product.restaurantName}</p>
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-1'>
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={index < (product.rating || 0) ? 'text-amber-500' : 'text-slate-300'}
                                                            size={16}
                                                        />
                                                    ))}
                                                    <span className='ml-2 text-sm font-bold text-slate-700'>
                                                        {product.rating ? product.rating : 'N/A'}
                                                    </span>
                                                </div>
                                                <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                                                    (product.rating || 0) >= 4.5 ? 'bg-linear-to-r from-amber-100 to-amber-50 text-amber-700 border border-amber-200' :
                                                    (product.rating || 0) >= 4 ? 'bg-linear-to-r from-amber-50 to-amber-100 text-amber-700 border border-amber-200' :
                                                    'bg-linear-to-r from-slate-100 to-slate-50 text-slate-700 border border-slate-200'
                                                }`}>
                                                    {(product.rating || 0) >= 4.5 ? 'Top Rated' : 'Highly Rated'}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-slate-500">No recommendations found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductsDetails;