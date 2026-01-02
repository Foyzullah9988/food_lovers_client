import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../Components/ProductCard';
import Spinner from '../Components/Spinner';
import { FaSearch, FaFilter, FaSort, FaStar, FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Products = () => {
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterRating, setFilterRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    
    const reviewsPerPage = 9;

    // Extract unique categories from reviews
    const categories = useMemo(() => {
        const allCategories = reviews.map(review => review.category);
        return ['all', ...new Set(allCategories.filter(Boolean))];
    }, [reviews]);

    // Filter, sort, and paginate reviews
    const processedReviews = useMemo(() => {
        let filtered = reviews.filter(review => {
            // Search filter
            const matchesSearch = !search || 
                review.foodName?.toLowerCase().includes(search.toLowerCase()) ||
                review.category?.toLowerCase().includes(search.toLowerCase());
            
            // Category filter
            const matchesCategory = filterCategory === 'all' || review.category === filterCategory;
            
            // Rating filter
            const matchesRating = filterRating === 0 || review.rating >= filterRating;
            
            return matchesSearch && matchesCategory && matchesRating;
        });

        // Sorting
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
                case 'oldest':
                    return new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt);
                case 'highest-rated':
                    return (b.rating || 0) - (a.rating || 0);
                case 'lowest-rated':
                    return (a.rating || 0) - (b.rating || 0);
                case 'name-asc':
                    return (a.foodName || '').localeCompare(b.foodName || '');
                case 'name-desc':
                    return (b.foodName || '').localeCompare(a.foodName || '');
                default:
                    return 0;
            }
        });
    }, [reviews, search, sortBy, filterCategory, filterRating]);

    // Pagination logic
    const totalPages = Math.ceil(processedReviews.length / reviewsPerPage);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = processedReviews.slice(indexOfFirstReview, indexOfLastReview);

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://foodies-zone-eta.vercel.app/products/search?key=${search}`);
                const data = await res.json();
                setReviews(data);
                setCurrentPage(1); // Reset to first page on new search
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        // Debounce search
        const timer = setTimeout(() => {
            fetchReviews();
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clear all filters
    const clearFilters = () => {
        setFilterCategory('all');
        setFilterRating(0);
        setSortBy('newest');
        setSearch('');
    };

    return (
        <div className='container mx-auto pb-8 px-4'>
            {/* Header */}
            <div className="pt-6 mb-6">
                <h2 className='md:text-4xl text-2xl text-center font-bold mb-4 text-[#426733]'>
                    Food Reviews
                </h2>
                
                {/* Search Bar */}
                <div className='max-w-2xl mx-auto mb-6'>
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search food reviews by name or category..."
                            className="w-full text-gray-600 pl-12 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#426733] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filters & Sort Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#426733] text-white rounded-lg hover:bg-[#2f4a24] transition-colors"
                        >
                            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        
                        <div className="text-sm text-gray-600">
                            <span className="font-semibold text-[#426733]">{processedReviews.length}</span> reviews found
                            {filterCategory !== 'all' && ` in ${filterCategory}`}
                            {filterRating > 0 && ` with ${filterRating}+ stars`}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none pl-10 pr-8 py-2 border border-gray-200 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#426733] bg-white"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="highest-rated">Highest Rated</option>
                            <option value="lowest-rated">Lowest Rated</option>
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                        </select>
                        <FaSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-gray-50 p-6 rounded-xl mb-6 animate-fadeIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-[#426733] hover:text-[#2f4a24] font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setFilterCategory(category)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                                filterCategory === category
                                                    ? 'bg-[#426733] text-white'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            {category === 'all' ? 'All Categories' : category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Minimum Rating
                                </label>
                                <div className="flex items-center gap-4">
                                    {[0, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setFilterRating(rating)}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                                                filterRating === rating
                                                    ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            <FaStar className="text-amber-500" />
                                            <span>{rating === 0 ? 'Any' : `${rating}+`}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <Spinner />
                        <p className="mt-4 text-gray-600">Loading delicious reviews...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* Reviews Grid */}
                    {currentReviews.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🍕</div>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No reviews found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-[#426733] text-white rounded-lg hover:bg-[#2f4a24] transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                            {currentReviews.map((review) => (
                                <ProductCard key={review._id} d={review} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
                            <div className="text-sm text-gray-600">
                                Showing {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, processedReviews.length)} of {processedReviews.length} reviews
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-black"
                                >
                                    <FaArrowLeft />
                                </button>
                                
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (currentPage <= 3) {
                                        pageNum = i + 1;
                                    } else if (currentPage >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = currentPage - 2 + i;
                                    }
                                    
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(pageNum)}
                                            className={`w-10 h-10 rounded-lg font-medium ${
                                                currentPage === pageNum
                                                    ? 'bg-[#426733] text-white'
                                                    : 'border border-gray-300 text-black hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                {totalPages > 5 && (
                                    <span className="px-2">...</span>
                                )}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-black"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
            
            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Products;