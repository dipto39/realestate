import { Rate } from 'antd';
import React, { useRef } from 'react';
import { FiStar } from 'react-icons/fi';
import { useFetch } from '../../../app/helpers/hooks';
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { fetchUserTestimonials } from '../../../app/helpers/backend';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';

import { Navigation } from 'swiper/modules';
import { useI18n } from '../../../app/providers/i18n';


const Testimonial = ({ theme1 }) => {
    const swiperRef = useRef(null);
    const i18n = useI18n()
    const [testimonials, getTestimonials] = useFetch(fetchUserTestimonials)

    return (
        <section className='py-10 relative'>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                modules={[Navigation]}
                navigation={{ nextEl: '.swiper1-next', prevEl: '.swiper1-prev' }}
                className="mySwiper"
            >
                {testimonials?.map((item) => <SwiperSlide key={item._id}>
                    <div className=' container mx-auto md:flex items-center flex-wrap  py-10'>
                        <div className='relative md:basis-3/5 pr-14'>
                            <h1 className={`header_2 ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>
                                {i18n?.t('What our happy clients says about Us')}
                            </h1>
                            <p
                                className={`header_4_italic py-8 ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}
                            >
                                {item?.message}
                            </p>
                            <p className={`header_5 ${theme1 ? 'text-dark_text dark:text-violet-100' : 'text-dark_text'}`}>
                                {item?.name} - {i18n?.t('Client')}
                            </p>
                            <div className='flex py-4 '>
                                <Rate
                                    character={<FiStar />}
                                    className='!text-hover_color '
                                    disabled
                                    defaultValue={item?.rating}
                                />
                            </div>

                            <div className=''>
                                <img src='./img/Arrow.png' alt='' />
                            </div>
                        </div>
                        <div className='relative md:basis-2/5'>
                            <img
                                src={item?.image}
                                className='h-[460px] w-[460px] object-cover '
                                alt=''
                            />
                            <div className='absolute -left-14 top-7 hidden h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg lg:flex'>
                                <img src='/icons/quote-down.png' alt='quote' />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>)}
            </Swiper>
            <div className='container mx-auto relative'>

                <div className=' flex items-center gap-5 text-secondary_text text-3xl absolute left-0 z-30'>
                    <button className='swiper1-next group' onClick={() => {
                        swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.slideNext()
                    }}>
                        <img src='./Arrow_1.png' className='rotate-180 hidden group-hover:block' />
                        <img src='./Arrow_2.png' className='block group-hover:hidden' />
                    </button>
                    <button className='swiper1-prev group' onClick={() => {
                        swiperRef.current && swiperRef.current.swiper && swiperRef.current.swiper.slidePrev()
                    }}>
                        <img src='./Arrow_1.png' className='hidden group-hover:block' />
                        <img src='./Arrow_2.png' className='rotate-180 block group-hover:hidden' />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
