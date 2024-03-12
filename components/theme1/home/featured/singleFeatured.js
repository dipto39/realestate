import { Rate } from 'antd';
import React, { useRef } from 'react';
import { FaBath } from 'react-icons/fa';
import { FiHome, FiMaximize, FiStar } from 'react-icons/fi';
import { useFetch } from '../../../../app/helpers/hooks';
import { propertyList } from '../../../../app/helpers/backend';

import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { useI18n } from '../../../../app/providers/i18n';


const SingleFeatured = ({ theme1 }) => {
    const swiperRef2 = useRef(null);
    const i18n = useI18n()

    const [data, getData] = useFetch(propertyList, { limit: 3 });

    return (
        <div className='relative'>
            <Swiper
                onSwiper={(swiper) => (swiperRef2.current = swiper)}
                modules={[Navigation]}
                navigation={{ nextEl: '.swiper2-next', prevEl: '.swiper2-prev' }}
                className="mySwiper"
            >
                {
                    data?.docs?.map((property) => <SwiperSlide key={property._id}>
                        <div className="md:flex pb-3 md:pb-16">
                            <div className="basis-1/2 relative px-2 pb-5 md:pb-0">
                                <div className=" ">
                                    <div className={`paragraph_3 py-8 ${theme1 ? 'dark:text-violet-100 text-black' : '!text-black'}`}>
                                        <p>
                                            {
                                                property?.short_description?.length > 170 ? property?.short_description.slice(0, 170) + '...' : property?.short_description
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-5 md:mb-0">
                                    <h1 className={`header_4 !font-bold hover:text-hover_color transition-all ease-in-out pr-8 ${theme1 ? 'text-dark_text dark:text-violet-100' : 'text-dark_text'}`}>{i18n?.t('Property for')} <span className="capitalize">{property?.type}</span> </h1>
                                </div>
                                <div className={`flex justify-between md:py-5 md:pr-5 md:absolute lg:-bottom-1  md:w-[700px] w-full  z-10 ${theme1 ? 'dark:bg-main_dark bg-white' : 'bg-white'}`}>
                                    <div className="">
                                        <h1 className={`header_3 capitalize ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>{property?.title}</h1>
                                        <p className={`paragraph_1 ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}>{property?.city}, {property?.country}</p>
                                        <div className="flex mt-2 items-center space-x-3">
                                            <div className="flex items-center">
                                                <FiHome className='!text-hover_color' />
                                                <p className={`px-2 paragraph_6 ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}>{property?.bedrooms} {i18n?.t('Beds')}</p>
                                            </div>
                                            <div className="flex">
                                                <FaBath className='!text-hover_color' />
                                                <p className={`px-2 paragraph_6 ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>{property?.bathrooms} {i18n?.t('Baths')}</p>
                                            </div>
                                            <div className="flex">
                                                <FiMaximize className='!text-hover_color' />
                                                <p className={`px-2 paragraph_6 ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>{property?.area} {i18n?.t('sqft')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 md:mt-0">
                                        <div className="">
                                            <p className={`paragraph_6 ${theme1 ? 'text-dark_text dark:text-gray-400' : 'text-secondary_text'}`}>{i18n?.t('Price')}</p>
                                            <p className={`header_7 ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}>${property?.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/2">

                                <div className="md:absolute h-full w-full">
                                    <img className='md:w-[600px] md:h-[450px] lg:h-[480px] object-fill' src={property?.thumb_image} alt="" />
                                </div>
                                <div className="md:mt-[430px] mt-5">
                                    <img src="./img/Arrow.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                }
            </Swiper>
            <div className='flex gap-5 justify-center absolute bottom-0 lg:-bottom-10 right-0 text-secondary_text text-3xl z-30'>
                <button className='swiper2-next group transition-all duration-1000' onClick={() => {
                    swiperRef2.current && swiperRef2.current.swiper && swiperRef2.current.swiper?.slideNext()
                }}>
                    <img src='./Arrow_1.png' className='rotate-180 hidden group-hover:block' />
                    <img src='./Arrow_2.png' className='block group-hover:hidden' />

                </button>
                <button className='swiper2-prev group  transition-all duration-1000' onClick={() => {
                    swiperRef2.current && swiperRef2.current.swiper && swiperRef2.current.swiper?.slidePrev()
                }}>
                    <img src='./Arrow_1.png' className='hidden group-hover:block' />
                    <img src='./Arrow_2.png' className='rotate-180 block group-hover:hidden' />

                </button>
            </div>
        </div>
    );
};

export default SingleFeatured;