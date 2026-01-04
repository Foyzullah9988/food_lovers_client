import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import { FaUtensils, FaFire, FaHeart, FaStar, FaMapMarkerAlt, FaUser, FaQuoteLeft, FaLeaf, FaArrowRight } from 'react-icons/fa';
import Hero from '../Components/Hero';
import Challenge from '../Components/Challenge';
import Guides from '../Components/Guides';
import Book from '../Components/Book';
import Aos from 'aos';
import 'aos/dist/aos.css';
import ProductCard from '../Components/ProductCard';
import { TrendingUp } from 'lucide-react';

const Home = () => {
    const data = useLoaderData();
    const sortedData = [...data].sort((a, b) => Number(b.rating) - Number(a.rating));
    const topRated = sortedData.slice(0, 1)[0];
    const featuredproducts = sortedData.slice(1, 4);
    const slicedData = sortedData.slice(4, 10);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-base-200 dark:to-base-200">
            {/* Hero Section */}
            <Hero data={data} />

            {/* Trending products Carousel */}
            <section className="py-4 md:py-8 mt-12 lg:py-10 px-4 max-w-7xl mx-auto ">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-8">
                    <div className="text-center sm:text-left w-full sm:w-auto mb-6 sm:mb-0" data-aos="fade-up">
                        <h2 className="text-2xl sm:text-3xl dark:text-white md:text-4xl font-bold text-slate-900  mb-3 md:mb-4 flex  items-center gap-2">
                            <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text  text-transparent">Trending</span> This Week 
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-2xl">
                            What the food community is talking about right now
                        </p>
                    </div>

                    {/* Explore All Button */}
                    <div className="w-full sm:w-auto" data-aos="fade-up" data-aos-delay="100">
                        <Link
                            to="/reviews"
                            className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg md:rounded-xl font-bold text-sm sm:text-base hover:shadow-xl md:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-amber-500/25 w-full sm:w-auto dark:from-amber-950  dark:to-black"
                        >
                            Explore All products
                            <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-12"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {slicedData.map((d, index) => (
                        <div
                            key={d._id}
                            data-aos="fade-up"
                            data-aos-delay={100 * (index % 3)}
                            className="w-full"
                        >
                            <ProductCard d={d} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Challenge Section */}
            <div data-aos="fade-up" className="px-4">
                <Challenge />
            </div>

            {/* Featured products Grid */}
            <section className="pb-4 md:pb-8 lg:pb-10 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-12">
                    <div className="text-center sm:text-left w-full mb-6 sm:mb-0" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                            <FaUtensils className="text-amber-600 text-xl sm:text-2xl" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                Must-Try <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Dishes</span>
                            </h2>
                            <FaLeaf className="text-amber-600 text-xl sm:text-2xl" />
                        </div>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 max-w-2xl">
                            Curated selection of exceptional culinary experiences
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {featuredproducts.map((review, index) => (
                        <div
                            key={review._id}
                            className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-gray-700"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                <img
                                    src={review.foodImage || "https://images.unsplash.com/photo-1565958011703-44f9829ba187"}
                                    alt={review.foodName || "Featured Dish"}
                                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 dark:from-gray-900/80 via-transparent to-transparent"></div>

                                {/* Rating Badge - Bigger Stars */}
                                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-lg border border-amber-200 dark:border-amber-700">
                                    <div className="flex items-center gap-1">
                                        <FaStar className="text-amber-500 w-5 h-5 md:w-6 md:h-6" />
                                        <span className="font-bold text-lg md:text-xl text-slate-800 dark:text-white">{review.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                                    {review.foodName}
                                </h3>

                                <div className="flex items-center gap-1.5 md:gap-2 text-slate-600 dark:text-gray-300 mb-3">
                                    <FaMapMarkerAlt className="text-amber-600 text-sm" />
                                    <span className="text-xs sm:text-sm">{review.restaurantName}</span>
                                </div>

                                <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 mb-4 line-clamp-2 italic border-l-3 md:border-l-4 border-amber-500 pl-3 md:pl-4">
                                    "{review.reviewText}"
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-900 dark:to-amber-900 flex items-center justify-center ">
                                            {
                                                review?.reviewerPhoto ? <div className="text-white text-xs" >
                                                    <img className='rounded-full object-cover' src={review.reviewerPhoto} alt="" />
                                                </div> : <FaUser className="text-white text-xs" />
                                            }
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">{review.reviewerName}</p>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">Food Explorer</p>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/reviews-details/${review._id}`}
                                        className="text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-semibold text-sm flex items-center gap-1 group"
                                    >
                                        Details
                                        <FaArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Review - Hero Style */}
            <section className="py-8 md:py-12 px-4  max-w-7xl mx-auto">
                <div
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl"
                    data-aos="zoom-in"
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={topRated?.foodImage || "https://images.unsplash.com/photo-1565958011703-44f9829ba187"}
                            alt={topRated?.foodName || "Featured Dish"}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 dark:from-gray-900/95 via-slate-900/70 dark:via-gray-900/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 md:p-8 lg:p-12 xl:p-16 text-white">
                        <div className="max-w-2xl">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
                                <FaFire className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                                <span>Foodie's Choice</span>
                            </div>

                            {/* Title & Rating */}
                            <div className="mb-6">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight bg-linear-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                                    {topRated?.foodName || "Premium Dish"}
                                </h2>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-amber-500/30 w-fit">
                                        <FaStar className="text-amber-300 w-5 h-5 md:w-6 md:h-6" />
                                        <span className="font-bold text-xl md:text-2xl text-amber-200">{topRated?.rating || "4.9"}</span>
                                        <span className="text-amber-100 text-base md:text-lg">/5.0</span>
                                    </div>
                                    <span className="hidden sm:inline text-amber-100 text-lg">•</span>
                                    <span className="text-base md:text-lg lg:text-xl font-semibold text-amber-100">{topRated?.restaurantName || "Premium Restaurant"}</span>
                                </div>
                            </div>

                            {/* Review Excerpt */}
                            <div className="mb-6 md:mb-8 relative">
                                <FaQuoteLeft className="text-amber-400/30 text-4xl md:text-6xl absolute -top-2 -left-2 md:-top-4 md:-left-4" />
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl italic text-slate-100 leading-relaxed pl-6 md:pl-8">
                                    "{topRated?.reviewText?.substring(0, 150) || "An exceptional culinary experience that redefines flavor..."}"
                                </p>
                            </div>

                            {/* Reviewer & CTA */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-amber-500 to-amber-600 flex items-center justify-center ring-2 ring-amber-400/50 dark:from-amber-950 dark:to-black/50">
                                        {
                                topRated?.reviewerPhoto ? <div className="text-white text-xs" >
                                    <img className='rounded-full object-cover' src={topRated.reviewerPhoto} alt="" />
                                </div> : <FaUser className="text-white text-xs" />
                            }
                                    </div>
                                    <div>
                                        <p className="font-bold text-base md:text-lg text-white">{topRated?.reviewerName || "Alex Morgan"}</p>
                                        <p className="text-amber-200 text-sm">Food Critic</p>
                                    </div>
                                </div>

                                <Link
                                    to={`/reviews-details/${topRated?._id || '1'}`}
                                    className="group bg-linear-to-r from-amber-600 to-amber-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-sm sm:text-base md:text-lg hover:shadow-xl md:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-amber-500/25 w-full sm:w-auto dark:from-amber-950  dark:to-black"
                                >
                                    Read Full Story
                                    <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Book Section */}
            <div data-aos="fade-up" data-aos-delay="100" className="px-4">
                <Book />
            </div>

            {/* Guides Section */}
            <div data-aos="fade-up" data-aos-delay="200" className="px-4">
                <Guides />
            </div>

            {/* Community Stats */}
            <section className="py-8 md:py-12 lg:py-16 px-4 max-w-7xl mx-auto">
                <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                    data-aos="fade-up"
                >
                    {[
                        { number: "5K+", label: "Food products", icon: "🍽️" },
                        { number: "2K+", label: "Community Members", icon: "👥" },
                        { number: "500+", label: "Restaurants", icon: "🏪" },
                        { number: "4.8", label: "Average Rating", icon: "⭐" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="text-center p-4 md:p-6 bg-linear-to-br from-white to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-slate-200 dark:border-gray-700"
                        >
                            <div className="text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3">{stat.icon}</div>
                            <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-1 md:mb-2">
                                {stat.number}
                            </div>
                            <div className="text-xs md:text-sm lg:text-base text-slate-600 dark:text-gray-300 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explore Community Button */}
                <div className="text-center mt-8 md:mt-12" data-aos="fade-up" data-aos-delay="100">
                    <Link
                        to="/join-community"
                        className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-amber-600 to-amber-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:shadow-xl md:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:shadow-amber-500/25 dark:from-amber-950  dark:to-black"
                    >
                        Explore Full Community
                        <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-12 md:py-16 lg:py-20 px-4 max-w-4xl mx-auto text-center">
                <div data-aos="zoom-in">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
                        Ready to Share Your <span className="bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Food Story</span>?
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-gray-300 mb-6 md:mb-10 max-w-2xl mx-auto px-2">
                        Join our community of food lovers and share your authentic dining experiences with the world.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
                        <Link
                            to="/reviews/add-review"
                            className="group bg-linear-to-r from-amber-600 to-amber-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:shadow-xl md:hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-amber-500/25 dark:from-amber-950  dark:to-black"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Write a Review
                        </Link>
                        <Link
                            to="/reviews"
                            className="group border border-amber-600 dark:border-amber-500 text-amber-600 dark:text-amber-500 px-6 py-3 md:px-8 md:py-4 rounded-lg md:rounded-xl font-bold text-base md:text-lg hover:bg-amber-50 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-300 inline-flex items-center justify-center gap-2"
                        >
                            Browse All products
                            <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;