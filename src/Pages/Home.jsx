import { useEffect } from 'react';
import { Link, useLoaderData } from 'react-router';
import Hero from '../Components/Hero';
import ProductCard from '../Components/ProductCard';
import Challenge from '../Components/Challenge';
import Guides from '../Components/Guides';
import Book from '../Components/Book';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
    const data = useLoaderData();
    const sortedData = [...data].sort((a, b) => Number(b.rating) - Number(a.rating));
    const slicedData = sortedData.slice(0, 6);

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <Hero data={data} />

            {/* Top Rated Reviews Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
                {/* Section Header */}
                <div 
                    className="text-center mb-12"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-linear-to-r from-[#426933] to-[#cbffb7] rounded-full"></div>
                        <span className="text-[#5c9147] font-semibold uppercase tracking-wider text-sm">
                            Community Favorites
                        </span>
                        <div className="w-12 h-1 bg-linear-to-r from-[#cbffb7] to-[#426933] rounded-full"></div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Top Rated <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5c9147] to-[#426933]">Reviews</span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Discover exquisite flavors, taste authentic dishes, and share genuine experiences
                        with our food-loving community.
                    </p>
                </div>

                {/* Products Grid */}
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

                {/* Show All Button */}
                <div 
                    className="text-center"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-3 bg-linear-to-r from-[#426733] text-white  rounded-lg  hover:bg-[#2f4a24]  shadow-sm hover:shadow-lg to-[#4e7a3d]   text-center py-4 px-8  font-semibold  text-lg hover:shadow-emerald-200 hover:scale-105 transition-all duration-300 hover:from-green-800 hover:to-emerald-800 "
                    >
                        Explore All Reviews
                        <svg 
                            className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
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

            {/* CTA Section */}
            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div 
                    className="relative overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 to-emerald-900 p-12 text-center"
                    data-aos="zoom-in"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070')] opacity-10 bg-cover"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-4xl font-bold text-white mb-6">
                            Ready to Share Your Food Journey?
                        </h3>
                        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of food enthusiasts sharing their authentic dining experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/add-review"
                                className="bg-white text-emerald-900 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 hover:scale-105 transition-all duration-300"
                            >
                                Share Your Review
                            </Link>
                            <Link
                                to="/community"
                                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300"
                            >
                                Join Community
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;