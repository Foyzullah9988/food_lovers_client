import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaEdit, FaArrowRight } from 'react-icons/fa';

const UpdateReview = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext)
    const data = useLoaderData()

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const rating = form.rating.value;
        if (rating > 5) {
            toast.error('Rating should be 5 or less')
            return
        } else if (isNaN(rating)) {
            toast.error('Rating should be in number')
            return
        }

        const formData = {
            foodImage: form.foodImage.value,
            foodName: form.foodName.value,
            location: form.location.value,
            rating: rating,
            restaurantName: form.restaurantName.value,
            reviewText: form.comment.value,
        }

        fetch(`https://foodies-zone-eta.vercel.app/reviews/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                toast.success('Review updated successfully')
                navigate('/reviews/my-review')
            }).catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div>
            <Navbar fixed={false} />
            <div className='min-h-screen bg-cover bg-center bg-fixed relative' style={{ backgroundImage: "url('/add.jpg')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80 dark:from-gray-900/90 dark:via-gray-900/85 dark:to-gray-900/90"></div>
                
                <div className="relative z-10 container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10" data-aos="fade-up">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm rounded-full mb-6 border border-amber-500/30">
                                <FaEdit className="w-10 h-10 text-amber-300" />
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Update Your <span className="bg-linear-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">Review</span>
                            </h1>
                            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                                Refine your culinary experience to help others better
                            </p>
                        </div>

                        {/* Glass Form Card */}
                        <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
                            {/* Form Header */}
                            <div className="bg-linear-to-r from-amber-600/90 to-amber-500/90 backdrop-blur-sm px-6 py-8 text-center border-b border-amber-400/30">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">Edit Your Review</h2>
                                <p className="text-amber-100 mt-2">Update and improve your dining experience</p>
                            </div>

                            <form onSubmit={handleReview} className="p-6 md:p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-6">
                                        {/* Food Name */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Food Name <span className="text-amber-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    name='foodName' 
                                                    type="text" 
                                                    defaultValue={data.foodName}
                                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300" 
                                                    placeholder="Enter food name" 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        {/* Restaurant Name */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Restaurant Name <span className="text-amber-400">*</span>
                                            </label>
                                            <input 
                                                name='restaurantName' 
                                                type="text" 
                                                defaultValue={data.restaurantName}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300" 
                                                placeholder="Enter restaurant name" 
                                                required 
                                            />
                                        </div>

                                        {/* Food Image */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Food Image URL <span className="text-amber-400">*</span>
                                            </label>
                                            <input 
                                                name='foodImage' 
                                                type="text" 
                                                defaultValue={data.foodImage}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300" 
                                                placeholder="Enter image URL" 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-6">
                                        {/* Location */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Location <span className="text-amber-400">*</span>
                                            </label>
                                            <input 
                                                name='location' 
                                                type="text" 
                                                defaultValue={data.location}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300" 
                                                placeholder="Enter restaurant location" 
                                                required 
                                            />
                                        </div>

                                        {/* Star Rating */}
                                        <div>
                                            <label className="block text-white font-medium mb-2">
                                                Star Rating (1-5) <span className="text-amber-400">*</span>
                                            </label>
                                            <input 
                                                name='rating' 
                                                type="text" 
                                                defaultValue={data.rating}
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300" 
                                                placeholder="Rate from 1 to 5" 
                                                required 
                                            />
                                            <p className="text-sm text-slate-300 mt-2">Please enter a number between 1 and 5</p>
                                        </div>

                                        {/* User Info */}
                                        <div className="bg-linear-to-r from-amber-600/20 to-amber-500/20 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                                            <p className="text-amber-200 font-medium mb-1">Updating as:</p>
                                            <p className="text-white text-lg font-bold">{user?.displayName}</p>
                                            <p className="text-slate-300 text-sm">Original review: {new Date(data.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Text - Full Width */}
                                <div className="mt-8">
                                    <label className="block text-white font-medium mb-2">
                                        Review Text <span className="text-amber-400">*</span>
                                    </label>
                                    <textarea 
                                        name='comment' 
                                        rows={5} 
                                        defaultValue={data.reviewText}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 backdrop-blur-sm transition-all duration-300 resize-none" 
                                        placeholder="Update your detailed experience, thoughts, and recommendations..." 
                                        required 
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-10 text-center">
                                    <button className="group inline-flex items-center justify-center gap-3 bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-amber-400/30 backdrop-blur-sm">
                                        Update Review
                                        <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <p className="text-slate-300 text-sm mt-4">
                                        Your updated review will replace the previous version
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Tips Section */}
                        <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="text-amber-400">📝</span> Update Guidelines
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-linear-to-br from-amber-600/20 to-amber-500/10 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                                    <h4 className="text-amber-300 font-bold mb-2">Be Accurate</h4>
                                    <p className="text-slate-300 text-sm">Ensure all information reflects your latest experience</p>
                                </div>
                                <div className="bg-linear-to-br from-amber-600/20 to-amber-500/10 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                                    <h4 className="text-amber-300 font-bold mb-2">Add New Insights</h4>
                                    <p className="text-slate-300 text-sm">Include any additional thoughts or observations</p>
                                </div>
                                <div className="bg-linear-to-br from-amber-600/20 to-amber-500/10 backdrop-blur-sm rounded-xl p-4 border border-amber-500/20">
                                    <h4 className="text-amber-300 font-bold mb-2">Maintain Honesty</h4>
                                    <p className="text-slate-300 text-sm">Keep your review truthful and helpful to others</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateReview;