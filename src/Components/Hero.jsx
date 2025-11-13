// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from 'react-icons/fa6';



const Hero = ({ data }) => {
    // console.log(data);
    const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date))
    const slicedData = sortedData.slice(0, 6)
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <>
            <div className='my-9'>
                <Swiper
                    pagination={pagination}
                    modules={[Pagination, Autoplay]}
                    className="mySwiper rounded-2xl"
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                >

                    {
                        slicedData.map((d, index) =>
                            <SwiperSlide key={index} >
                                <div className='relative w-full h-[600px] '>
                                    <div>
                                        <img src={d.foodImage} className=' object-cover absolute ' alt="" />
                                    </div>
                                    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'>

                                    </div>
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4 z-20 flex items-center gap-2'>
                                        <div>
                                            <h2 className='text-3xl font-bold'>{d.foodName}</h2>
                                            <p className='mt-2'>{d.reviewText}</p>
                                        </div>
                                        <div className="flex flex-col items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={index < d.rating ? 'text-[#FFC107]' : 'text-gray-300'}
                                                />
                                            ))}
                                        </div>


                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }



                </Swiper>
            </div>
        </>
    );
}

export default Hero;