
import React, { useState } from 'react';
import { FaUsers, FaTrophy, FaUtensils, FaHeart, FaStar, FaComments, FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Navbar from '../Navbar';

const JoinCommunity = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedInterest, setSelectedInterest] = useState('All');

    const communityStats = [
        { icon: <FaUsers />, label: 'Active Members', value: '10K+', color: 'text-blue-500' },
        { icon: <FaTrophy />, label: 'Monthly Reviews', value: '25K+', color: 'text-yellow-500' },
        { icon: <FaUtensils />, label: 'Restaurants', value: '5K+', color: 'text-green-500' },
        { icon: <FaHeart />, label: 'Foodies', value: '50K+', color: 'text-red-500' },
    ];

    const interests = ['All', 'Fine Dining', 'Street Food', 'Vegetarian', 'Asian Cuisine', 'Desserts', 'Coffee & Tea', 'Home Cooking'];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            toast.success(`Welcome to Foodies Zone, ${name}! Check your email for confirmation.`);
            setName('');
            setEmail('');
            setLoading(false);
        }, 1500);
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div>
            <Navbar/>
            <section className="py-20 mt-16 px-4 bg-linear-to-br from-gray-50 to-emerald-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6">
                            <FaUsers className="text-lg" />
                            <span className="font-semibold">JOIN OUR FAMILY</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Join Our <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-green-600">Foodie Family</span>
                        </h2>

                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Connect with passionate food lovers, share authentic experiences, and discover hidden culinary gems together.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-100/50"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 bg-linear-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                                    <FaUsers className="text-white text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Become a Member</h3>
                                    <p className="text-gray-500">Join us in 30 seconds</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                            placeholder="you@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Food Interests
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {interests.map((interest) => (
                                            <button
                                                key={interest}
                                                type="button"
                                                onClick={() => setSelectedInterest(interest)}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedInterest === interest
                                                        ? 'bg-linear-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {interest}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                                        required
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600">
                                        I agree to receive updates, newsletters, and community announcements. I understand I can unsubscribe at any time.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-linear-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Joining...
                                        </>
                                    ) : (
                                        <>
                                            Join Community
                                            <FaUsers className="text-xl" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-center text-gray-500 text-sm">
                                    Already a member?{' '}
                                    <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                                        Sign in here
                                    </button>
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Column - Stats & Features */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-6">
                                {communityStats.map((stat, index) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="bg-white p-6 rounded-2xl shadow-lg shadow-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                    >
                                        <div className={`text-3xl mb-4 ${stat.color}`}>
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Features List */}
                            <div className="bg-linear-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-6">Why Join Us?</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: <FaStar />, text: 'Exclusive restaurant deals and early access' },
                                        { icon: <FaComments />, text: 'Private community discussions & meetups' },
                                        { icon: <FaTrophy />, text: 'Monthly foodie challenges with prizes' },
                                        { icon: <FaUtensils />, text: 'Curated food tours and tasting events' },
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                                {feature.icon}
                                            </div>
                                            <span className="font-medium">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">Follow us on social media</p>
                                <div className="flex justify-center gap-4">
                                    {[
                                        { icon: <FaInstagram />, label: 'Instagram', color: 'hover:bg-linear-to-r hover:from-pink-500 hover:to-purple-600' },
                                        { icon: <FaFacebookF />, label: 'Facebook', color: 'hover:bg-blue-600' },
                                        { icon: <FaTwitter />, label: 'Twitter', color: 'hover:bg-sky-500' },
                                        { icon: <FaYoutube />, label: 'YouTube', color: 'hover:bg-red-600' },
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href="#"
                                            className={`w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-700 text-xl ${social.color} hover:text-white hover:shadow-lg transition-all duration-300`}
                                            title={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JoinCommunity;