import React from 'react';
import { useLoaderData } from 'react-router';
import ProductCard from '../Components/ProductCard';

const Products = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className=''>
           <div className="bg-black">
             All Foods
           </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4  border '>
                {
                    data.map(d => <ProductCard key={d._id} d={d} />)
                }
            </div>
        </div>
    );
};

export default Products;