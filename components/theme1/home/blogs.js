"use client";
import Link from 'next/link';
import React from 'react';
import { FiCalendar, FiChevronRight, FiUser } from 'react-icons/fi';
import { blogListLatest } from '../../../app/helpers/backend';
import { useFetch } from '../../../app/helpers/hooks';
import dayjs from 'dayjs';
import { useI18n } from '../../../app/providers/i18n';

const Blogs = ({ theme1 }) => {
    const [blogs, getBlogs] = useFetch(blogListLatest, { limit: 2 })
    const i18n = useI18n();
    return (
        <div className='blog pb-[80px] mt-[40px]'>
            <div className='container mx-auto py-10'>
                <div className='mb-12 flex w-full flex-wrap items-center '>
                    <h1
                        className={`header_2 basis-full md:basis-1/2 ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}
                    >
                        {i18n?.t('News From Blog')}
                    </h1>
                    <div className='flex w-full items-center justify-end md:float-right md:w-3/6'>
                        <div className='h-[2px] w-1/5 bg-slate-400 md:w-3/5'></div>
                        <p
                            className={` px-3 text-lg ${theme1 ? 'dark:text-violet-100 text-dark_text' : 'text-dark_text'}`}
                        >
                            {i18n?.t('Explore All News')}
                        </p>
                        <Link
                            href='/news'
                            className='z-10 flex h-8 w-8 items-center justify-center rounded-full border border-secondary_text text-secondary_text  transition-all hover:bg-hover_color hover:text-white'
                        >
                            <FiChevronRight />
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>

                    {blogs?.docs?.map(blog => (
                        <div className='' key={blog?._id}>
                            <div className='relative'>
                                <img className='object-cover h-[350px] w-full rounded-lg' src={blog?.image} alt='blog' />
                                <div
                                    className={` absolute bottom-0 right-0 ${theme1 ? 'dark:bg-zinc-800 bg-white' : 'bg-white'}`}
                                >
                                    <div
                                        className={`paragraph_6 flex items-center p-2 ${theme1 ? 'dark:text-violet-100 text-secondary_text' : 'text-secondary_text'}`}
                                    >
                                        <FiCalendar />
                                        <p className='ps-2'>{dayjs(blog?.createdAt).format('MMMM DD, YYYY')}</p>
                                    </div>

                                </div>
                            </div>
                            <div className='flex items-center justify-between py-5'>
                                <p
                                    className={`header_4 !font-bold capitalize ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}
                                >
                                    {blog?.title?.length > 60 ? blog?.title.slice(0, 60) + '...' : blog?.title}
                                </p>
                                <Link
                                    href={`/news/view/${blog?._id}`}
                                    className='ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-secondary_text text-secondary_text  transition-all hover:bg-hover_color hover:text-white'
                                >
                                    <FiChevronRight />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
