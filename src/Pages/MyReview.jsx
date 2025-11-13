import React, { use, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import TableReviews from '../Components/TableReviews';

const MyReview = () => {
    const data = useLoaderData();
    const { user } = use(AuthContext);
    // console.log(user);
    // console.log(data);
    const filteredData = data.filter(d => d.email === user.email)

    const sortedData = filteredData.sort((a, b) => new Date(b.date) - new Date(a.date))
    console.log(sortedData);
    const [reviews, setReviews] = useState(sortedData);
    const handleDeleteForUi = (id) => {
        const remainReview = reviews.filter(r => r._id !== id)
        setReviews(remainReview)
    }

    return (
        <div className='my-8 bg-[#F4F6F5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'>
            <div className='container mx-auto '>
                <h2 className='md:text-4xl text-2xl font-bold text-center mb-6  text-[#5E6D63]'>My Reviews ({reviews.length})</h2>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr className='text-black/50 shadow-[0_0px_6px_-1px_rgba(0,0,0,0.1)] '>
                                <th>
                                    <label>
                                        No
                                    </label>
                                </th>
                                <th>Name</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.length === 0
                                ? <tr>
                                    <td colSpan="4" className='text-center text-xl text-[#528563] font-bold space-y-2'><p>
                                        No Reviews Added Yet
                                    </p>
                                        <Link to={'/products/add-review'} className='bg-[#52796F] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#355E52] hover:text-[#F1F1F1] transition-colors'>Post a review</Link>
                                    </td>
                                    <td colSpan="4" className='text-center text-xl text-[#528563] font-bold'><div className=' flex justify-center items-center my-6'>
                                        
                                    </div></td>

                                </tr>
                                :
                                reviews.map((userData, index) => <TableReviews
                                    key={userData._id}
                                    userData={userData}
                                    index={index}
                                    handleDeleteForUi={handleDeleteForUi} />
                                )}

                            <tr>

                            </tr>



                        </tbody>

                    </table>
                </div>

            </div>
        </div>

    );
};

export default MyReview;