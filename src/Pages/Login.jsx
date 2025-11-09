import React, { use, useRef, useState } from 'react';
import 'animate.css'
import { Link, useLocation, useNavigate } from 'react-router';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    const { setUser, login, loginGoogle } = use(AuthContext)
    const [show, setShow] = useState(false)
    const [error, setError] = useState('');
const emailRef = useRef()

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        login(email, password)
            .then(res => {
                setUser(res.user)
                toast.success('Signin successful');
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Invalid email or password')
                setError(err.code)
            })
    }
    const handleGoogleSignin = () => {
        loginGoogle()
            .then((res) => {
                setUser(res.user)
                toast.success('Google signin success')
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleForgetPassword=()=>{
        const email = emailRef.current.value;
      
      navigate('/auth/forgot',{state:{email}})
    }
    // console.log(user);
    return (
        <div>

            <div className=" mt-5  ">
                <div className="hero  ">
                    <div className=" space-y-2 ">
                        <div className="text-center ">

                        </div>
                        <div className="card bg-[#f2be00af]  w-full max-w-sm shrink-0 shadow-2xl">
                            <h1 className="text-5xl text-center px-2 pt-2 font-bold">Login now!</h1>

                            <form onSubmit={handleLogin} className="card-body  rounded-xl">
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input type="email" ref={emailRef} name='email' className="input" placeholder="Email" required />
                                    <div className='relative'>

                                        <label className="label">Password</label>
                                        <input name='password' type={show ? 'text' : "password"} className="input " placeholder="Password" required />
                                        <span onClick={() => setShow(!show)} className='absolute top-7 right-2 text-xl cursor-pointer'>
                                            {
                                                show ? <FaRegEye /> : <FaRegEyeSlash />
                                            }

                                            {/*  */}
                                        </span>
                                    </div>
                                    {
                                        error && <p className="text-red-400">Invalid email or password</p>
                                    }
                                    <div>
                                        









                                        <button  type='button '
                                        onClick={handleForgetPassword} className="link link-hover">  Forgot password?
                                        </button>
                                    </div>

                                    <button type='submit' className="btn btn-neutral mt-4">Login</button>
                                </fieldset>
                                <p className='text-center'>Don't have an account?<Link to={'/auth/register'} className='text-blue-500 hover:underline'>Register</Link></p>

                                <div className='flex justify-between items-center'>
                                    <hr className='w-5/12' />or<hr className='w-5/12' />
                                </div>
                                <button type='button' className='flex justify-center items-center btn'
                                    onClick={handleGoogleSignin}
                                >
                                    <span><FcGoogle /></span> <span>Continue With Google</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;