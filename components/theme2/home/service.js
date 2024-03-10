"use client";
import React, { useEffect } from 'react';
import SingleService from '../common/serviceCard';
import { useFetch } from '../../../app/helpers/hooks';
import { getServiceList } from '../../../app/helpers/backend';
import { useI18n } from '../../../app/providers/i18n';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FrontPagination from '../common/pagination';



const Service = () => {
    const [services, getServices] = useFetch(getServiceList, { limit: 6 })
    const path = usePathname();

    useEffect(() => {
        if (path === '/services') {
            getServices({
                limit: undefined
            })
        }
    }, [path])

    const i18n = useI18n();
    return (
        <section className={`relative ${path === '/' && 'bg-secondary'} py-16`}>
            <div className='absolute left-5 top-5'>
                <img src='./elament2.png' alt='' />
            </div>
            <div className='absolute right-9 top-5'>
                <img className='hidden md:block' src='./ret.png' alt='' />
            </div>
            <div className='absolute bottom-2 left-5'>
                <img src='./element (1).png' alt='' />
            </div>
            <div className='absolute bottom-5 right-5'>
                <img width='72' src='./element_big2.png' alt='' />
            </div>
            <div className='container mx-auto '>
                <div className='py-8 flex justify-center'>
                    <h1 className={`text-center header_2 lg:w-[56%]  ${path !== '/' ? 'text-dark_text' : 'text-white'}`}>
                        {i18n?.t('We provide the best service for you')}
                    </h1>
                </div>
                <div className='grid grid-cols-1 gap-5 pb-10 md:grid-cols-2 lg:grid-cols-3'>
                    {services?.docs?.map((item, index) => (
                        <SingleService key={index} item={item} />
                    ))}

                </div>

                {
                    path === '/services' ? <div className='flex justify-center mt-12'>
                        <FrontPagination totalPages={services?.totalPages} page={services?.page} total={services?.totalDocs} limit={services?.limit} onPageChange={(page) => getServices({ "page": page })} />
                    </div> :
                    <div className='text-center text-white'>
                        <Link className='underline hover:text-primary' href='/services'>
                            {i18n?.t('View More')}
                        </Link>
                    </div>
                }
            </div>
        </section>
    );
};

export default Service;


