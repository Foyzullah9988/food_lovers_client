import React, { useEffect, useState, useMemo } from 'react';
import ProductCard from '../Components/ProductCard';
import Spinner from '../Components/Spinner';
import { FaSearch, FaFilter, FaSort, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Products = () => {
    const [products, setproducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState('newest');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterRating, setFilterRating] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    
    const productsPerPage = 9;

    // Sort options with labels
    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'highest-rated', label: 'Highest Rated' },
        { value: 'lowest-rated', label: 'Lowest Rated' },
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
    ];

    // Extract unique categories from products
    const categories = useMemo(() => {
        const allCategories = products.map(review => review.category);
        return ['all', ...new Set(allCategories.filter(Boolean))];
    }, [products]);

    // Filter, sort, and paginate products
    const processedproducts = useMemo(() => {
        let filtered = products.filter(review => {
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
    }, [products, search, sortBy, filterCategory, filterRating]);

    // Pagination logic
    const totalPages = Math.ceil(processedproducts.length / productsPerPage);
    const indexOfLastReview = currentPage * productsPerPage;
    const indexOfFirstReview = indexOfLastReview - productsPerPage;
    const currentproducts = processedproducts.slice(indexOfFirstReview, indexOfLastReview);

    // Get current sort label
    const currentSortLabel = sortOptions.find(option => option.value === sortBy)?.label || 'Sort by';

    useEffect(() => {
        const fetchproducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://foodies-zone-eta.vercel.app/reviews/search?key=${search}`);
                const data = await res.json();
                setproducts(data);
                setCurrentPage(1); // Reset to first page on new search
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        // Debounce search
        const timer = setTimeout(() => {
            fetchproducts();
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
        <div className='container mx-auto pb-8 px-4 bg-white dark:bg-gray-900 min-h-screen'>
            {/* Header */}
            <div className="pt-6 mb-6">
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-5'>
                    Food <span className='bg-linear-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent'>Reviews</span>
                </h2>
                
                {/* Search Bar */}
                <div className='max-w-2xl mx-auto mb-6'>
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-gray-500" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search food products by name or category..."
                            className="w-full text-slate-600 dark:text-gray-300 bg-white dark:bg-gray-800 pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Filters & Sort Toggle */}
                <div className="flex   justify-between sm:items-center mb-6 gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-gray-900/50"
                        >
                            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        
                        <div className="text-sm text-slate-600 dark:text-gray-300">
                            <span className="font-semibold text-amber-500 dark:text-amber-400">{processedproducts.length}</span> products found
                            {filterCategory !== 'all' && ` in ${filterCategory}`}
                            {filterRating > 0 && ` with ${filterRating}+ stars`}
                        </div>
                    </div>

                    {/* DaisyUI Sort Dropdown */}
                    <div className="dropdown dropdown-end">
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-outline border-slate-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50 dark:hover:bg-gray-800 text-slate-600 dark:text-gray-300 gap-2"
                            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                        >
                            <FaSort />
                            {currentSortLabel}
                        </div>
                        <ul 
                            tabIndex={0} 
                            className="dropdown-content menu bg-white dark:bg-gray-800 rounded-box z-50 w-52 p-2 shadow-lg border border-slate-200 dark:border-gray-700"
                        >
                            {sortOptions.map((option) => (
                                <li key={option.value}>
                                    <a 
                                        className={`text-slate-700 dark:text-gray-300 hover:bg-amber-300 dark:hover:bg-amber-600 hover:text-black dark:hover:text-white ${
                                            sortBy === option.value ? 'bg-amber-500 dark:bg-amber-600 text-white font-medium' : ''
                                        }`}
                                        onClick={() => {
                                            setSortBy(option.value);
                                            setSortDropdownOpen(false);
                                        }}
                                    >
                                        {option.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-linear-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl mb-6 animate-fadeIn border border-slate-200 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-gray-200">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setFilterCategory(category)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                                filterCategory === category
                                                    ? 'bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white shadow-md'
                                                    : 'bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-600 hover:shadow-sm'
                                            }`}
                                        >
                                            {category === 'all' ? 'All Categories' : category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                    Minimum Rating
                                </label>
                                <div className="flex items-center gap-4">
                                    {[0, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            onClick={() => setFilterRating(rating)}
                                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 ${
                                                filterRating === rating
                                                    ? 'bg-linear-to-r from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-600 shadow-sm'
                                                    : 'bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-600 hover:shadow-sm'
                                            }`}
                                        >
                                            <FaStar className="text-amber-500 dark:text-amber-400" />
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
                        <p className="mt-4 text-slate-600 dark:text-gray-300">Loading delicious products...</p>
                    </div>
                </div>
            ) : (
                <>
                    {/* products Grid */}
                    {currentproducts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🍕</div>
                            <h3 className="text-2xl font-bold text-slate-700 dark:text-gray-200 mb-2">No products found</h3>
                            <p className="text-slate-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 dark:hover:from-amber-700 dark:hover:to-amber-800 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                            {currentproducts.map((review) => (
                                <ProductCard key={review._id} d={review} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
                            <div className="text-sm text-slate-600 dark:text-gray-400">
                                Showing {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, processedproducts.length)} of {processedproducts.length} products
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-slate-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 transition-colors"
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
                                            className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                                                currentPage === pageNum
                                                    ? 'bg-linear-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 text-white shadow-md'
                                                    : 'border border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:shadow-sm'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                
                                {totalPages > 5 && (
                                    <span className="px-2 text-slate-500 dark:text-gray-500">...</span>
                                )}
                                
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-slate-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-gray-800 text-slate-700 dark:text-gray-300 transition-colors"
                                >
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Products;