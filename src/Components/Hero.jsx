import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Hero = ({ data }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [topRatedData, setTopRatedData] = useState([]);

    useEffect(() => {
        const sortedData = [...data]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5); 
        setTopRatedData(sortedData);
    }, [data]);

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative">
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showThumbs={false}
                showStatus={false}
                showArrows={false}
                showIndicators={true}
                emulateTouch={true}
                useKeyboardArrows={true}
                transitionTime={1000}
                className="rounded-3xl overflow-hidden shadow-2xl"
                selectedItem={currentSlide}
                onChange={handleSlideChange}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                    return (
                        <button
                            className={`mx-2 w-3 h-3 rounded-full transition-all duration-300 ${isSelected ? 'w-10 bg-linear-to-r from-amber-600 to-amber-500' : 'bg-slate-400'}`}
                            onClick={onClickHandler}
                            onKeyDown={onClickHandler}
                            key={index}
                            type="button"
                            aria-label={`${label} ${index + 1}`}
                        />
                    );
                }}
            >
                {topRatedData.map((d, index) => (
                    <div key={index} className="relative h-[300px] sm:h-[400px] md:h-[500px]  overflow-hidden group">
                        <img
                            src={d.foodImage}
                            alt={d.foodName}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-linear-to-br from-slate-900/70 via-slate-900/50 to-transparent">
                            <div className="absolute inset-0 backdrop-blur-sm"></div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                            <div className="text-center max-w-4xl transform translate-y-0 
                            group-hover:translate-y-2.5
                            transition-transform duration-500">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl  font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-tight leading-tight">
                                    <span className="bg-clip-text text-transparent bg-linear-to-r from-amber-300 via-amber-200 to-amber-300">
                                        {d.foodName}
                                    </span>
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-100 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed max-w-3xl mx-auto px-2">
                                    "{d.reviewText}"
                                </p>

                                <div className="flex justify-center items-center">
                                    <div className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 transform transition-all duration-300 ${i < d.rating ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}
                                                style={{ 
                                                    animationDelay: `${i * 200}ms`,
                                                    animationDuration: '1.5s',
                                                    animationIterationCount: 'infinite'
                                                }}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            
            <div className="absolute right-2 sm:right-3 md:right-4 lg:right-6 xl:right-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 sm:gap-3 md:gap-4 z-20">
                {topRatedData.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSlideChange(idx)}
                        className={`flex items-center justify-center w-3 h-3 md:w-4 md:h-4  rounded-full transition-all duration-300 ${currentSlide === idx 
                            ? 'bg-linear-to-r from-amber-600 to-amber-500 text-white scale-110 shadow-lg shadow-amber-500/30' 
                            : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/70'}`}
                    >
                        <span className="lg:font-bold text-sm sm:text-base ">{idx + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Hero;