import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    FiBookOpen,
    FiCheckCircle,
    FiAward,
    FiUsers,
    FiClock,
    FiShoppingBag,
    FiTrendingUp,
    FiHelpCircle,
    FiChevronDown,
    FiChevronUp,
    FiArrowLeft,
    FiStar,
    FiTarget,
    FiBarChart2
} from 'react-icons/fi';
import { MdFoodBank, MdLocalOffer, MdOutlineSecurity } from 'react-icons/md';

const ChallengeGuide = () => {
    const [activeFAQ, setActiveFAQ] = useState(null);

    const faqItems = [
        {
            id: 1,
            question: "How do I start a challenge?",
            answer: "Simply click 'Take Challenge' on any challenge card, then add the required products to your cart and complete your purchase within the challenge period."
        },
        {
            id: 2,
            question: "How long do challenges last?",
            answer: "Most challenges run for 7 days from the moment you start them. You can check the remaining time on your challenge dashboard."
        },
        {
            id: 3,
            question: "Can I participate in multiple challenges at once?",
            answer: "Yes! You can join up to 3 challenges simultaneously. We recommend starting with one if you're new."
        },
        {
            id: 4,
            question: "How do I track my progress?",
            answer: "Your progress updates automatically when you make qualifying purchases. You can monitor it in real-time on your dashboard."
        },
        {
            id: 5,
            question: "What happens if I don't complete a challenge?",
            answer: "You can retry most challenges after they expire. Some special limited-time challenges may not be available again."
        },
        {
            id: 6,
            question: "Are challenge rewards transferable?",
            answer: "Rewards are credited to your account and can be used in future purchases. They cannot be transferred to other accounts."
        }
    ];

    const steps = [
        {
            icon: <FiTarget className="w-8 h-8" />,
            title: "Choose Your Challenge",
            description: "Browse available challenges and pick one that matches your interests and budget.",
            color: "from-blue-500 to-cyan-400"
        },
        {
            icon: <FiShoppingBag className="w-8 h-8" />,
            title: "Shop Required Products",
            description: "Add the specified products to your cart. Challenge products are clearly marked.",
            color: "from-green-500 to-emerald-400"
        },
        {
            icon: <FiCheckCircle className="w-8 h-8" />,
            title: "Complete Purchase",
            description: "Check out within the challenge timeframe. Your progress updates immediately.",
            color: "from-purple-500 to-pink-400"
        },
        {
            icon: <FiAward className="w-8 h-8" />,
            title: "Claim Your Reward",
            description: "Once you reach the target, your reward will be automatically added to your account.",
            color: "from-amber-500 to-yellow-400"
        }
    ];

    const benefits = [
        {
            icon: <FiStar className="w-6 h-6" />,
            title: "Exclusive Discounts",
            description: "Earn discounts only available through challenge completion"
        },
        {
            icon: <MdFoodBank className="w-6 h-6" />,
            title: "Discover New Foods",
            description: "Try products you might not have considered otherwise"
        },
        {
            icon: <FiTrendingUp className="w-6 h-6" />,
            title: "Level Up Faster",
            description: "Challenges accelerate your Foodie rewards progression"
        },
        {
            icon: <FiUsers className="w-6 h-6" />,
            title: "Community Badges",
            description: "Show off your achievements with special profile badges"
        }
    ];

    const toggleFAQ = (id) => {
        setActiveFAQ(activeFAQ === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F9F7F3] to-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5E6D63] to-[#3C8C47] text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                    <Link
                        to="/challenges"
                        className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back to Challenges
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <FiBookOpen className="w-12 h-12" />
                        <h1 className="text-4xl md:text-5xl font-bold">
                            Challenge Guide
                        </h1>
                    </div>

                    <p className="text-xl text-white/90 max-w-3xl">
                        Everything you need to know about Foodie Challenges - from getting started to claiming your rewards.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <FiUsers className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2C3E2F]">10,000+</h3>
                                <p className="text-[#6B7A72]">Active Participants</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <FiAward className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2C3E2F]">85%</h3>
                                <p className="text-[#6B7A72]">Completion Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <MdLocalOffer className="w-8 h-8 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2C3E2F]">$250K+</h3>
                                <p className="text-[#6B7A72]">Total Rewards Given</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#2C3E2F] mb-8 text-center">
                        How It Works in 4 Simple Steps
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Connection line */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2 translate-x-1/2 z-0"></div>
                                )}

                                <div className="relative bg-white p-6 rounded-2xl shadow-lg text-center z-10 hover:shadow-xl transition-shadow">
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white mb-4`}>
                                        {step.icon}
                                    </div>
                                    <div className="flex items-center justify-center mb-2">
                                        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#F0F7EE] text-[#3C8C47] rounded-full font-bold mr-2">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-xl font-bold text-[#2C3E2F]">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[#6B7A72]">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-[#2C3E2F] mb-8 text-center">
                        Why Join Challenges?
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#F0F7EE] rounded-xl">
                                        <div className="text-[#3C8C47]">
                                            {benefit.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#2C3E2F] mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-[#6B7A72]">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tips & Best Practices */}
                <section className="mb-16">
                    <div className="bg-gradient-to-r from-[#F3EFEA] to-[#F0F7EE] rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-[#2C3E2F] mb-6">
                            <FiBarChart2 className="inline mr-3" />
                            Pro Tips for Success
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FiCheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-[#2C3E2F] mb-1">Plan Your Shopping</h4>
                                        <p className="text-[#6B7A72]">Check challenge requirements before shopping to maximize efficiency.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FiCheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-[#2C3E2F] mb-1">Start Small</h4>
                                        <p className="text-[#6B7A72">Begin with lower-target challenges to understand how they work.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <FiCheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-[#2C3E2F] mb-1">Set Reminders</h4>
                                        <p className="text-[#6B7A72]">Mark challenge end dates to ensure you complete them on time.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FiCheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-[#2C3E2F] mb-1">Combine Challenges</h4>
                                        <p className="text-[#6B7A72]">Look for overlapping requirements to complete multiple challenges faster.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                    <h2 className="text-3xl font-bold text-[#2C3E2F] mb-8 text-center">
                        <FiHelpCircle className="inline mr-3" />
                        Frequently Asked Questions
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        {faqItems.map((item) => (
                            <div key={item.id} className="mb-4">
                                <button
                                    onClick={() => toggleFAQ(item.id)}
                                    className="w-full text-left bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex justify-between items-center"
                                >
                                    <span className="text-lg font-semibold text-[#2C3E2F] pr-4">
                                        {item.question}
                                    </span>
                                    {activeFAQ === item.id ? (
                                        <FiChevronUp className="w-6 h-6 text-[#5E6D63] flex-shrink-0" />
                                    ) : (
                                        <FiChevronDown className="w-6 h-6 text-[#5E6D63] flex-shrink-0" />
                                    )}
                                </button>

                                {activeFAQ === item.id && (
                                    <div className="mt-2 bg-[#F9F7F3] p-6 rounded-xl border border-[#F0F0F0]">
                                        <p className="text-[#6B7A72] leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Security & Trust */}
                <section className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <MdOutlineSecurity className="w-10 h-10 text-[#3C8C47]" />
                        <h3 className="text-2xl font-bold text-[#2C3E2F]">Safe & Secure</h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#3C8C47] mb-2">100%</div>
                            <p className="text-[#6B7A72]">Secure Transactions</p>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#3C8C47] mb-2">24/7</div>
                            <p className="text-[#6B7A72]">Support Available</p>
                        </div>

                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#3C8C47] mb-2">No Risk</div>
                            <p className="text-[#6B7A72]">Cancel Anytime</p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-gradient-to-r from-[#5E6D63] to-[#3C8C47] rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Start Your First Challenge?</h2>
                        <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                            Join thousands of foodies who are already earning rewards and discovering new favorites.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/challenges"
                                className="px-8 py-3 bg-white text-[#3C8C47] font-bold rounded-xl hover:bg-gray-100 transition-colors text-center"
                            >
                                Browse Challenges
                            </Link>

                            <Link
                                to="/products"
                                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center"
                            >
                                Shop Products
                            </Link>
                        </div>

                        <p className="mt-6 text-white/80 text-sm">
                            Need personalized help? Contact our support team at support@foodie.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengeGuide;