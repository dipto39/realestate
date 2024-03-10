"use client"
import { Rate } from 'antd';
import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { useFetch } from '../../../app/helpers/hooks';
import { fetchUserTestimonials } from '../../../app/helpers/backend';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { useI18n } from '../../../app/providers/i18n';
import { usePathname } from 'next/navigation';

const Testimonial = () => {
    const [testimonials, getTestimonials] = useFetch(fetchUserTestimonials)
    const i18n = useI18n()

    const path = usePathname();

    return (
        <section className={`relative py-5 ${path === '/about' ? 'bg-secondary' : 'bg-light_text'}`}>
            <div className='absolute bottom-0 left-4 top-6'>
                <img width='40' src='/union.png' alt='' />
            </div>
            <div className='absolute right-10 top-20'>
                <img width='30' className='' src='./union.png' alt='' />
            </div>
            <div className='absolute right-2 top-16'>
                <img className='' src='/union1.png' alt='' />
            </div>
            <div className='absolute right-1/2 top-6'>
                <img className='' src='/union1.png' alt='' />
            </div>
            <div className='container mx-auto py-20 testimonial-slider'>
                <div className='mx-auto mb-8 w-full md:w-1/2'>
                    <h1 className={`header_2 py-4 text-center  ${path === '/about' && 'text-light_text'}`}>{i18n?.t('What our clients says about us')}</h1>
                </div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        freeMode={true}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                        }}
                        autoplay={{ delay: 3000 }}
                        modules={[FreeMode, Pagination, Navigation, Autoplay]}
                        pagination={{ clickable: true }}
                        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                        className="mySwiper"
                    >
                        {
                            testimonials?.map((testimonial) => <SwiperSlide key={testimonial._id} className='flex justify-center items-center'>
                                <SingleTestimonial key={testimonial._id} testimonial={testimonial} />
                            </SwiperSlide>
                            )
                        }
                        

                    </Swiper>


                {/* </div> */}
            </div>
        </section>
    );
};

export default Testimonial;

const SingleTestimonial = ({ testimonial }) => {
    return (
        <div className='relative z-10 xl:!max-w-[486px] rounded-b-lg rounded-tr-lg bg-white p-8 pl-14 mx-auto ml-10 md:ml-12 mb-8 md:mb-12'>
            <div className='absolute left-0 top-0 h-5/6 w-2 bg-orange-500'>
                <div className='absolute -left-[40px] top-9 h-20 w-20 rounded-full border-4 border-orange-500'>
                    <img className='h-full w-full rounded-full' src={testimonial?.image} alt={testimonial?.name} />
                </div>
            </div>
            <div className=''>
                <div className='flex pb-2'>
                    <Rate style={{ fontSize: 20 }} className='text-primary' disabled defaultValue={testimonial?.rating} />
                </div>
                <div className='flex items-center justify-between'>
                    <div className=''>
                        <h1 className='header_5 pt-2 text-dark_text'>{testimonial?.name}</h1>
                        {/* <p className='paragraph_6 text-secondary_text'>{testimonial?.message}</p> */}
                    </div>
                    {/* <FaQuoteLeft className='text-4xl text-orange-500' aria-hidden='true' /> */}
                    <img src='/quote.png' alt='' />
                </div>
                <p className='paragraph_3 pt-3 text-dark_text'>{testimonial?.message}</p>
            </div>
        </div>
    );
};