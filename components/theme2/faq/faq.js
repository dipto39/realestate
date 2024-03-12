'use client';
import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import FaqItem from './faqItem';
import { useFetch } from '../../../app/helpers/hooks';
import { fetchFaq } from '../../../app/helpers/backend';
import { useI18n } from '../../../app/providers/i18n';


const FAQ = () => {
    const [data, getData, { loading }] = useFetch(fetchFaq, { limit: 50 });
    const i18n = useI18n();
    return (
        <div className='pb-20'>
            <div className='md:flex items-center justify-between gap-12 md:grid-cols-2 place-items-center'>
                <div className='md:w-1/2 place-items-center '>
                    <div className='w-full'>
                        <img
                            src={'/faq.png'}
                            className='h-[300px] w-full rounded rounded-l-md object-cover md:h-[554px]'
                            alt='faq'
                        />
                    </div>
                </div>
                <div className='md:w-1/2 mt-5 md:mt-0'>
                    <p className='header_3 text-dark_text'>{i18n?.t('Frequently Asked Question')}</p>
                    <div className='  py-12 '>
                        {data?.docs.map((item) => (
                            <FaqItem key={item?._id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
