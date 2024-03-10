'use client';
import React from 'react';
import SingleFeatured from './singleFeatured';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { Carousel } from 'antd';
import { useI18n } from '../../../../app/providers/i18n';
import { useProperty } from '../../../../app/contexts/property';

const Featured = ({ theme1 }) => {
    const { setSearch, search } = useProperty();

    const i18n = useI18n()
    return (
        <div className='my-10 '>
            <div className=' container mx-auto py-10'>
                <div className='flex w-full flex-wrap items-center justify-between py-6'>
                    <h2
                        className={`header_2 basis-1/2 ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}
                    >
                        {i18n?.t('Featured Properties')}
                    </h2>
                    <div className='mt-4 flex basis-full items-center md:basis-1/2'>
                        <div className='h-[2px] w-2/6 bg-secondary_text md:w-3/6'></div>
                        <p className={`header_5 pl-2 ${theme1 ? 'dark:text-violet-100 text-dark_text' : 'text-dark_text'}`}>
                            {i18n?.t('Explore All Properties')}
                        </p>
                        <Link
                            href='/property' onClick={() => setSearch(!search)}
                            className='ml-4 flex h-8 w-8 items-center justify-center rounded-full border text-secondary_text transition-all hover:bg-primary hover:text-white'
                        >
                            <FiChevronRight />
                        </Link>
                    </div>
                </div>

                <SingleFeatured theme1={theme1}/>
            </div>
        </div>
    );
};

export default Featured;
