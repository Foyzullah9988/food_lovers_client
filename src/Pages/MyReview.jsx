import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { 
  FiMessageSquare, 
  FiCalendar, 
  FiUser, 
  FiPlusCircle, 
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight 
} from 'react-icons/fi';
import TableReviews from '../Components/TableReviews';

const MyReview = () => {
    const data = useLoaderData();
    const { user } = use(AuthContext);
    const filteredData = data.filter(d => d.email === user.email)
    const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))
    const [products, setproducts] = useState(sortedData);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    
    const handleDeleteForUi = (id) => {
        const remainReview = products.filter(r => r._id !== id)
        setproducts(remainReview)
        // Reset to first page if deleting items causes empty page
        if (currentPage > Math.ceil((products.length - 1) / itemsPerPage)) {
            setCurrentPage(Math.ceil((products.length - 1) / itemsPerPage) || 1);
        }
    }

    // Calculate pagination
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    // Pagination functions
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='min-h-screen bg-linear-to-br from-slate-50 via-white to-amber-50 dark:from-base-200 dark:via-base-200 dark:to-base-300 py-8 px-4'>
            <div className='container mx-auto max-w-6xl'>
                {/* Header Section */}
                <div className='text-center mb-10'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-amber-600 to-amber-500 rounded-full mb-4 shadow-lg'>
                        <FiMessageSquare className='w-8 h-8 text-white' />
                    </div>
                    <h2 className='md:text-5xl text-3xl font-bold bg-linear-to-r from-slate-900 to-amber-700 dark:from-white dark:to-amber-300 bg-clip-text text-transparent mb-3'>
                        My products
                    </h2>
                    <div className='inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-gray-800 rounded-full border border-amber-100 dark:border-gray-700'>
                        <span className='text-amber-600 dark:text-amber-400 font-semibold'>
                            {products.length} {products.length === 1 ? 'Review' : 'products'}
                        </span>
                        <span className='w-1.5 h-1.5 bg-amber-400 rounded-full'></span>
                        <span className='text-sm text-slate-600 dark:text-gray-400'>
                            {user.email}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-amber-500/5 dark:shadow-gray-900/30 overflow-hidden border border-slate-200 dark:border-gray-800 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10'>
                    {/* Table Header */}
                    <div className='px-6 py-4 bg-linear-to-r from-slate-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 border-b border-slate-200 dark:border-gray-800'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-3'>
                                <div className='p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-slate-100 dark:border-gray-700'>
                                    <FiInfo className='w-5 h-5 text-amber-500 dark:text-amber-400' />
                                </div>
                                <div>
                                    <h3 className='font-bold text-slate-800 dark:text-white'>Review Overview</h3>
                                    <p className='text-sm text-slate-600 dark:text-gray-400'>Manage all your products in one place</p>
                                </div>
                            </div>
                            {products.length > 0 && (
                                <Link 
                                    to={'/reviews/add-review'}
                                    className='inline-flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] border border-amber-400/20 dark:from-amber-950 dark:to-black/50'
                                >
                                    <FiPlusCircle className='w-5 h-5' />
                                    Add New Review
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className='bg-linear-to-r from-slate-100/50 to-amber-100/50 dark:from-gray-800/50 dark:to-gray-900/50 border-b border-slate-200 dark:border-gray-800'>
                                    <th className="py-5 px-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 flex items-center justify-center bg-amber-100 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                                                <span className="font-bold text-amber-600 dark:text-amber-400">#</span>
                                            </div>
                                            <span className="font-semibold text-slate-800 dark:text-white">Number</span>
                                        </div>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <FiUser className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                            <span className="font-semibold text-slate-800 dark:text-white">Name</span>
                                        </div>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <div className="flex items-center gap-2">
                                            <FiCalendar className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                                            <span className="font-semibold text-slate-800 dark:text-white">Date</span>
                                        </div>
                                    </th>
                                    <th className="py-5 px-6 text-left">
                                        <span className="font-semibold text-slate-800 dark:text-white">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-16 px-6">
                                            <div className="text-center max-w-md mx-auto">
                                                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-linear-to-br from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-800/20 rounded-full border border-amber-200 dark:border-amber-800/30">
                                                    <FiMessageSquare className="w-10 h-10 text-amber-500 dark:text-amber-400" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                                                    No products Yet
                                                </h3>
                                                <p className="text-slate-600 dark:text-gray-400 mb-8">
                                                    You haven't posted any products yet. Share your thoughts and experiences to help others!
                                                </p>
                                                <Link 
                                                    to={'/reviews/add-review'}
                                                    className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] group border border-amber-400/20 dark:from-amber-950 dark:to-black/50 dark:hover:to-amber-950 dark:hover:from-black"
                                                >
                                                    <FiPlusCircle className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                                                    Post Your First Review
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    currentProducts.map((userData, index) => (
                                        <TableReviews
                                            key={userData._id}
                                            userData={userData}
                                            index={indexOfFirstItem + index}
                                            handleDeleteForUi={handleDeleteForUi}
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Section */}
                    {products.length > itemsPerPage && (
                        <div className="px-6 py-4 bg-linear-to-r from-slate-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-900 border-t border-slate-200 dark:border-gray-800">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm text-slate-600 dark:text-gray-400">
                                    Showing <span className="font-semibold text-slate-800 dark:text-white">{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, products.length)}</span> of <span className="font-semibold text-slate-800 dark:text-white">{products.length}</span> products
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                    {/* First Page Button */}
                                    <button
                                        onClick={() => goToPage(1)}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg ${
                                            currentPage === 1 
                                            ? 'text-slate-400 cursor-not-allowed' 
                                            : 'text-amber-500 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/20'
                                        }`}
                                    >
                                        <FiChevronsLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    {/* Previous Page Button */}
                                    <button
                                        onClick={goToPrevPage}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg ${
                                            currentPage === 1 
                                            ? 'text-slate-400 cursor-not-allowed' 
                                            : 'text-amber-500 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/20'
                                        }`}
                                    >
                                        <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center space-x-1">
                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNumber = index + 1;
                                            // Show limited page numbers
                                            if (
                                                pageNumber === 1 ||
                                                pageNumber === totalPages ||
                                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() => goToPage(pageNumber)}
                                                        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                                            currentPage === pageNumber
                                                            ? 'bg-linear-to-r from-amber-600 to-amber-500 text-white shadow-md'
                                                            : 'text-slate-700 hover:bg-amber-100 dark:text-gray-300 dark:hover:bg-amber-900/20'
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            } else if (
                                                pageNumber === currentPage - 2 ||
                                                pageNumber === currentPage + 2
                                            ) {
                                                return (
                                                    <span key={pageNumber} className="text-slate-500 dark:text-gray-400 px-1">
                                                        ...
                                                    </span>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    {/* Next Page Button */}
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg ${
                                            currentPage === totalPages 
                                            ? 'text-slate-400 cursor-not-allowed' 
                                            : 'text-amber-500 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/20'
                                        }`}
                                    >
                                        <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    {/* Last Page Button */}
                                    <button
                                        onClick={() => goToPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg ${
                                            currentPage === totalPages 
                                            ? 'text-slate-400 cursor-not-allowed' 
                                            : 'text-amber-500 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/20'
                                        }`}
                                    >
                                        <FiChevronsRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>
                                </div>

                                {/* Page Info */}
                                <div className="text-sm text-slate-600 dark:text-gray-400">
                                    Page <span className="font-semibold text-slate-800 dark:text-white">{currentPage}</span> of <span className="font-semibold text-slate-800 dark:text-white">{totalPages}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Table Footer */}
                    {products.length > 0 && (
                        <div className="px-6 py-4 bg-linear-to-r from-slate-50/50 to-amber-50/50 dark:from-gray-900 dark:to-gray-900 border-t border-slate-200 dark:border-gray-800">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
                                <div className="text-slate-600 dark:text-gray-400">
                                    Total <span className="font-semibold text-slate-800 dark:text-white">{products.length}</span> products
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span>All products are up to date</span>
                                </div>
                                <div className="text-slate-600 dark:text-gray-400">
                                    Sorted by: <span className="font-semibold text-slate-800 dark:text-white">Latest First</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tips Section */}
                {products.length > 0 && (
                    <div className="mt-8 p-6 bg-linear-to-r from-amber-50 to-amber-50 dark:from-amber-900/10 dark:to-amber-800/10 rounded-xl border border-amber-100 dark:border-amber-800/30">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30">
                                <FiInfo className="w-6 h-6 text-amber-500 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-800 dark:text-white mb-2">Review Guidelines</h4>
                                <ul className="text-slate-600 dark:text-gray-400 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Be honest and objective in your products</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Include both pros and cons for balanced feedback</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Update your products if your experience changes over time</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-1">•</span>
                                        <span>Your products help others make informed decisions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReview;