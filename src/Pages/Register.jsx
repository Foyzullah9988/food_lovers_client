
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';


const Register = () => {
    const navigate = useNavigate()
    const [nameErr, setNameErr] = useState('')
    const [show, setShow] = useState(false)
    const [cShow, setCShow] = useState(false)
    const { createUser, setUser, loading, updateUser, loginGoogle } = useContext(AuthContext)
    const handleRegister = (e) => {
        e.preventDefault();
        if (loading) return;
        const form = e.target;
        const name = form.name.value;
        const img = form.img.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        // console.log(name, img, email, password);

        if (password.length < 6) {
            toast.error('Password should be at least 6 digits')
            return
        } else if (!/[a-z]/.test(password)) {

            toast.error('Password should have one small letter')
            return
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password should have one capital letter')
            return
        }
        else if (confirmPassword !== password) {
            toast.error("Password and confirm password aren't same")
            return
        }
        if (name.length < 4) {
            setNameErr('Name must be 5 character or higher')
            return
        } else {
            setNameErr('')

        }

        createUser(email, password)
            .then(res => {
                const user = res.user;
                updateUser({
                    displayName: name,
                    photoURL: img
                }).then(() => {

                    // console.log(res);
                    setUser({
                        ...user, displayName: name,
                        photoURL: img
                    });
                    toast.success('Register Successful.')
                    navigate('/')
                }).catch(err => {
                    console.log(err);
                    setUser(user)
                })

            })
            .catch(err => {
                toast.error('The gmail is already taken');
                console.log(err.message);

            })
    }
    const handleGoogleSignin = () => {
        loginGoogle()
            .then((res) => {
                setUser(res.user)
                toast.success('Google signin success')
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className=" my-5  ">
                <div className="hero  ">
                    <div className=" space-y-2 ">

                        <div className=" bg-black/50 backdrop-blur-sm w-full shrink-0 shadow-2xl rounded-xl">
                            <h1 className="md:text-4xl text-2xl text-center -mb-3  px-2 pt-2  font-bold">Register now!</h1>


                            <form onSubmit={handleRegister} className="card-body rounded-xl ">
                                <fieldset className="fieldset">
                                    <label className="label">Name</label>
                                    <input type="text" name='name' className="input text-black  bg-white" placeholder="Name"  required />
                                    {
                                        nameErr && <p className="text-red-400">{nameErr}</p>
                                    }
                                    <label className="label ">Image URL</label>
                                    <input type="text" name='img' className="input text-black  bg-white" placeholder="Image URL" required />
                                    <label className="label">Email</label>
                                    <input type="email" name='email' className="input text-black  bg-white" placeholder="Email" required />
                                    <div className='relative'>

                                        <label className="label">Password</label>
                                        <input name='password' type={show ? 'text' : "password"} className="input text-black  bg-white" placeholder="Password" required />

                                        <span onClick={() => setShow(!show)} className='absolute top-7 right-2 text-xl cursor-pointer'>
                                            {
                                                show ? <FaRegEye color='black'/> : <FaRegEyeSlash color='black'/>
                                            }

                                            {/*  */}
                                        </span>
                                    </div>
                                    <div className='relative'>

                                        <label className="label">Confirm Password</label>
                                        <input name='confirmPassword' type={cShow ? 'text' : "password"} className="input text-black  bg-white" placeholder="Confirm Password" required />

                                        <span onClick={() => setCShow(!cShow)} className='absolute top-7 right-2 text-xl cursor-pointer'>
                                            {
                                                cShow ? <FaRegEye color='black'/> : <FaRegEyeSlash color='black'/>
                                            }

                                            {/*  */}
                                        </span>
                                    </div>
                                    <div>

                                    </div>
                                    <button type='submit' className="w-full btn bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all">Register</button>
                                </fieldset>
                                <p className='text-center'>Already have an account?<Link to={'/auth/login'} className='text-blue-500 hover:underline'>Login</Link></p>
                                <div className='flex justify-between items-center'>
                                    <hr className='w-5/12' />or<hr className='w-5/12' />
                                </div>
                                <button type='button' className='flex justify-center items-center btn bg-white/50'
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

export default Register;