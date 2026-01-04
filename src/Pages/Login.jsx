import React, { use, useRef, useState } from 'react';
import 'animate.css';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaRegEye, FaRegEyeSlash, FaArrowRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser, login, loginGoogle } = use(AuthContext);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const emailRef = useRef();
    const passwordRef = useRef();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        login(email, password)
            .then(res => {
                setUser(res.user);
                toast.success('Sign in successful');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Invalid email or password');
                setError(err.code);
            });
    };

    const handleAutoLogin = () => {
        // Set email and password values
        emailRef.current.value = 'md@foyzullah.com';
        passwordRef.current.value = 'AZazaz1';
        
        // Trigger login
        login('md@foyzullah.com', 'AZazaz1')
            .then(res => {
                setUser(res.user);
                toast.success('Auto login successful!');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Auto login failed');
                setError(err.code);
            });
    };

    const handleGoogleSignin = () => {
        loginGoogle()
            .then((res) => {
                setUser(res.user);
                toast.success('Google sign in successful');
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-6 md:p-8 lg:p-10">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-300">
                                Sign in to continue your food journey
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        name="email"
                                        className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            ref={passwordRef}
                                            name="password"
                                            type={show ? 'text' : 'password'}
                                            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-slate-300 dark:border-gray-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
                                            placeholder="Enter your password"
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
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                        <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                                            Invalid email or password
                                        </p>
                                    </div>
                                )}

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <button
                                        type="button"
                                        className="text-sm text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition-colors"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full group bg-gradient-to-r from-amber-600 to-amber-700 dark:from-amber-950 dark:to-black/50 text-white py-3 px-6 rounded-lg font-bold text-base hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Sign In
                                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Auto Login Button - New Button Added */}
                            <button
                                type="button"
                                onClick={handleAutoLogin}
                                className="w-full group bg-gradient-to-r from-green-600 to-green-700 dark:from-green-950 dark:to-black/50 text-white py-3 px-6 rounded-lg font-bold text-base hover:shadow-xl hover:shadow-green-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Auto Login (Test Account)
                                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 h-px bg-slate-300 dark:bg-gray-700"></div>
                            <span className="px-4 text-gray-400 text-sm">Or continue with</span>
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

                        {/* Register Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-300">
                                Don't have an account?{' '}
                                <Link
                                    to="/auth/register"
                                    className="text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 font-bold transition-colors inline-flex items-center gap-1"
                                >
                                    Sign up now
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="px-6 py-4 bg-white/5 dark:bg-black/20 border-t border-white/10 dark:border-gray-800/50">
                        <p className="text-xs text-slate-500 dark:text-gray-400 text-center">
                            By signing in, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;