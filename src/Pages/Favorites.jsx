
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link, useLoaderData } from 'react-router';
import { FaHeart, FaStar } from 'react-icons/fa6';
import ProductCard from '../Components/ProductCard';
import toast from 'react-hot-toast';
import { use, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const Favorites = () => {
    const data = useLoaderData();
    const [favorite, setFavorite] = useState(data);

    const { user } = use(AuthContext)
    // console.log(user);

    const userFav = favorite.filter(dat => dat.favorite_by === user.email)
    console.log(favorite);


    const handleDeleteForUi = (id) => {
        const remainfavorite = favorite.filter(f => f._id !== id)
        setFavorite(remainfavorite)
    }

    const handleDelete = (id) => {

        fetch(`https://foodies-zone-eta.vercel.app/favorites/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    handleDeleteForUi(id)
                    toast.success('Removed from favorite')
                }
                // console.log(data);

            }).catch(err => {
                console.log(err.message);

            })

    }

    return (

        <div className='flex flex-col min-h-screen  bg-[#E8EDE5]'>
            <Navbar fixed={false} />

            <div className='container mx-auto flex-1 my-8'>
                <div className='flex justify-center items-center gap-2 mb-6 '>
                    <h2 className='md:text-4xl text-2xl font-bold text-center  text-[#5E6D63]'>My Favorites ({userFav.length}) </h2>
                    
                </div>
                {
                    userFav.length === 0 &&
                    <div>
                        <h2 className=' text-xl font-bold text-center my-8 text-[#528563]'>No Favorites Added Yet</h2>
                        
                        <div className=' flex justify-center items-center my-6'>
                            <Link to={'/products'} className='bg-[#52796F] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#355E52] hover:text-[#F1F1F1] transition-colors'>Add</Link>
                        </div>
                    </div>


                }
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 '>

                    {
                        userFav.map(d => (<div key={d._id} d={d} className='bg-white/50 rounded-xl '>

                            <div className="rounded-xl bg-[#E8EDE5] shadow-sm shadow-[#8D9776] flex flex-col overflow-hidden h-full">





                                <figure>
                                    <img
                                        className="w-full h-52 object-cover "
                                        src={d.foodImage}
                                        alt={d.foodName}
                                    />
                                </figure>


                                <div className="flex flex-col flex-1 h-full p-4">
                                    <div className=' flex-1'>
                                        <div className="flex gap-4 justify-between items-center mb-2">
                                            <h2 className="card-title font-semibold text-lg text-[#2B2B2B]">{d.foodName}</h2>
                                            <div className="flex justify-end ">
                                                <button
                                                    onClick={() => handleDelete(d._id)}
                                                    className="relative flex items-center justify-center w-12 h-12 rounded-lg focus:outline-none"
                                                >

                                                    <FaHeart title='Unfavorite'
                                                        className='w-7 h-7 transition-transform duration-200  scale-125 text-[#E63946] fill-pink-500' />


                                                </button>
                                            </div>

                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <div className='flex flex-col'>
                                                <span className="text-sm text-[#6B7A72]">{d.restaurantName}</span>
                                                <span className="text-sm text-[#6B7A72]">{d.location}</span>
                                            </div>
                                            <div className="border text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1">
                                                <span className="mb-[3px] text-[#FFC107]"><FaStar /></span>

                                                <span>{d.rating}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <h2 className="font-semibold text-[15px] text-[#5E6D63]">{d.reviewerName}</h2>
                                            </div>
                                            <p className="text-sm text-[#4B4B4B]">{d.reviewText}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex justify-end">
                                        <Link
                                            to={`/products-details/${d.foodId}`}
                                            className="bg-[#52796F] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#355E52] hover:text-[#F1F1F1] transition-colors"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>))
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