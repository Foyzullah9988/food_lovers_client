import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const AddReview = () => {
    const { user } = use(AuthContext)
    // console.log(user);

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;
        const rating = form.rating.value;
        if(rating>5){
            toast.error('Rating should be 5 or less')
            return
        }

        const formData = {
            date: new Date(),

            email: user.email,
            foodImage: form.foodImage.value,
            foodName: form.foodName.value,
            location: form.location.value,
            rating: rating,
            restaurantName: form.restaurantName.value,
            reviewText: form.comment.value,
            reviewerName: user.displayName,
        }

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                 toast.success('Review added successfully')
            }).catch(err => {
                console.log(err.message);
            })
        // e.target.reset()
    }

    return (
        <div className='text-black  min-h-screen bg-center bg-cover w-full' style={{backgroundImage:"url('/add.jpg')"}}>
            <div className="hero container mx-auto ">
                <div className="hero-content flex-col ">

                    <div className="card bg-black/50 backdrop-blur-sm w-[400px] sm:w-[500px] mx-auto shrink-0 shadow-2xl">
                        <div className="text-center ">
                            <h1 className="text-2xl font-bold text-white mt-2 -mb-5">Review here</h1>

                        </div>
                        <form onSubmit={handleReview} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label text-white">Food Name</label>
                                <input name='foodName' type="text" className="input w-full  text-black bg-white " placeholder="Name" required />
                                <label className="label text-white">Food Image</label>
                                <input name='foodImage' type="text" className="input w-full  text-black bg-white" placeholder="Image URL" required />
                                <label className="label text-white">Restaurant Name</label>
                                <input name='restaurantName' type="text" className="input w-full  text-black bg-white" placeholder="Name of the Restaurant " required />
                                <label className="label text-white">Location</label>
                                <input name='location' type="text" className="input w-full  text-black bg-white" placeholder="Location of the Restaurant" required />
                                <label className="label text-white">Star Rating</label>
                                <input name='rating' type="text" className="input w-full  text-black bg-white" placeholder="Rate your food out of 5" required />
                                <label className="label text-white">Review Text</label>
                                <textarea name='comment' type="text" cols={40} rows={5} className=" w-full  text-black bg-white  rounded-sm p-1" placeholder="Write your comment" required />
                                <div className="card-actions justify-end">
                                    <button className="btn bg-linear-to-r from-yellow-500 to-amber-600 hover:from-blue-600 hover:to-green-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all mt-4">Add Review</button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;