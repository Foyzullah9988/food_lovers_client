import React from 'react';

const TableReviews = ({ userData, index }) => {
    // console.log(userData);
    const dateObj = new Date(userData.date)
    const year = dateObj.toLocaleDateString()
    const time = dateObj.toLocaleTimeString()
    console.log({ year, time })

    return (
        <>
            <tr>

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
                    <button className="btn  btn-xs bg-linear-to-bl from-green-400 to-green-800">Edit</button>
                    <button className="btn  btn-xs bg-linear-to-bl from-red-400 to-red-800">Delete</button>
                </th>

            </tr>
        </>
    );
};

export default TableReviews;