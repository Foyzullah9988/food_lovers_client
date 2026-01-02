import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiTarget, FiAward, FiClock, FiChevronRight } from 'react-icons/fi';

const Challenge = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/challenge.json');
                if (!response.ok) throw new Error('Failed to fetch challenges');
                const data = await response.json();
                setData(data);
                setError(null);
            } catch (err) {
                console.error(err.message);
                setError('Unable to load challenges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5E6D63] mb-4"></div>
                    <p className="text-[#6B7A72]">Loading challenges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-xl">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[#5E6D63] text-white rounded-lg hover:bg-[#4A5750] transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-[#6B7A72] mb-4">No challenges available at the moment.</p>
                    <Link 
                        to="/products" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5E6D63] text-white rounded-lg hover:bg-[#4A5750] transition-colors"
                    >
                        Browse Products
                        <FiChevronRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="md:text-5xl text-3xl font-bold mb-4 text-[#2C3E2F]">
                    Foodie Challenges
                </h1>
                <p className="text-[#6B7A72] max-w-2xl mx-auto">
                    Join exciting culinary challenges, complete tasty tasks, and earn amazing rewards!
                </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {data.map((d, index) => (
                    <div 
                        key={index}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#F0F0F0]"
                    >
                        <div className="p-6 flex flex-col h-full">
                            {/* Challenge Header */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-3 py-1 bg-[#F0F7EE] text-[#3C8C47] text-sm font-semibold rounded-full">
                                        Challenge #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1 text-[#8A9A8B]">
                                        <FiClock className="w-4 h-4" />
                                        <span className="text-sm">7 days</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-[#2C3E2F] mb-2 group-hover:text-[#3C8C47] transition-colors">
                                    {d.title}
                                </h3>
                            </div>

                            {/* Challenge Description */}
                            <p className="text-[#6B7A72] mb-6 grow leading-relaxed">
                                {d.description}
                            </p>

                            {/* Progress Bar (Optional - could be dynamic) */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-[#6B7A72] mb-1">
                                    <span>Progress</span>
                                    <span>0/{d.target}</span>
                                </div>
                                <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-[#E6BB50] to-[#FFA726] rounded-full transition-all duration-500"
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Stats and Reward */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <FiTarget className="w-5 h-5 text-[#5E6D63]" />
                                    <div>
                                        <p className="text-sm text-[#6B7A72]">Target</p>
                                        <p className="font-bold text-[#2C3E2F]">{d.target} items</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiAward className="w-5 h-5 text-[#FFA726]" />
                                    <div className="text-right">
                                        <p className="text-sm text-[#6B7A72]">Reward</p>
                                        <p className="font-bold text-[#3C8C47]">{d.reward}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                <Link 
                                    to="/products" 
                                    className="block w-full text-center group/btn"
                                >
                                    <button className="w-full py-3 px-6 bg-linear-to-r from-[#E6BB50] to-[#FFA726] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover/btn:scale-[1.02] flex items-center justify-center gap-2">
                                        Take Challenge
                                        <FiChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <p className="text-center text-sm text-[#8A9A8B] mt-3">
                                    {Math.ceil(d.target / 7)} items per day
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
                <p className="text-[#6B7A72] mb-4">
                    Need help getting started? 
                    <Link to="/challenge-guide" className="text-[#3C8C47] font-semibold ml-2 hover:underline">
                        View our challenge guide
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Challenge;