import React from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const TableReviews = ({ userData, index,handleDeleteForUi }) => {
    // console.log(userData._id);
    const dateObj = new Date(userData.date)
    const year = dateObj.toLocaleDateString()
    const time = dateObj.toLocaleTimeString()
    console.log({ year, time })

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${userData._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                handleDeleteForUi(userData._id)
                    }).catch(err => {
                        console.log(err.message);
                    })
               

                
            }
        });
    }

    return (
        <>
            <tr className='text-black'>

                <th>
                    <label>
                        {index + 1}
                    </label>
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12">
                                <img
                                    src={userData.foodImage}
                                    alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{userData.foodName}</div>
                            <div className="text-sm opacity-50">{userData.restaurantName}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='flex flex-col'>
                        <span>{year}</span>
                        <hr />
                        <span>{time}</span>
                    </div>

                </td>

                <th>
                    <Link to={`/update-products/${userData._id}`} className="btn  btn-xs bg-linear-to-bl from-green-400 to-green-800">Edit</Link>
                    <button onClick={handleDelete} className="btn  btn-xs bg-linear-to-bl from-red-400 to-red-800">Delete</button>
                </th>

            </tr>
        </>
    );
};

export default TableReviews;