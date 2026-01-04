import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash, FaArrowRight, FaUser, FaImage } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const navigate = useNavigate();
    const [nameErr, setNameErr] = useState('');
    const [show, setShow] = useState(false);
    const [cShow, setCShow] = useState(false);
    const { createUser, setUser, loading, updateUser, loginGoogle } = useContext(AuthContext);

    const handleRegister = (e) => {
        e.preventDefault();
        if (loading) return;
        
        const form = e.target;
        const name = form.name.value;
        const img = form.img.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password.length < 6) {
            toast.error('Password should be at least 6 characters');
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error('Password should have one lowercase letter');
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password should have one uppercase letter');
            return;
        } else if (confirmPassword !== password) {
            toast.error("Passwords don't match");
            return;
        }
        if (name.length < 4) {
            setNameErr('Name must be at least 4 characters');
            return;
        } else {
            setNameErr('');
        }

        createUser(email, password)
            .then(res => {
                const user = res.user;
                updateUser({
                    displayName: name,
                    photoURL: img
                }).then(() => {
                    setUser({
                        ...user,
                        displayName: name,
                        photoURL: img
                    });
                    toast.success('Registration Successful!');
                    navigate('/');
                }).catch(err => {
                    console.log(err);
                    setUser(user);
                });
            })
            .catch(err => {
                toast.error('This email is already registered');
                console.log(err.message);
            });
    };

    const handleGoogleSignin = () => {
        loginGoogle()
            .then((res) => {
                setUser(res.user);
                toast.success('Google sign in successful');
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className=" flex items-center justify-center p-4 sm:p-6 ">
            <div className="w-full max-w-md mx-auto ">
                <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden ">
                    <div className="p-6 md:p-8 lg:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                                Join Our Community
                            </h1>
                            <p className="text-slate-600 dark:text-gray-300">
                                Create an account to share your food experiences
                            </p>
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-slate-500 dark:text-gray-400">
                                            <FaUser className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>
                                    {nameErr && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{nameErr}</p>
                                    )}
                                </div>

                                {/* Image URL Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Profile Image URL (Optional)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-slate-500 dark:text-gray-400">
                                            <FaImage className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            name="img"
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                            placeholder="https://example.com/profile.jpg"
                                        />
                                    </div>
                                    
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="password"
                                            type={show ? 'text' : 'password'}
                                            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                            placeholder="Create a strong password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShow(!show)}
                                            className="absolute right-3 top-3 text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                                        >
                                            {show ? <FaRegEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
                                        Must be at least 6 characters with uppercase & lowercase letters
                                    </p>
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="confirmPassword"
                                            type={cShow ? 'text' : 'password'}
                                            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setCShow(!cShow)}
                                            className="absolute right-3 top-3 text-slate-500 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors"
                                        >
                                            {cShow ? <FaRegEye className="w-5 h-5" /> : <FaRegEyeSlash className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full group bg-linear-to-r from-amber-600 to-amber-700 dark:from-amber-950 dark:to-black/50 text-white py-3 px-6 rounded-lg font-bold text-base hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 h-px bg-slate-300 dark:bg-gray-700"></div>
                            <span className="px-4 text-slate-500 dark:text-gray-400 text-sm">Or continue with</span>
                            <div className="flex-1 h-px bg-slate-300 dark:bg-gray-700"></div>
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            onClick={handleGoogleSignin}
                            className="w-full group bg-white/90 dark:bg-gray-800/90 text-slate-800 dark:text-white py-3 px-6 rounded-lg font-medium border border-slate-300 dark:border-gray-600 hover:bg-slate-50 dark:hover:bg-gray-700 hover:border-slate-400 dark:hover:border-gray-500 transition-all duration-300 flex items-center justify-center gap-3"
                        >
                            <FcGoogle className="w-5 h-5" />
                            <span>Continue with Google</span>
                        </button>

                        {/* Login Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-600 dark:text-gray-300">
                                Already have an account?{' '}
                                <Link
                                    to="/auth/login"
                                    className="text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-bold transition-colors inline-flex items-center gap-1"
                                >
                                    Sign in now
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="px-6 py-4 bg-white/5 dark:bg-black/20 border-t border-white/10 dark:border-gray-800/50">
                        <p className="text-xs text-slate-500 dark:text-gray-400 text-center">
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;