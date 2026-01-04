import React from 'react';
import {
    Users,
    Award,
    Globe,
    Heart,
    Target,
    TrendingUp,
    Star,
    MapPin
} from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from 'react-router';

const AboutUs = () => {
    const stats = [
        { icon: <Users />, value: "50K+", label: "Active Foodies" },
        { icon: <Award />, value: "10K+", label: "products Posted" },
        { icon: <Globe />, value: "500+", label: "Cities Covered" },
        { icon: <Heart />, value: "4.8", label: "Avg. Rating" },
    ];

    const team = [
        {
            name: "MD Foyzullah",
            role: "Founder & CEO",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
            bio: "Former food critic with 10+ years experience"
        },
        {
            name: "David Park",
            role: "Head of Community",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            bio: "Passionate about connecting food lovers"
        },
        {
            name: "Maria Garcia",
            role: "Content Director",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            bio: "Ex-restaurant owner turned food blogger"
        },
        {
            name: "Alex Johnson",
            role: "Tech Lead",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            bio: "Building platforms for food enthusiasts"
        },
    ];

    const values = [
        {
            icon: <Heart className="text-red-500 dark:text-red-400" size={32} />,
            title: "Authenticity First",
            description: "We believe in honest, unbiased products from real food lovers."
        },
        {
            icon: <Target className="text-orange-500 dark:text-orange-400" size={32} />,
            title: "Community Driven",
            description: "Our platform grows through the passion of our foodie community."
        },
        {
            icon: <Globe className="text-blue-500 dark:text-blue-400" size={32} />,
            title: "Global Taste",
            description: "Celebrating diverse cuisines from street food to fine dining."
        },
        {
            icon: <TrendingUp className="text-green-500 dark:text-green-400" size={32} />,
            title: "Continuous Growth",
            description: "Always evolving to serve our foodie community better."
        },
    ];

    return (
        <div className='bg-white dark:bg-gray-900'>
            <Navbar />
            <div className="space-y-16 pt-[104px] m-6">
                {/* Mission Section */}
                <section className="text-center max-w-4xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 border border-slate-200 dark:border-gray-700">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                            At Foodies Zone, we're passionate about creating a global community where food lovers can discover,
                            share, and celebrate culinary experiences. We believe every meal tells a story, and every review helps
                            someone discover their next favorite dish.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                                    <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow border border-slate-200 dark:border-gray-700">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-linear-to-r from-amber-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p>
                                    Founded in 2023 by a group of passionate food lovers, Foodies Zone started as a small blog
                                    sharing restaurant recommendations among friends. What began as a hobby quickly grew into
                                    a vibrant community of thousands.
                                </p>
                                <p>
                                    Today, we're proud to be one of the fastest-growing food review platforms, helping food
                                    enthusiasts discover hidden gems and share their culinary journeys with the world.
                                </p>
                                <p>
                                    From street food stalls to Michelin-starred restaurants, we believe every dining experience
                                    deserves to be shared and celebrated.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-amber-600 dark:bg-amber-700 rounded-2xl p-6 text-white">
                                <div className="flex items-center mb-4">
                                    <Star className="fill-current mr-2" size={24} />
                                    <h3 className="text-2xl font-bold">Our Impact</h3>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <MapPin size={18} className="mr-3" />
                                        <span>Featured in 150+ food magazines</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Award size={18} className="mr-3" />
                                        <span>Winner of Best Food App 2024</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Users size={18} className="mr-3" />
                                        <span>Partnered with 2000+ restaurants</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Globe size={18} className="mr-3" />
                                        <span>Available in 50+ countries</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform border border-slate-200 dark:border-gray-700">
                                <div className="p-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-amber-100 dark:border-amber-900/30"
                                    />
                                    <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-1">{member.name}</h3>
                                    <p className="text-amber-600 dark:text-amber-500 text-center font-semibold mb-3">{member.role}</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-linear-to-r from-amber-600 to-red-600 dark:from-amber-700 dark:to-amber-800 rounded-2xl p-12 text-white mx-4">
                    <h2 className="text-3xl font-bold mb-4">Join Our Foodie Community</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Share your culinary adventures, discover new favorites, and connect with food lovers worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={'/join-community'} className="bg-white text-amber-600 dark:text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-100 transition">
                            Join Now
                        </Link>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-600 dark:hover:text-amber-700 transition">
                            Learn More
                        </button>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default AboutUs;