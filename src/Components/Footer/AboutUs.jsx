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
        { icon: <Award />, value: "10K+", label: "Reviews Posted" },
        { icon: <Globe />, value: "500+", label: "Cities Covered" },
        { icon: <Heart />, value: "4.8", label: "Avg. Rating" },
    ];

    const team = [
        {
            name: "Sarah Chen",
            role: "Founder & CEO",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
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
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
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
            icon: <Heart className="text-red-500" size={32} />,
            title: "Authenticity First",
            description: "We believe in honest, unbiased reviews from real food lovers."
        },
        {
            icon: <Target className="text-orange-500" size={32} />,
            title: "Community Driven",
            description: "Our platform grows through the passion of our foodie community."
        },
        {
            icon: <Globe className="text-blue-500" size={32} />,
            title: "Global Taste",
            description: "Celebrating diverse cuisines from street food to fine dining."
        },
        {
            icon: <TrendingUp className="text-green-500" size={32} />,
            title: "Continuous Growth",
            description: "Always evolving to serve our foodie community better."
        },
    ];

    return (
        <div className='bg-white'>
            <Navbar />
            <div className="space-y-16 mt-20 mb-6">
                {/* Mission Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            At Foodies Zone, we're passionate about creating a global community where food lovers can discover,
                            share, and celebrate culinary experiences. We believe every meal tells a story, and every review helps
                            someone discover their next favorite dish.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                                    <div className="text-gray-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Story Section */}
                <section className="bg-linear-to-r from-orange-50 to-red-50 rounded-2xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600">
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
                            <div className="bg-orange-700 rounded-2xl p-6 text-white">
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
                <section>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-[1.02] transition-transform">
                                <div className="p-6">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-100"
                                    />
                                    <h3 className="text-xl font-bold text-center text-gray-800 mb-1">{member.name}</h3>
                                    <p className="text-orange-500 text-center font-semibold mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-center text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-linear-to-r from-orange-700 to-red-700 rounded-2xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Join Our Foodie Community</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Share your culinary adventures, discover new favorites, and connect with food lovers worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={'/join-community'} className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                            Join Now
                        </Link>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition">
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