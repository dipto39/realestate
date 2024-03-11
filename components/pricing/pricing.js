import React from 'react'
import { FiCheck } from 'react-icons/fi';
import { useFetch } from '../../app/helpers/hooks';
import { subscriptionPlan } from '../../app/helpers/backend';
import Link from 'next/link';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import { usePathname, useRouter } from 'next/navigation';
import { message } from 'antd';
import { useUser } from '../../app/contexts/user';
import { useI18n } from '../../app/providers/i18n';

const Pricing1 = () => {
    const { user } = useUser()
    const router = useRouter()
    const path = usePathname()
    const [data, getData] = useFetch(subscriptionPlan)
    const i18n = useI18n()

    return (
        <section className='relative py-20'>
            <div className='absolute left-5 top-5'>
                <img width='50' src='/llt.png' alt='' />
            </div>
            <div className='absolute right-3 top-5'>
                <img width='50' src='/blt.png' alt='' />
            </div>
            <div className='absolute bottom-3 right-5'>
                <img src='/drow.png' alt='' />
            </div>
            <div className={`container  ${path === '/agent-profile' ? 'lg:w-[600px]' : ' w-full'}`}>
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
                            slidesPerView: path === '/agent-profile' ? 2 : 3,
                            spaceBetween: 24,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    pagination={{ clickable: true }}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    className="mySwiper"
                >
                    {data?.docs?.map((item, i) => (
                        <SwiperSlide
                            key={item._id}
                            className='!h-[470px] rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.2)] bg-white mb-12 mt-8 my-3'
                        >
                            <div className='relative p-5 '>
                                <div className='absolute -top-5 right-7 z-10'>
                                    <div className='relative -top-[10px]'>
                                        {i % 2 === 0 ? <img src={'/price1.png'} alt='' /> : <img src={'/price2.png'} alt='' />}

                                        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform '>
                                            <p className='header_5 ml-5 text-center text-white'>
                                                ${item?.price} <span className='text-sm'>/{i18n?.t('month')}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='!mt-4 flex h-[53px] w-[53px] items-center justify-center rounded-full  bg-[#F3F4F8]'>
                                    <img src={'/coin.png'} alt='' />
                                </div>
                                <p className='header_3 paragraph_3 mt-12 !font-bold text-secondary_text'>
                                    {item?.name}
                                </p>
                                <p className='header_2 mt-2 text-dark_text'>${item.price}</p>

                                <ul>
                                    {item?.features?.map((item, index) => (
                                        <li className='mt-5 flex items-center' key={index}>
                                            <FiCheck className='text-lg text-primary' />
                                            <p className='paragraph_1 ml-3 text-secondary_text'>
                                                {item}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                                <div className='absolute bottom-0 w-full p-5'>
                                    <Link href={`/pricing-plan/${item?._id}`}>
                                        <button onClick={() => {
                                            if (!user) {
                                                message.error(i18n?.t('Please login first a agent'))
                                                router.push('/login')
                                            } else {
                                                message.success(i18n?.t('Choose this plan'))
                                                router.push(`/pricing-plan/${item?._id}`)
                                            }
                                        }} className='header_5 w-full rounded-lg border border-secondary_text bg-white py-3 text-secondary_text transition-all ease-in-out hover:bg-primary hover:text-white '>
                                            {i18n?.t('Choose Plan')}
                                        </button>
                                    </Link>
                                </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Pricing1