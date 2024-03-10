"use client";
import Link from 'next/link';
import React from 'react';
import { useFetch } from '../../../app/helpers/hooks';
import { blogListLatest } from '../../../app/helpers/backend';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../app/providers/i18n';

const Blogs = () => {
    const [blogs, getBlogs] = useFetch(blogListLatest, { limit: 3 })
    const i18n = useI18n();

    return (
        <section className='relative py-16'>
            <div className='absolute left-3 top-5'>
                <img width='50' src='/element3.png' alt='' />
            </div>
            <div className='absolute right-1 top-7'>
                <img width='50' src='/element.png' alt='' />
            </div>
            <div className='absolute bottom-5 left-3'>
                <img width='60' src='/element5.png' alt='' />
            </div>
            <div className='absolute bottom-3 right-3'>
                <img width='80' src='/element6.png' alt='' />
            </div>
            <div className='container mx-auto '>
                <div className='lg:flex  pt-8 pb-7 items-center justify-between py-5'>
                    <div className='relative'>
                        <h1 className='header_2 text-dark_text'>{i18n?.t('Latest News From Blogs')}</h1>
                        <div className='absolute lg:-right-44 lg:top-4 hidden lg:block'>
                            <img

                                src='element4.png'
                                alt=''
                            />

                        </div>
                    </div>
                    <div>

                        <Link
                            className='header_7 text-secondary_text underline hover:text-primary text-right'
                            href='/news'
                        >
                            {i18n?.t('Explore All News')}
                        </Link>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5 pb-12 md:grid-cols-2 lg:grid-cols-3'>

                    {blogs?.docs?.map(blog => (
                        <SingleBlog key={blog._id} blog={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;

const SingleBlog = ({ blog }) => {
    const { title, image, details, createdAt, _id, short_description
    } = blog;
    const router = useRouter();
    const i18n = useI18n();
    return (
        <div className='relative h-[450px] rounded-lg group cursor-pointer '
            onClick={() => router.push(`/news/view/${_id}`)}>
            <img className='h-full w-full rounded-lg' src={image} alt='' />
            <div className='absolute bottom-0 left-8 h-48 right-0 border-l-4 border-white group-hover:border-primary bg-white bg-opacity-90 object-cover p-5 transition-all ease-in-out'>
                <h1 className='header_4_bold text-dark_text capitalize group-hover:text-primary'>
                    <Link href={`/news/view/${_id}`}>
                        {title?.length > 14 ? title.slice(0, 14) + '...' : title}
                    </Link>
                </h1>
                {/* {details?.length > 20 ? details.slice(0, 20) + '...' : details} */}
                {/* <div className='paragraph_3 py-3 text-secondary_text' dangerouslySetInnerHTML={{ __html: details.length > 50 ? details.slice(0, 50) + '...' : details }}> */}
                <p className='paragraph_3 py-3 text-secondary_text'>
                    {
                        short_description?.length > 50 ? short_description.slice(0, 50) + '...' : short_description
                    }
                </p>

            </div>

            <div className='absolute bottom-0 right-0 left-10'>
                <div className=' flex items-center justify-between py-4 px-4'>
                    <p className='text-xs font-bold text-secondary_text'>{dayjs(createdAt).format('MMMM DD, YYYY')}</p>
                    <Link href={`/news/view/${_id}`} className='header_7 text-dark_text underline group-hover:text-primary'>
                        {i18n?.t('Read More')}
                    </Link>
                </div>
            </div>
        </div>
    );
};
