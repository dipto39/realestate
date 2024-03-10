"use client"
import React, { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useSearchParams } from 'next/navigation';

const Gallery = ({ singleData }) => {
    const [bgImg, setBgImg] = useState('');
    const propertyId = useSearchParams().get("_id");

    useEffect(() => {
        setBgImg(singleData?.thumb_image)
    }, [singleData?.thumb_image])
    return (
        <div>
            <div className={`relative  h-[523px] w-full rounded-lg bg-no-repeat bg-cover bg-center goup`} style={{ backgroundImage: `url(${bgImg}) ` }}>
                <div
                    className='absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden rounded-lg bg-fixed transition-all duration-500  ease-in-out '
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <div className=' p-5'>
                        <div className='mt-3 md:flex w-full items-start justify-between'>
                            <div className=''>
                                <p className='md:text-5xl text-2xl font-semibold  text-white capitalize'>{singleData?.title}</p>
                                <div className='md:text-2xl text-xl font-semibold mt-4 flex items-center text-white'>
                                    <span>
                                        <FiMapPin className='mr-2 inline-block' />
                                        {singleData?.city}, {singleData?.country}
                                    </span>
                                </div>
                            </div>
                            <div className='rounded-sm bg-hover_color px-4 py-1 md:py-2 mt-5 md:mt-0 w-fit'>
                                <p className='header_4 rounded-sm text-white'>${singleData?.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className='mx-auto flex justify-center items-center gap-2 w-2/6 md:w-3/6 mt-48 gallery_slider md:mt-56  min-[1424px]:mt-56 bg-white rounded'>
                        <div className='w-full p-2'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={24}
                                freeMode={true}
                                loop={true}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1,
                                        spaceBetween: 8,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 8,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                        spaceBetween: 8,
                                    },
                                }}
                                autoplay={{ delay: 3000 }}
                                modules={[FreeMode, Pagination, Navigation, Autoplay]}
                                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                                className="mySwiper"
                            >
                                {
                                    singleData?.images?.map((item, index) => <SwiperSlide key={index} className='bg-white rounded '>
                                        <div className='rounded flex justify-center items-center h-24 cursor-pointer' onClick={() => setBgImg(item)}>
                                            <img
                                                src={item}
                                                alt='image'
                                                className={`${!propertyId ? 'w-full h-full ' : 'lg:h-32 h-44 w-44 lg:w-32'} rounded`}
                                            />
                                        </div>
                                    </SwiperSlide>)
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
