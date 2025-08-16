import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { FaRecycle, FaHandsHelping, FaLeaf, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';

const BannerSlider = () => {
    const slides = [
        {
            image: 'https://i.ibb.co/gZ9L9wbm/3.jpg',
            title: 'Reducing Food Waste',
            text: 'Connecting surplus food with communities in need to minimize waste and maximize impact',
            icon: <FaRecycle className="text-4xl mb-4 text-green-400" />,
            cta: 'Learn How'
        },
        {
            image: 'https://i.ibb.co/YBhh7r3M/2.jpg',
            title: 'Community Impact',
            text: 'Providing nutritious meals to underserved communities through our network of partners',
            icon: <FaHandsHelping className="text-4xl mb-4 text-green-400" />,
            cta: 'See Impact'
        },
        {
            image: 'https://i.ibb.co/d47HH0ZQ/1.jpg',
            title: 'Sustainable Future',
            text: 'Building an environmentally conscious food ecosystem for generations to come',
            icon: <FaLeaf className="text-4xl mb-4 text-green-400" />,
            cta: 'Our Mission'
        },
        {
            image: 'https://i.ibb.co/bwc9xT5/4.jpg',
            title: 'Join Our Network',
            text: 'Become part of the solution - whether you have food to donate or need support',
            icon: <FaUsers className="text-4xl mb-4 text-green-400" />,
            cta: 'Get Involved'
        }
    ];

    return (
        <div className="relative h-[300px] md:h-[600px] rounded-xl overflow-hidden shadow-xl">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                loop={true}
                effect={'fade'}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="absolute inset-0 bg-black/40"></div>
                        </div>
                        <div className="relative flex flex-col items-center justify-center h-full px-6 text-center">
                            <div className="max-w-3xl mx-auto transform transition-all duration-500 hover:scale-105">
                                {slide.icon}
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto">
                                    {slide.text}
                                </p>
                                <Link to='/about' className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                                    {slide.cta}
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                
                {/* Custom Navigation Arrows */}
                <div className="swiper-button-next !text-white !right-8 after:!text-xl md:after:!text-2xl"></div>
                <div className="swiper-button-prev !text-white !left-8 after:!text-xl md:after:!text-2xl"></div>
            </Swiper>
            
            {/* Gradient Overlay Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
        </div>
    );
};

export default BannerSlider;