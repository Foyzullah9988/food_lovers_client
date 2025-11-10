import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const AddReview = () => {
    const { user } = use(AuthContext)
    console.log(user);

    const handleReview = (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = {
            date: new Date(),

            email: user.email,
            foodImage: form.foodImage.value,
            foodName: form.foodName.value,
            location: form.location.value,
            rating: form.rating.value,
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
            }).catch(err => {
                console.log(err.message);
            })
        e.target.reset()
    }

    return (
        <div className='text-black'>
            <div className="hero  ">
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-2xl font-bold">Review here</h1>

                    </div>
                    <div className="card bg-base-100 w-[500px]  shrink-0 shadow-2xl">
                        <form onSubmit={handleReview} className="card-body">
                            <fieldset className="fieldset">
                                <label className="label">Food Name</label>
                                <input name='foodName' type="text" className="input w-full " placeholder="Name" />
                                <label className="label">Food Image</label>
                                <input name='foodImage' type="text" className="input w-full" placeholder="Image URL" />
                                <label className="label">Restaurant Name</label>
                                <input name='restaurantName' type="text" className="input w-full" placeholder="Name of the Restaurant " />
                                <label className="label">Location</label>
                                <input name='location' type="text" className="input w-full" placeholder="Location of the Restaurant" />
                                <label className="label">Star Rating</label>
                                <input name='rating' type="text" className="input w-full" placeholder="Rate your food out of 5" />
                                <label className="label">Review Text</label>
                                <textarea name='comment' type="text" cols={40} rows={5} className=" w-full border rounded-sm p-1" placeholder="Write your comment" />
                                <div className="card-actions justify-end">
                                    <button className="btn btn-neutral mt-4">Review</button>
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