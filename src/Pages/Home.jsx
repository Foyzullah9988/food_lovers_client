import React from 'react';
import Hero from '../Components/Hero';
import { useLoaderData } from 'react-router';

const Home = () => {
    const data = useLoaderData();
    return (
        <div>
            <Hero data={data}/>
            Home
        </div>
    );
};

export default Home;