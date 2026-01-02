import React, { useState } from 'react';
import {
    Shield,
    Lock,
    Eye,
    Download,
    Mail,
    CheckCircle,
    ExternalLink,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const PrivacyPolicy = () => {
    const [expandedSections, setExpandedSections] = useState([0]);

    const toggleSection = (index) => {
        setExpandedSections(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const sections = [
        {
            title: "Information We Collect",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>We collect information to provide better services to all our users. This includes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, and profile information you provide</li>
                        <li><strong>Review Content:</strong> Your restaurant reviews, ratings, photos, and comments</li>
                        <li><strong>Usage Data:</strong> How you interact with our platform, including search queries and page views</li>
                        <li><strong>Device Information:</strong> IP address, browser type, and device identifiers</li>
                        <li><strong>Location Data:</strong> Approximate location to show relevant restaurants (with your consent)</li>
                    </ul>
                </div>
            )
        },
        {
            title: "How We Use Your Information",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>Your information helps us:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our services</li>
                        <li>Personalize your experience and show relevant content</li>
                        <li>Process and display your reviews and ratings</li>
                        <li>Communicate with you about updates and offers</li>
                        <li>Ensure platform security and prevent fraud</li>
                        <li>Conduct research and analysis to improve our services</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Information Sharing",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>We do not sell your personal information. We may share information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>With Restaurants:</strong> Your reviews and ratings (not your contact information)</li>
                        <li><strong>With Service Providers:</strong> Trusted partners who help us operate our services</li>
                        <li><strong>For Legal Reasons:</strong> When required by law or to protect rights and safety</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger or acquisition</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Your Rights & Choices",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>You have control over your information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Access & Update:</strong> View and edit your profile and reviews anytime</li>
                        <li><strong>Delete Account:</strong> You can delete your account and associated data</li>
                        <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails in your settings</li>
                        <li><strong>Data Export:</strong> Request a copy of your data</li>
                        <li><strong>Cookies:</strong> Control cookies through your browser settings</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Data Security",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>We implement appropriate security measures to protect your information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Encryption of data in transit and at rest</li>
                        <li>Regular security assessments and monitoring</li>
                        <li>Access controls and authentication</li>
                        <li>Employee training on data protection</li>
                        <li>Incident response procedures</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Cookies & Tracking",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>We use cookies and similar technologies:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential Cookies:</strong> Required for site functionality</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
                        <li><strong>Preferences Cookies:</strong> Remember your settings and preferences</li>
                        <li><strong>Advertising Cookies:</strong> Show relevant restaurant recommendations</li>
                    </ul>
                    <p>You can control cookies through your browser settings.</p>
                </div>
            )
        },
        {
            title: "Children's Privacy",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>Our services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information.</p>
                </div>
            )
        },
        {
            title: "International Data Transfers",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>Your information may be transferred to and processed in countries other than your own. These countries may have data protection laws that are different from the laws of your country. We ensure appropriate safeguards are in place for such transfers.</p>
                </div>
            )
        },
        {
            title: "Changes to This Policy",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.</p>
                </div>
            )
        },
        {
            title: "Contact Us",
            content: (
                <div className="space-y-4 text-gray-600">
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="font-semibold">Foodies Zone Data Protection Officer</p>
                        <p className="flex items-center mt-2">
                            <Mail size={18} className="mr-2" />
                            lmdifoylzullahi@gmail.com
                        </p>
                        <p className="mt-2">Khulna , Bangladesh</p>
                    </div>
                </div>
            )
        }
    ];

    const keyPoints = [
        "We never sell your personal information",
        "You control your data and can delete it anytime",
        "Transparent about data collection and use",
        "Strong security measures in place",
        "GDPR and CCPA compliant"
    ];

    return (
        <div>
            <Navbar />
            <div className="bg-white grid mt-16 py-6 grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-6">
                                <Shield className="text-orange-500 mr-3" size={28} />
                                <h2 className="text-xl font-bold text-gray-800">Quick Links</h2>
                            </div>

                            <nav className="space-y-2">
                                {sections.map((section, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            const element = document.getElementById(`section-${index}`);
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="block w-full text-left p-3 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition text-gray-700"
                                    >
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-linear-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-4">Key Privacy Points</h3>
                            <ul className="space-y-3">
                                {keyPoints.map((point, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle size={18} className="mr-3 mt-0.5  shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-bold text-gray-800 mb-4">Last Updated</h3>
                            <p className="text-gray-600 mb-4">January 2, 2026</p>
                            <button className="flex items-center text-orange-500 font-semibold">
                                <Download size={18} className="mr-2" />
                                Download PDF Version
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        {/* Introduction */}
                        <div className="mb-12">
                            <div className="flex items-center mb-6">
                                <Lock className="text-orange-500 mr-3" size={32} />
                                <h2 className="text-3xl font-bold text-gray-800">Our Commitment to Your Privacy</h2>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                At Foodies Zone, we take your privacy seriously. This Privacy Policy explains how we collect,
                                use, disclose, and safeguard your information when you use our platform.
                            </p>
                            <p className="text-gray-600">
                                By using Foodies Zone, you agree to the collection and use of information in accordance with
                                this policy. We are committed to being transparent about our data practices and giving you
                                control over your personal information.
                            </p>
                        </div>

                        {/* Expandable Sections */}
                        <div className="space-y-4 text-gray-600">
                            {sections.map((section, index) => (
                                <div key={index} id={`section-${index}`} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => toggleSection(index)}
                                        className="w-full p-6 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-orange-100 text-orange-500 rounded-lg flex items-center justify-center mr-4">
                                                {index + 1}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                                        </div>
                                        {expandedSections.includes(index) ? (
                                            <ChevronUp size={24} className="text-gray-500" />
                                        ) : (
                                            <ChevronDown size={24} className="text-gray-500" />
                                        )}
                                    </button>

                                    {expandedSections.includes(index) && (
                                        <div className="p-6">
                                            {section.content}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Contact Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="bg-linear-to-r from-orange-50 to-red-50 rounded-xl p-8">
                                <div className="flex items-center mb-6">
                                    <Eye className="text-orange-500 mr-3" size={28} />
                                    <h3 className="text-2xl font-bold text-gray-800">Your Privacy Matters to Us</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-3">Data Protection Officer</h4>
                                        <p className="text-gray-600 mb-4">
                                            For privacy-related inquiries, contact our Data Protection Officer:
                                        </p>
                                        <div className="space-y-2">
                                            <p className="flex items-center">
                                                <Mail size={18} className="mr-3 text-gray-500" />
                                                privacy@foodieszone.com
                                            </p>
                                            <p>Response time: Within 48 hours</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-3">Additional Resources</h4>
                                        <div className="space-y-3">
                                            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                                                <ExternalLink size={18} className="mr-3" />
                                                Cookie Policy
                                            </a>
                                            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                                                <ExternalLink size={18} className="mr-3" />
                                                Terms of Service
                                            </a>
                                            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                                                <ExternalLink size={18} className="mr-3" />
                                                Community Guidelines
                                            </a>
                                            <a href="#" className="flex items-center text-orange-500 hover:text-orange-600 transition">
                                                <ExternalLink size={18} className="mr-3" />
                                                GDPR Compliance
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Policy Updates */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-start">
                                <CheckCircle className="text-green-500 mr-3 mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-800 mb-2">Policy Updates Notification</h4>
                                    <p className="text-gray-600 mb-4">
                                        We'll notify you of significant changes to this Privacy Policy via email or through
                                        notifications on our platform.
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                                            Update Preferences
                                        </button>
                                        <button className="text-orange-500 font-semibold hover:text-orange-600 transition">
                                            View Previous Versions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PrivacyPolicy;