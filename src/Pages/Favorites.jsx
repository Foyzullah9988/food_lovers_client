import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useLoaderData } from 'react-router';
import { FaHeart } from 'react-icons/fa6';
import ProductCard from '../Components/ProductCard';

const Favorites = () => {
    const data = useLoaderData();
    console.log(data);
    // <div>
    //                     <figure className=''>
    //                             <img src={d.foodImage} className='w-full h-52 rounded-t-xl object-cover' alt="" />
    //                         </figure>
    //                         <div className='flex-1  '>
    //                             <div className='card-title font-semibold text-lg flex justify-between'>
    //                                 <h2>{d.foodName}</h2>
    //                                 <div className=" ">
    //                                     <button
    //                                         // onClick={() => { handleFavorite(), setLiked(!liked) }}
    //                                         className="relative flex items-center justify-center w-12 h-12 rounded-lg focus:outline-none"
    //                                     >
    //                                         {/* ${liked ? 'scale-125 text-[#e72e91] fill-pink-500' : 'text-white fill-white'} */}
    //                                         <svg
    //                                             className={`w-7 h-7 transition-transform duration-200 
                                                    
    //                                                 `}
    //                                             xmlns="http://www.w3.org/2000/svg"
    //                                             viewBox="0 0 17.503 15.625"
    //                                         >
    //                                             <FaHeart title='Favorite' />
    //                                         </svg>

    //                                     </button>
    //                                 </div>
    //                             </div>
    //                             <span>{d.location}</span>
    //                             <span>{d.rating}</span>
    //                             <h3>{d.restaurantName}</h3>
    //                             <p>{d.reviewText}</p>
    //                             <h2>{d.reviewerName}</h2>
    //                         </div>
    //                         <div className="mt-auto flex justify-end">
    //                             <Link
    //                                 to={`/products-details/${d._id}`}
    //                                 className="bg-[#63A361] text-white px-4 py-2 rounded-md hover:bg-[#ff9d00] transition-colors"
    //                             >
    //                                 View Details
    //                             </Link>
    //                         </div>
    //                 </div>
    return (
        <div className='flex flex-col min-h-screen bg-amber-800'>
            <Navbar fixed={false} />
            <div className='container mx-auto flex-1 '>
                <div className='flex justify-center items-center gap-2'>
                    <h2>MY FAVORITES </h2>
                    <span ><FaHeart color='#e72e91' /></span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>
                    {
                        data.map(d => <ProductCard key={d._id} d={d} className='bg-white/50 rounded-xl flex flex-col '/>)
                    }
                    
                </div>
            </div>
            <div className='border border-black'>
                <Footer />
            </div>
        </div>
    );
};

export default Favorites;