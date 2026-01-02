import React, { useState } from 'react';
import {
    Briefcase,
    MapPin,
    DollarSign,
    Clock,
    Users,
    Zap,
    Award,
    TrendingUp,
    CheckCircle,
    ExternalLink,
    Filter
} from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Jobs = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const jobCategories = [
        { id: 'all', label: 'All Jobs', count: 12 },
        { id: 'tech', label: 'Technology', count: 5 },
        { id: 'marketing', label: 'Marketing', count: 3 },
        { id: 'content', label: 'Content', count: 2 },
        { id: 'support', label: 'Support', count: 2 },
    ];

    const benefits = [
        { icon: <DollarSign />, title: "Competitive Salary", description: "Industry-leading compensation" },
        { icon: <Clock />, title: "Flexible Hours", description: "Work-life balance matters" },
        { icon: <Users />, title: "Great Team", description: "Collaborative environment" },
        { icon: <Zap />, title: "Fast Growth", description: "Rapid career advancement" },
        { icon: <Award />, title: "Learning Budget", description: "$2,000 annual learning" },
        { icon: <TrendingUp />, title: "Stock Options", description: "Share in our success" },
    ];

    const jobs = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            department: "Technology",
            type: "Full-time",
            location: "Remote",
            salary: "$120K - $150K",
            experience: "5+ years",
            description: "Build amazing user experiences for food lovers worldwide.",
            tags: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
            featured: true
        },
        {
            id: 2,
            title: "Content Marketing Manager",
            department: "Marketing",
            type: "Full-time",
            location: "New York, NY",
            salary: "$90K - $110K",
            experience: "3+ years",
            description: "Create compelling content about food and culinary experiences.",
            tags: ["Content Strategy", "SEO", "Social Media", "Copywriting"],
            featured: false
        },
        {
            id: 3,
            title: "Food Editor",
            department: "Content",
            type: "Full-time",
            location: "Remote",
            salary: "$80K - $95K",
            experience: "4+ years",
            description: "Curate and edit food reviews from our global community.",
            tags: ["Editing", "Food Writing", "Community", "Content"],
            featured: true
        },
        {
            id: 4,
            title: "UX/UI Designer",
            department: "Design",
            type: "Full-time",
            location: "San Francisco, CA",
            salary: "$110K - $130K",
            experience: "4+ years",
            description: "Design beautiful interfaces for our foodie community.",
            tags: ["Figma", "User Research", "Prototyping", "UI/UX"],
            featured: false
        },
        {
            id: 5,
            title: "Customer Success Manager",
            department: "Support",
            type: "Full-time",
            location: "Remote",
            salary: "$85K - $100K",
            experience: "3+ years",
            description: "Help restaurants succeed on our platform.",
            tags: ["Customer Service", "Restaurants", "Onboarding", "Support"],
            featured: false
        },
        {
            id: 6,
            title: "Data Analyst",
            department: "Technology",
            type: "Full-time",
            location: "Remote",
            salary: "$95K - $115K",
            experience: "3+ years",
            description: "Analyze food trends and user behavior.",
            tags: ["SQL", "Python", "Analytics", "Data Visualization"],
            featured: true
        },
    ];

    const filteredJobs = jobs.filter(job => {
        const matchesCategory = selectedCategory === 'all' ||
            job.department.toLowerCase().includes(selectedCategory);
        const matchesSearch = searchTerm === '' ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <Navbar/>
            <div className="space-y-16 mt-16 bg-white py-6">
                {/* Hero Section */}
                <section className="text-center max-w-4xl mx-auto">
                    <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white">
                        <Briefcase size={48} className="mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Build the Future of Food Discovery</h2>
                        <p className="text-xl opacity-90 mb-6">
                            We're looking for passionate people to help food lovers everywhere discover amazing culinary experiences.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="bg-white/20 rounded-full px-6 py-2">🏆 Best Places to Work 2024</div>
                            <div className="bg-white/20 rounded-full px-6 py-2">🌍 100% Remote Friendly</div>
                            <div className="bg-white/20 rounded-full px-6 py-2">💼 Competitive Benefits</div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Work With Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="bg-orange-100 text-orange-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Jobs Filter Section */}
                <section>
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Open Positions</h2>
                                <p className="text-gray-600">{filteredJobs.length} positions available</p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search jobs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full md:w-64 px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                                    />
                                    <Filter className="absolute left-3 top-3.5 text-gray-400" size={20} />
                                </div>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {jobCategories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2 rounded-full transition ${selectedCategory === category.id
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {category.label} ({category.count})
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Jobs List */}
                    <div className="space-y-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map(job => (
                                <div key={job.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:border-orange-300 transition-all">
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                                                    {job.featured && (
                                                        <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                                    <div className="flex items-center text-gray-600">
                                                        <Briefcase size={16} className="mr-2" />
                                                        {job.department}
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <MapPin size={16} className="mr-2" />
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <DollarSign size={16} className="mr-2" />
                                                        {job.salary}
                                                    </div>
                                                    <div className="flex items-center text-gray-600">
                                                        <Clock size={16} className="mr-2" />
                                                        {job.experience}
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mb-4">{job.description}</p>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.tags.map((tag, index) => (
                                                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 min-w-[180px]">
                                                <button className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center">
                                                    Apply Now
                                                    <ExternalLink size={18} className="ml-2" />
                                                </button>
                                                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition">
                                                    Save Job
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                                <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
                                <h3 className="text-xl font-bold text-gray-700 mb-2">No jobs found</h3>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Application Process */}
                <section className="bg-linear-to-r from-orange-50 to-red-50 rounded-2xl p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Hiring Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Apply", description: "Submit your application" },
                            { step: "2", title: "Screening", description: "Initial phone/video call" },
                            { step: "3", title: "Interview", description: "Meet the team" },
                            { step: "4", title: "Offer", description: "Welcome aboard!" },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default Jobs;