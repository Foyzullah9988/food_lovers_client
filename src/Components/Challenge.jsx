import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { FiTarget, FiAward, FiClock, FiChevronRight } from 'react-icons/fi';
import { Target } from 'lucide-react';

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
                const jsonData = await response.json();
                setData(jsonData);
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
            <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600 mb-4"></div>
                    <p className="text-slate-600 dark:text-gray-300">Loading challenges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center max-w-md mx-auto p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="min-h-[400px] flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-center">
                    <p className="text-slate-600 dark:text-gray-300 mb-4">No challenges available at the moment.</p>
                    <Link 
                        to="/reviews" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Browse products
                        <FiChevronRight />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <section className="pb-12 px-4 md:pb-8 max-w-7xl mx-auto ">
            <div className="text-start mb-6">
                <h1 className="  flex  items-center    gap-2 dark:text-white text-2xl sm:text-3xl  md:text-4xl font-bold text-slate-900  mb-3 md:mb-4">
                    Foodie <span className='text-amber-600 dark:text-amber-500 text-2xl sm:text-3xl md:text-4xl font-bold '>Challenges</span>
                    <Target className='text-amber-700 dark:text-amber-600' size={28} />
                </h1>
                <p className="text-slate-600 dark:text-gray-300 ">
                    Join exciting culinary challenges, complete tasty tasks, and earn amazing rewards!
                </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                {data.map((d, index) => (
                    <div 
                        key={index}
                        className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-gray-700"
                    >
                        <div className="p-6 flex flex-col h-full">
                            {/* Challenge Header */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-semibold rounded-full">
                                        Challenge #{index + 1}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-500 dark:text-gray-400">
                                        <FiClock className="w-4 h-4" />
                                        <span className="text-sm">7 days</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                                    {d.title}
                                </h3>
                            </div>

                            {/* Challenge Description */}
                            <p className="text-slate-600 dark:text-gray-300 mb-6 grow leading-relaxed">
                                {d.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400 mb-1">
                                    <span>Progress</span>
                                    <span>0/{d.target}</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Stats and Reward */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <FiTarget className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                                    <div>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">Target</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{d.target} items</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiAward className="w-5 h-5 text-amber-500" />
                                    <div className="text-right">
                                        <p className="text-sm text-slate-600 dark:text-gray-400">Reward</p>
                                        <p className="font-bold text-amber-600 dark:text-amber-500">{d.reward}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="mt-auto">
                                <Link 
                                    to="/reviews" 
                                    className="block w-full text-center group/btn"
                                >
                                    <button className="w-full py-3 px-6 bg-linear-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover/btn:scale-[1.02] flex items-center justify-center gap-2 dark:shadow-gray-900/50 dark:from-amber-950  dark:to-black">
                                        Take Challenge
                                        <FiChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                                <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-3">
                                    {Math.ceil(d.target / 7)} items per day
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                    Need help getting started? 
                    <Link to="/challenge-guide" className="text-amber-600 dark:text-amber-800 font-semibold ml-2 hover:underline ">
                        View our challenge guide
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Challenge;