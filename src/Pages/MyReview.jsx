import React, { use, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import TableReviews from '../Components/TableReviews';

const MyReview = () => {
    const data = useLoaderData();
    const { user } = use(AuthContext);
    // console.log(user);
    // console.log(data);
    const filteredData = data.filter(d => d.email === user.email)
    // console.log(filteredData);
    const [reviews,setReviews]=useState(filteredData);
    const handleDeleteForUi=(id)=>{
        const remainReview = reviews.filter(r=>r._id!==id)
        setReviews(remainReview)
    }

    return (
        <div className='container mx-auto'>

            <div className="overflow-x-auto">
                <table className="table">
                    
                    <thead>
                        <tr>
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
                        {reviews &&
                            reviews.map((userData, index) => <TableReviews 
                            key={userData._id} 
                            userData={userData} 
                            index={index}
                            handleDeleteForUi={handleDeleteForUi}/>
                            )}

                        <tr>

                        </tr>



                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default MyReview;