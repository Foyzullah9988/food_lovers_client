import Aos from 'aos';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa6';
import { Link, useLoaderData } from 'react-router';
import 'aos/dist/aos.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';





const ProductsDetails = () => {
    const data = useLoaderData()
    const { date, foodImage, foodName, location, rating, restaurantName, reviewText, reviewerName
    } = data;
    console.log(data);

    const dateObj = new Date(date)
    const year = dateObj.toLocaleDateString()
    const time = dateObj.toLocaleTimeString()
    // console.log(year, time);

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-1  mx-auto bg-center bg-cover w-full ' style={{ backgroundImage: "url('/details.jpg')" }}>
                <div className='container mx-auto  text-white bg-black/50 backdrop-blur-sm'>
                    <div className='p-4'>
                        <div className='flex flex-col  sm:flex-row gap-2 justify-evenly items-center'>
                            <div className=''>
                                <img src={foodImage} className='w-60 sm:w-80 rounded-xl' alt="" />
                            </div>
                            <div>
                                <div>
                                    <span>Name : </span>
                                    <span>{foodName}</span>
                                </div>
                                <div>
                                    <span>Restaurant Name : </span>
                                    <span>{restaurantName}</span>
                                </div>
                                <div>
                                    <span>Location : </span>
                                    <span>{location}</span>
                                </div>

                            </div>
                        </div>
                        <div className='w-full mx-auto'>
                            <h2 className='text-center my-4 text-3xl font-semibold'>Reviewed By</h2>
                            <div className='space-y-2 w-96 mx-auto'>
                                <div className='flex items-center gap-9'>
                                    <h2 className='text-2xl font-semibold'>{reviewerName}</h2>
                                </div>
                                <div className='flex items-center gap-9'>
                                    <div className='border  text-[#FFC107] w-12 p-1 rounded-full flex justify-center items-center gap-1'>
                                        <span className='mb-[3px] text-[#FFC107]'><FaStar /></span>
                                        <span>{rating}</span>
                                    </div>
                                    Out of 5
                                </div>
                                <p>{reviewText}</p>
                                <div>
                                    <p>{time}</p>
                                <p>{year}</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductsDetails;