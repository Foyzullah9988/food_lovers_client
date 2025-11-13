import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const UpdateReview = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext)
    // console.log(user);
    const data = useLoaderData()
    // console.log(data);

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const rating = form.rating.value;
        if (rating > 5) {
            toast.error('Rating should be 5 or less')
            return
        } else if (isNaN(rating)) {
            toast.error('Rating should be in number')
            return
        }


        const formData = {
            foodImage: form.foodImage.value,
            foodName: form.foodName.value,
            location: form.location.value,
            rating: rating,
            restaurantName: form.restaurantName.value,
            reviewText: form.comment.value,
        }

        fetch(`https://foodies-zone-eta.vercel.app/products/${data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                // console.log(data);
                toast.success('Review updated successfully')
                navigate('/products/my-review')

            }).catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className=''>

            <Navbar fixed={false} />

            <div className=''>
                <div className='  min-h-screen bg-center bg-cover w-full' style={{ backgroundImage: "url('/add.jpg')" }}>
                    <div className="hero container mx-auto ">
                        <div className="hero-content flex-col ">

                            <div className="card bg-black/50 backdrop-blur-sm w-[400px] sm:w-[500px] mx-auto shrink-0 shadow-2xl">
                                <div className="text-center ">
                                    <h1 className="text-2xl font-bold text-white mt-2 -mb-5">Update Your Review</h1>

                                </div>
                                <form onSubmit={handleReview} className="card-body">
                                    <fieldset className="fieldset">
                                        <label className="label text-white">Food Name</label>
                                        <input name='foodName' type="text" className="input w-full  text-black bg-white " defaultValue={data.foodName} placeholder="Name" required />
                                        <label className="label text-white">Food Image</label>
                                        <input name='foodImage' type="text" className="input w-full  text-black bg-white" defaultValue={data.foodImage} placeholder="Image URL" required />
                                        <label className="label text-white">Restaurant Name</label>
                                        <input name='restaurantName' type="text" className="input w-full  text-black bg-white" defaultValue={data.restaurantName} placeholder="Name of the Restaurant " required />
                                        <label className="label text-white">Location</label>
                                        <input name='location' type="text" className="input w-full  text-black bg-white" defaultValue={data.location} placeholder="Location of the Restaurant" required />
                                        <label className="label text-white">Star Rating</label>
                                        <input name='rating' type="text" className="input w-full  text-black bg-white" defaultValue={data.rating} placeholder="Rate your food out of 5" required />
                                        <label className="label text-white">Review Text</label>
                                        <textarea name='comment' type="text" cols={40} rows={5} className=" w-full  text-black bg-white  rounded-sm p-1" defaultValue={data.reviewText} placeholder="Write your comment" required />
                                        <div className="card-actions justify-end">
                                            <button className="btn bg-linear-to-r from-blue-600
                                            to-green-700 hover:from-green-700  hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition-all mt-4">Update Review</button>
                                        </div>

                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateReview;