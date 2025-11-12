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
            <h2 className='text-4xl font-bold text-center mb-6  text-[#5E6D63]'>Top Rated Reviews</h2>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4   '>


                {
                    slicedData.map((d, index) =>
                        <ProductCard key={index} d={d} />
                    )
                }
            </div>
            <div className=' flex justify-center items-center my-6'>
                <Link to={'/products'} className='bg-[#EBD9D9] text-[#2F3E46] px-4 px-[20px] py-[10px] text-sm rounded-md hover:bg-[#E6BB50] font-semibold hover:text-white transition-colors'>Show All</Link>
            </div>

            <div>
                <Challenge/>
            </div>
            <div>
                <Book/>
            </div>
            <div>
                <Guides/>
            </div>
        </div>
    );
};

export default Home;