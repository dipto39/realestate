"use client";
import React from 'react';
import { useFetch } from '../../../app/helpers/hooks';
import { blogListPopular } from '../../../app/helpers/backend';
import { useRouter } from 'next/navigation';
import { FaCalendarDays, FaMagnifyingGlass } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { useI18n } from '../../../app/providers/i18n';

const PopularNews = () => {
    const [popular, getPopular] = useFetch(blogListPopular);
    const router = useRouter();
    const i18n = useI18n();
    return (
        <>
            <div className="bg-[#fafafd] p-4 mb-5 rounded">
                <label className="relative" >
                    <input className="w-full p-3 bg-[#003049] rounded bg-opacity-10 outline-none text-secondary_text" type="text" placeholder={i18n?.t('Search Here')}
                        onChange={(e) => {
                            getPopular({ "search": e.target.value })
                        }}
                    />
                    <span className='absolute header_4 text-secondary_text right-3 -top-[2px] cursor-pointer outline-none hover:text-primary'><FaMagnifyingGlass /></span>
                </label>
            </div>
            <div className="bg-[#fafafd] p-4 mb-5 rounded-md">
                <h1 className="header_4">{i18n?.t('Popular Blog')}</h1>
                <div className="">
                    {
                        popular?.map((item, index) => (
                            <div key={index} className="py-5 flex justify-between  hover:opacity-80 cursor-pointer"
                                onClick={() => router.push(`/news/view/${item._id}`)}
                            >
                                <div className="basis-1/4 h-cover">
                                    <img className="w-[100px] h-[100px] rounded object-cover" src={item.image} alt="" />
                                </div>
                                <div className="basis-3/4 flex justify-center flex-col ps-5">
                                    <div className="">
                                        <h1 className="header_7">
                                            {item?.title?.length > 30 ? item?.title.slice(0, 30) + '...' : item?.title}
                                        </h1>
                                        <div className="flex items-center text-secondary_text paragraph_1 pt-3">
                                            <span className='header_5'><FaCalendarDays></FaCalendarDays></span>
                                            <p className="ps-2">{dayjs(item.createdAt).format('MMMM, DD YYYY')}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default PopularNews;