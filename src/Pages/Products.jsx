import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../Components/ProductCard';

const Products = () => {
    const data = useLoaderData();
    console.log(data);

    // const dateObj = new Date(date)
    // const year = dateObj.toLocaleDateString()
    // const time = dateObj.toLocaleTimeString()
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date))

    // console.log(year, time);

    return (
        <div className=''>
            <div className="bg-black">
                All Reviews
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4  border '>
                {
                    sortedData.map(d => <ProductCard key={d._id} d={d} />)
                }
            </div>
        </div>
    );
};

export default Products;