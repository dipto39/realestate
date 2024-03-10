import React from 'react';
import { AiFillDashboard, AiOutlineHome } from 'react-icons/ai';
import { FaCreditCard, FaEdit, FaHome, FaUserAlt } from 'react-icons/fa';
import { FaHouseCircleCheck, FaLocationDot, FaShield } from 'react-icons/fa6';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useFetch } from '../../../app/helpers/hooks';
import { getUserHistorySubscription } from '../../../app/helpers/backend';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import dayjs from 'dayjs';
import { useI18n } from '../../../app/providers/i18n';

function Credits({ credits }) {
    const [data, setData] = useFetch(getUserHistorySubscription)
    const i18n = useI18n();
    return (
        <>
            <h1 className='header_4_bold pb-3 text-dark_text'>{i18n?.t('Packages')}</h1>
            <div className='mb-9 w-full rounded bg-gray-200 p-5'>
                <p className='paragraph_1'>
                    {i18n?.t('Your credits')}: <span className='text-primary'>{credits ? credits : 0} {i18n?.t('credits')}</span>
                </p>
            </div>
            
            { data?.docs?.length > 0 ? <div className={`container  lg:w-[600px]`}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
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
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    className="mySwiper"
                >
                    {data?.docs?.map((item, i) => (
                        <SwiperSlide key={i} className='mb-12'>
                            <div className='relative rounded bg-slate-50 p-8 text-center hover:bg-white hover:shadow-xl'>
                                <h1 className='header_7 text-dark_text'>{i18n?.t('Plan Name')} <span className='capitalize'>{item?.subscription?.name}</span></h1>
                                <h1 className='paragraph_1 text-secondary_text'>{i18n?.t('ID')}: {item?.uid}</h1>
                                <h1 className='paragraph_1 my-3'>Purchased on <span className='capitalize'>{dayjs(item?.createdAt).format("DD MMM YYYY")}</span></h1>
                                <h1 className='absolute top-2 right-2'>{item?.active ? <span className='py-1 px-2 text-sm bg-primary rounded-full text-white'>{i18n?.t('Active')}</span> : <span className='py-1 px-2 text-sm bg-secondary rounded-full text-white'>{i18n?.t('Inactive')}</span>}</h1>
                                <p className='paragraph_1 pt-2 '>Payment Method <span className='capitalize'>{item?.payment?.method}</span></p>
                            
                            </div>
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div> : <div className='mt-7 rounded-lg p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.2)] '>
                <h1 className='header_4_bold pb-1 text-dark_text'>{i18n?.t('Transactions')}</h1>
                <hr className='h-[2px] w-full bg-gray-200' />
                <div className='pt-10 text-center'>
                    <p className='paragraph_1'>{i18n?.t('Oops')}!</p>
                    <p className='paragraph_3 text-secondary_text'>{i18n?.t('No transactions')}</p>
                </div>
            </div> }
            
        </>
    );
}

export default Credits;
