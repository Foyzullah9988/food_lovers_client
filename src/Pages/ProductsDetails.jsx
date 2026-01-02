import { useEffect, useState } from 'react';
import Aos from 'aos';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUtensils, FaUser, FaShareAlt, FaExternalLinkAlt, FaSpinner } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router';
import 'aos/dist/aos.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ProductsDetails = () => {
    const { id } = useParams(); // Get product ID from URL params
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productLoading, setProductLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <div className='flex flex-col min-h-screen bg-gray-50'>
                <Navbar fixed={false} />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <FaSpinner className="animate-spin text-4xl text-[#426733] mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700">Loading product details...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we fetch the delicious details</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className='flex flex-col min-h-screen bg-gray-50'>
                <Navbar fixed={false} />

                {/* Breadcrumb Navigation */}
                <div className='bg-white border-b py-3'>
                    <div className='container mx-auto px-4'>
                        <div className='flex items-center text-sm text-gray-600'>
                            <Link to='/' className='hover:text-blue-500 transition-colors'>Home</Link>
                            <span className='mx-2'>/</span>
                            <Link to='/products' className='hover:text-blue-500 transition-colors'>Reviews</Link>
                            <span className='mx-2'>/</span>
                            <span className='text-gray-900 font-medium'>Product Details</span>
                        </div>
                    </div>
                </div>

                <main className='flex-1 container mx-auto px-4 py-16 max-w-4xl'>
                    <div className='bg-white rounded-2xl shadow-sm p-8 text-center'>
                        <div className="text-6xl mb-6 text-gray-300">🍽️</div>
                        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
                            {error ? 'Oops! Something went wrong' : 'Product Not Found'}
                        </h1>
                        <p className='text-gray-600 mb-8 max-w-md mx-auto'>
                            {error || 'The product you are looking for might have been removed or is temporarily unavailable.'}
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <button
                                onClick={handleBack}
                                className='px-6 py-3 bg-[#426733] text-white rounded-lg font-semibold hover:bg-[#2f4a24] transition-colors'
                            >
                                Back to Reviews
                            </button>
                            <Link
                                to='/'
                                className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center'
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
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <Navbar fixed={false} />

            {/* Breadcrumb Navigation */}
            <div className='bg-white border-b py-3'>
                <div className='container mx-auto px-4'>
                    <div className='flex flex-wrap items-center text-sm text-gray-600'>
                        <Link to='/' className='hover:text-blue-500 transition-colors'>Home</Link>
                        <span className='mx-2'>/</span>
                        <Link to='/products' className='hover:text-blue-500 transition-colors'>Reviews</Link>
                        <span className='mx-2'>/</span>
                        <span className='text-gray-900 font-medium truncate' title={foodName}>
                            {foodName.length > 40 ? `${foodName.substring(0, 40)}...` : foodName}
                        </span>
                    </div>
                </div>
            </div>

            <main className='flex-1 container mx-auto px-4 py-8 max-w-6xl'>
                {/* Back Button */}


                <div className='bg-white rounded-2xl shadow-sm overflow-hidden' data-aos="fade-up">
                    {/* Hero Section */}


                    <div className='p-6 md:p-8'>
                        {/* Main Content Grid */}
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {/* Left Column - Food Image & Info */}
                            <div className='lg:col-span-2 space-y-8'>
                                {/* Food Image Card */}
                                <div className='rounded-xl overflow-hidden shadow-sm' data-aos="zoom-in">
                                    <img
                                        src={foodImage}
                                        alt={foodName}
                                        className='w-full h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500'
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
                                        }}
                                    />

                                    <div className='bg-linear-to-r from-blue-50 to-gray-100 p-4'>
                                        <div className='flex flex-wrap items-center justify-between gap-4'>
                                            <div className='flex items-center space-x-4'>
                                                <div className='flex items-center'>
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                                                            size={20}
                                                        />
                                                    ))}
                                                </div>
                                                <span className='text-xl font-bold text-gray-700'>{rating.toFixed(1)}/5</span>
                                            </div>
                                            <span className={`text-sm px-3 py-1 rounded-full font-medium ${rating >= 4.5 ? 'bg-green-100 text-green-800' :
                                                rating >= 4 ? 'bg-blue-100 text-blue-800' :
                                                    rating >= 3 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {rating >= 4.5 ? 'Excellent' :
                                                    rating >= 4 ? 'Great' :
                                                        rating >= 3 ? 'Good' : 'Average'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                        <div className=' inset-0 flex items-center justify-center'>
                                            <div className='text-center p-6 bg-white/90 backdrop-blur-sm   max-w-2xl mx-4'>
                                                <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>{foodName}</h1>
                                                <p className='text-gray-600 text-lg'>at {restaurantName}</p>

                                            </div>
                                        </div>
                                    
                                </div>

                                {/* Restaurant Details Card */}
                                <div className='bg-gray-50 rounded-xl p-6 shadow-sm' data-aos="fade-right">
                                    <h2 className='text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
                                        <FaUtensils className='text-gray-600' />
                                        Restaurant Information
                                    </h2>
                                    <div className='space-y-4'>
                                        <div className='flex items-center gap-3 p-3 bg-white rounded-lg'>
                                            <div className='bg-gray-100 p-2 rounded-lg'>
                                                <FaUtensils className='text-gray-600' size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Restaurant</p>
                                                <p className='font-semibold text-gray-700'>{restaurantName}</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3 p-3 bg-white rounded-lg'>
                                            <div className='bg-gray-100 p-2 rounded-lg'>
                                                <FaMapMarkerAlt className='text-gray-600' size={20} />
                                            </div>
                                            <div>
                                                <p className='text-sm text-gray-500'>Location</p>
                                                <p className='font-semibold text-gray-700'>{location}</p>
                                            </div>
                                        </div>
                                        {price && (
                                            <div className='flex items-center gap-3 p-3 bg-white rounded-lg'>
                                                <div className='bg-gray-100 p-2 rounded-lg'>
                                                    <span className='font-bold text-gray-600'>$</span>
                                                </div>
                                                <div>
                                                    <p className='text-sm text-gray-500'>Average Price</p>
                                                    <p className='font-semibold text-gray-700'>{price}</p>
                                                </div>
                                            </div>
                                        )}
                                        {tags && tags.length > 0 && (
                                            <div className='p-3 bg-white rounded-lg'>
                                                <p className='text-sm text-gray-500 mb-2'>Tags</p>
                                                <div className='flex flex-wrap gap-2'>
                                                    {tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className='px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full'
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Review Details */}
                            <div className='space-y-6' data-aos="fade-left">
                                {/* Reviewer Card */}
                                <div className='bg-linear-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm border border-gray-200'>
                                    <div className='flex items-center gap-4 mb-6'>
                                        <div className='bg-linear-to-r from-blue-100 to-gray-100 w-16 h-16 rounded-full flex items-center justify-center text-gray-700 text-2xl font-bold border border-gray-300'>
                                            {reviewerName.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                                               
                                                {reviewerName}
                                            </h3>
                                            <p className='text-gray-500'>Food Reviewer</p>
                                        </div>
                                    </div>

                                    {/* Review Stats */}
                                    <div className='space-y-4'>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div className='bg-white p-3 rounded-lg text-center border border-gray-200'>
                                                <div className='flex items-center justify-center gap-2 mb-1'>
                                                    <FaCalendarAlt className='text-gray-600' />
                                                    <span className='font-semibold text-gray-700'>Date</span>
                                                </div>
                                                <p className='text-gray-700 text-sm'>{formattedDate}</p>
                                            </div>
                                            <div className='bg-white p-3 rounded-lg text-center border border-gray-200'>
                                                <div className='flex items-center justify-center gap-2 mb-1'>
                                                    <FaClock className='text-gray-600' />
                                                    <span className='font-semibold text-gray-700'>Time</span>
                                                </div>
                                                <p className='text-gray-700 text-sm'>{time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Content Card */}
                                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
                                    <h3 className='text-xl font-bold text-gray-800 mb-4'>Review</h3>
                                    <div className='bg-gray-50 p-5 rounded-lg border border-gray-200 min-h-[150px]'>
                                        <p className='text-gray-700 leading-relaxed italic'>"{reviewText}"</p>
                                    </div>
                                    <div className='mt-6 pt-6 border-t border-gray-300'>
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <p className='text-sm text-gray-500'>Overall Experience</p>
                                                <div className='flex items-center gap-2 mt-1'>
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={index < rating ? 'text-yellow-400' : 'text-gray-300'}
                                                            size={18}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='text-right'>
                                                <p className='text-3xl font-bold text-gray-800'>{rating.toFixed(1)}</p>
                                                <p className='text-sm text-gray-500'>out of 5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='flex flex-col sm:flex-row gap-3'>
                                    <button
                                        onClick={handleShare}
                                        className='flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors'
                                    >
                                        <FaShareAlt /> Share Review
                                    </button>
                                    <button className='flex-1 flex items-center justify-center gap-2 bg-[#426733] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#2f4a24] transition-colors shadow-sm hover:shadow'
                                        onClick={() => {
                                            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantName + ' ' + location)}`;
                                            window.open(mapUrl, '_blank');
                                        }}
                                    >
                                        <FaExternalLinkAlt /> View Location
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Products Section */}
                        <div className='mt-12' data-aos="fade-up">
                            <h3 className='text-2xl font-bold text-gray-800 mb-6'>You Might Also Like</h3>

                            {loading ? (
                                <div className="flex justify-center">
                                    <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className='bg-gray-200 rounded-xl p-4'>
                                                <div className='h-40 bg-gray-300 rounded-lg mb-4'></div>
                                                <div className='h-4 bg-gray-300 rounded w-3/4 mb-2'></div>
                                                <div className='h-3 bg-gray-300 rounded w-1/2'></div>
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
                                            className='block bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer border border-gray-200  group'
                                        >
                                            <div className='h-40 w-full overflow-hidden rounded-lg mb-4'>
                                                <img
                                                    src={product.foodImage}
                                                    alt={product.foodName}
                                                    className='w-full h-full object-cover scale-110 hover:ease-in-out transition-transform duration-300 group-hover:scale-100'
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
                                                    }}
                                                />
                                            </div>
                                            <h4 className='font-semibold text-gray-800 truncate'>{product.foodName}</h4>
                                            <p className='text-gray-600 text-sm mt-1 truncate'>{product.restaurantName}</p>
                                            <div className='flex items-center justify-between mt-3'>
                                                <div className='flex items-center gap-1'>
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={index < (product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}
                                                            size={14}
                                                        />
                                                    ))}
                                                    <span className='ml-2 text-sm font-medium text-gray-700'>
                                                        {product.rating ? product.rating.toFixed(1) : 'N/A'}
                                                    </span>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full ${(product.rating || 0) >= 4.5 ? 'bg-green-100 text-green-800' :
                                                    (product.rating || 0) >= 4 ? 'bg-blue-100 text-blue-800' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {(product.rating || 0) >= 4.5 ? 'Top Rated' : 'Highly Rated'}
                                                </span>
                                            </div>

                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No recommendations found.</p>
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