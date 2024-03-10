import { Breadcrumb } from 'antd';
import Link from 'next/link';
import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";

function Banner({ title }) {
    return (
        <section className='relative z-0 -mt-[103px]  bg-secondary pt-20 pb-10 md:py-20'>
            <div className='absolute bottom-0 left-0'>
                <img width='100' src='/bl.png' alt='' />
            </div>
            <div className='absolute right-0 top-0'>
                <img width='100' src='/bread_l.png' alt='' />
            </div>
            <div className='container text-center '>
                <h1 className='block md:hidden headerr_3 font-bold md:headerr_1 pt-16 md:pt-28 uppercase text-white'>{title}</h1>
                <h1 className='hidden md:block font-bold headerr_1 pt-16 md:pt-28 uppercase text-white'>{title}</h1>

                <Breadcrumb
                    className='font-libre_baskerville text-lg flex items-center my-2 ml-4 justify-center !text-white'
                    separator={<MdArrowForwardIos />}
                    items={[
                        {
                            title: 'Home',
                            href: '/',
                            className: '!text-white hover:!text-primary',
                        },
                        {
                            title: (
                                <Link href='/news' className='!text-primary'>
                                    {title}
                                </Link>
                            ),
                        },
                    ]}
                />
            </div>
        </section>
    );
}

export default Banner;
