import Hero from '../Components/Hero';
import ProductCard from '../Components/ProductCard';
import { Link, useLoaderData } from 'react-router';
import Aos from 'aos';
import Challenge from '../Components/Challenge';
import Guides from '../Components/Guides';
import Book from '../Components/Book';

const Home = () => {
    const data = useLoaderData();
    const sortedData = data.sort((a, b) => Number(b.rating) - Number(a.rating))
    const slicedData = sortedData.slice(0, 6)

    return (
        <div>
            <Hero data={data} />
            <div className='mb-6'>
                <h2 className='md:text-4xl text-2xl font-bold text-center   text-[#5E6D63]'>Top Rated Reviews</h2>
                <p className='text-xl text-[#6b7d71] text-center'>
                    Discover, Taste Food & Share Honest  Reviews
                </p>
            </div>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4   '>
                {
                    slicedData.map(d =>
                        <ProductCard key={d._id} d={d} />
                    )
                }
            </div>
            <div className=' flex justify-center items-center my-6'>
                <Link to={'/products'} className='bg-[#52796F] text-[#FFFFFF] px-4 py-2 rounded-md hover:bg-[#355E52] hover:text-[#F1F1F1] transition-colors'>Show All</Link>
            </div>
            <div>
                <Challenge />
            </div>
            <div>
                <Book />
            </div>
            <div>
                <Guides />
            </div>
        </div>
    );
};

export default Home;