import Hero from '../Components/Hero';
import ProductCard from '../Components/ProductCard';
import { useLoaderData } from 'react-router';
import Aos from 'aos';
import Challenge from '../Components/Challenge';
import Guides from '../Components/Guides';

const Home = () => {
    const data = useLoaderData();
    const sortedData = data.sort((a, b) => Number(b.rating) - Number(a.rating))
    const slicedData = sortedData.slice(0, 6)



    return (

        <div>
            <Hero data={data} />
            <h2 className='text-2xl font-semibold text-black text-center'>Top Rated Reviews</h2>
            <div className=' grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4  border '>


                {
                    slicedData.map((d, index) =>
                        <ProductCard key={index} d={d} />
                    )
                }
            </div>
            <div>
                <Challenge/>
            </div>
            <div>
                <Guides/>
            </div>
        </div>
    );
};

export default Home;