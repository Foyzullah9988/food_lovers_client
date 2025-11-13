import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import Spinner from '../Components/Spinner';

const Products = () => {
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    console.log(reviews);
    const sortedReviews = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://foodies-zone-eta.vercel.app/products/search?key=${search}`);
                const data = await res.json();
                setReviews(data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };

        fetchReviews();
    }, [search]);
    console.log(search);

    return (
        <div className='container mx-auto pb-4'>
            <div className="pt-6 mb-4">
                <h2 className='md:text-4xl text-2xl text-center font-bold mb-2 text-[#426733]'>All Reviews</h2>

                <div className='flex justify-center items-center flex-col'>
                    <label  className="input bg-white text-black">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            defaultValue={search}
                            onKeyUp={(e) => setSearch(e.target.value)}
                            type="search"
                            placeholder="Search by food name"
                        />
                    </label>
                    <p className='text-md text-center font-bold mb-2 text-[#1e4a63]'>
                        ({reviews.length}) reviews found
                    </p>
                </div>
            </div>

            {loading ? (
                <div className='text-center text-xl font-bold text-[#528563]'><Spinner /></div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {reviews.length === 0 ? (
                        <p className='text-center text-xl font-bold text-[#528563]'>No reviews found</p>
                    ) : (
                        sortedReviews.map((d) => <ProductCard key={d._id} d={d} />)
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;
