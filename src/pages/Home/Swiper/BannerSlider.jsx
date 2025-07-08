
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const BannerSlider = () => {
    const slides = [
        {
            image: 'https://i.ibb.co/DHZqD5k6/modern-software-development-vector-24033583.jpg',
            title: 'Modern Software Development',
            text: 'Building robust and scalable software solutions.',
    
        },
        {
            image: 'https://i.ibb.co/cc2VyHzz/web3.gif',
            title: 'Web3 Integration',
            text: 'Exploring the future of the decentralized web.',

        },
        {
            image: 'https://i.ibb.co/rRLBLMhw/Technology.jpg',
            title: 'Cutting-Edge Technology',
            text: 'Leveraging the latest tech for innovative products.',
   
        },
        {
            image: 'https://i.ibb.co/BdYzFzd/BUSINESS-ANALYTICS-1-jpg.webp',
            title: 'Business-Edge Technology',
            text: 'Leveraging the latest tech for innovative products.',
   
        },
    ];

    return (
        <div className="md:h-[350px] rounded-lg ">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="bg-cover  bg-center text-white rounded-lg" style={{ backgroundImage: `url(${slide.image})` }}>
                        <div className="md:p-5 p-10  rounded-lg bg-black/50 flex flex-col items-center justify-center h-full">
                            <h2 className="md:text-2xl font-bold">{slide.title}</h2>
                            <p className="text-lg text-center">{slide.text}</p>
                      
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
