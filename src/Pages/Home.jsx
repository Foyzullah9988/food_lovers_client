import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaUtensils, FaFire, FaHeart, FaStar, FaMapMarkerAlt, FaUser, FaQuoteLeft, FaLeaf, FaArrowRight } from 'react-icons/fa';
import Hero from '../Components/Hero';
import Challenge from '../Components/Challenge';
import Guides from '../Components/Guides';
import Book from '../Components/Book';
import Aos from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../Components/ProductCard';

const Home = () => {
    const data = useLoaderData();
    const sortedData = [...data].sort((a, b) => Number(b.rating) - Number(a.rating));
    const topRated = sortedData.slice(0, 1)[0];
    const featuredReviews = sortedData.slice(1, 4);
    const slicedData = sortedData.slice(4, 10);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
            {/* Hero Section */}
            <Hero data={data} />

            {/* Featured Review - Hero Style */}
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div 
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                    data-aos="zoom-in"
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img 
                            src={topRated?.foodImage || "https://images.unsplash.com/photo-1565958011703-44f9829ba187"} 
                            alt={topRated?.foodName || "Featured Dish"}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-900/80 via-slate-900/60 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 p-8 md:p-12 lg:p-16 text-white">
                        <div className="max-w-2xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <FaFire className="animate-pulse" />
                                <span>Editor's Choice</span>
                            </div>
                            
                            {/* Title & Rating */}
                            <div className="mb-6">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight bg-linear-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                                    {topRated?.foodName || "Premium Dish"}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
                                        <FaStar className="text-amber-300" />
                                        <span className="font-bold text-2xl text-amber-200">{topRated?.rating || "4.9"}</span>
                                        <span className="text-amber-100">/5.0</span>
                                    </div>
                                    <span className="text-amber-100 text-lg">•</span>
                                    <span className="text-xl font-semibold text-amber-100">{topRated?.restaurantName || "Premium Restaurant"}</span>
                                </div>
                            </div>
                            
                            {/* Review Excerpt */}
                            <div className="mb-8 relative">
                                <FaQuoteLeft className="text-amber-400/30 text-6xl absolute -top-4 -left-4" />
                                <p className="text-xl md:text-2xl italic text-slate-100 leading-relaxed pl-8">
                                    "{topRated?.reviewText?.substring(0, 200) || "An exceptional culinary experience that redefines flavor..."}"
                                </p>
                            </div>
                            
                            {/* Reviewer & CTA */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center ring-2 ring-amber-400/50">
                                        <span className="text-white font-bold text-xl">
                                            {topRated?.reviewerName?.charAt(0) || "A"}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-white">{topRated?.reviewerName || "Alex Morgan"}</p>
                                        <p className="text-amber-200">Food Critic</p>
                                    </div>
                                </div>
                                
                                <Link
                                    to={`/products-details/${topRated?._id || '1'}`}
                                    className="group bg-linear-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 hover:shadow-amber-500/25"
                                >
                                    Read Full Story
                                    <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Reviews Grid */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
                    <div className="text-center sm:text-left" data-aos="fade-up">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <FaUtensils className="text-amber-600 text-2xl" />
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                                Must-Try <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Dishes</span>
                            </h2>
                            <FaLeaf className="text-amber-600 text-2xl" />
                        </div>
                        <p className="text-slate-600 max-w-2xl">
                            Curated selection of exceptional culinary experiences
                        </p>
                    </div>
                    
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredReviews.map((review, index) => (
                        <div 
                            key={review._id}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-200"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img 
                                    src={review.foodImage || "https://images.unsplash.com/photo-1565958011703-44f9829ba187"}
                                    alt={review.foodName || "Featured Dish"}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                
                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-amber-200">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-amber-500" />
                                        <span className="font-bold text-lg text-slate-800">{review.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1">
                                    {review.foodName}
                                </h3>
                                
                                <div className="flex items-center gap-2 text-slate-600 mb-3">
                                    <FaMapMarkerAlt className="text-amber-600" />
                                    <span className="text-sm">{review.restaurantName}</span>
                                </div>
                                
                                <p className="text-slate-700 mb-4 line-clamp-2 italic border-l-4 border-amber-500 pl-4">
                                    "{review.reviewText}"
                                </p>
                                
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                                            <FaUser className="text-white text-sm" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{review.reviewerName}</p>
                                            <p className="text-xs text-slate-500">Food Explorer</p>
                                        </div>
                                    </div>
                                    
                                    <Link
                                        to={`/products-details/${review._id}`}
                                        className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 group"
                                    >
                                        Details
                                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Reviews Carousel */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
                    <div className="text-center sm:text-left" data-aos="fade-up">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Trending</span> This Week
                        </h2>
                        <p className="text-slate-600 max-w-2xl">
                            What the food community is talking about right now
                        </p>
                    </div>
                    
                    {/* Explore All Button */}
                    <div className="mt-6 sm:mt-0" data-aos="fade-up" data-aos-delay="100">
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25"
                        >
                            Explore All Reviews
                            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {slicedData.map((d, index) => (
                        <div 
                            key={d._id}
                            data-aos="fade-up"
                            data-aos-delay={100 * (index % 3)}
                        >
                            <ProductCard d={d} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Challenge Section */}
            <div data-aos="fade-up">
                <Challenge />
            </div>

            {/* Book Section */}
            <div data-aos="fade-up" data-aos-delay="100">
                <Book />
            </div>

            {/* Guides Section */}
            <div data-aos="fade-up" data-aos-delay="200">
                <Guides />
            </div>

            {/* Community Stats */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                <div 
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    data-aos="fade-up"
                >
                    {[
                        { number: "5K+", label: "Food Reviews", icon: "🍽️" },
                        { number: "2K+", label: "Community Members", icon: "👥" },
                        { number: "500+", label: "Restaurants", icon: "🏪" },
                        { number: "4.8", label: "Average Rating", icon: "⭐" }
                    ].map((stat, index) => (
                        <div 
                            key={index}
                            className="text-center p-6 bg-linear-to-br from-white to-slate-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200"
                        >
                            <div className="text-4xl mb-3">{stat.icon}</div>
                            <div className="text-3xl font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-slate-600 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Explore Community Button */}
                <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="100">
                    <Link
                        to="/community"
                        className="group inline-flex items-center gap-3 bg-linear-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25"
                    >
                        Explore Full Community
                        <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 px-4 max-w-4xl mx-auto text-center">
                <div data-aos="zoom-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Ready to Share Your <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Food Story</span>?
                    </h2>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
                        Join our community of food lovers and share your authentic dining experiences with the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/add-review"
                            className="group bg-linear-to-r from-amber-600 to-amber-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3 hover:shadow-amber-500/25"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Write a Review
                        </Link>
                        <Link
                            to="/reviews"
                            className="group border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
                        >
                            Browse All Reviews
                            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;