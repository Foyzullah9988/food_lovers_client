import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaCalendar, FaClock } from 'react-icons/fa';

const TableReviews = ({ userData, index, handleDeleteForUi }) => {
    const dateObj = new Date(userData.date);
    const year = dateObj.toLocaleDateString();
    const time = dateObj.toLocaleTimeString();

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d97706", // amber-600
            cancelButtonColor: "#475569", // slate-600
            confirmButtonText: "Yes, delete it!",
            background: '#f8fafc', // slate-50
            color: '#1e293b', // slate-800
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://foodies-zone-eta.vercel.app/reviews/${userData._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(data => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your review has been deleted.",
                            icon: "success",
                            background: '#f8fafc',
                            color: '#1e293b',
                        });
                        handleDeleteForUi(userData._id);
                    }).catch(err => {
                        console.log(err.message);
                    });
            }
        });
    }

    return (
        <tr className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group">
            <td className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center">
                    <span className="text-lg font-bold bg-linear-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                        {index + 1}
                    </span>
                </div>
            </td>
            
            <td className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-amber-500/20 dark:border-amber-500/30 group-hover:border-amber-500/40 transition-all duration-300">
                            <img
                                src={userData.foodImage}
                                alt={userData.foodName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-linear-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                            <span className="text-[8px] sm:text-xs font-bold text-white">
                                {userData.rating || "5"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white truncate">
                            {userData.foodName}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 truncate">
                            {userData.restaurantName}
                        </p>
                        
                    </div>
                </div>
            </td>
            
            <td className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                        <FaCalendar className="text-amber-500 text-xs" />
                        <span className="text-xs sm:text-sm font-medium">{year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400">
                        <FaClock className="text-amber-500 text-xs" />
                        <span className="text-xs sm:text-sm">{time}</span>
                    </div>
                </div>
            </td>
            
            <td className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link 
                        to={`/update-products/${userData._id}`}
                        className="group/edit flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 dark:from-amber-700 dark:to-amber-800 dark:hover:from-amber-600 dark:hover:to-amber-700"
                    >
                        <FaEdit className="text-xs sm:text-sm" />
                        <span>Edit</span>
                    </Link>
                    
                    <button 
                        onClick={handleDelete}
                        className="group/delete flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-linear-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 dark:from-gray-700 dark:to-gray-800 dark:hover:from-gray-600 dark:hover:to-gray-700"
                    >
                        <FaTrash className="text-xs sm:text-sm" />
                        <span>Delete</span>
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default TableReviews;