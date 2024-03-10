"use client";
import React, { useEffect } from 'react';
import { useFetch } from '../../../app/helpers/hooks';
import { getServiceList } from '../../../app/helpers/backend';
import { useI18n } from '../../../app/providers/i18n';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import FrontPagination from '../../theme2/common/pagination';

const HowItWorks = ({ theme1 }) => {
    const [services, getServices] = useFetch(getServiceList, { limit: 6 })
    const i18n = useI18n();

    const path = usePathname();

    useEffect(() => {
        if (path === '/services') {
            getServices({
                limit: undefined
            })
        }
    }, [path])

    return (
        <section className=' mb-16'>
            <div className='how_its_works container mx-auto py-6'>
                <div className='mb-14 px-2 !text-center'>
                    <h2
                        className={`header_2 mb-6 text-center ${theme1 ? 'dark:text-white' : 'text-dark_text'}`}
                    >
                        {i18n.t('We provide the best service for you')}
                    </h2>

                </div>
                <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>

                    {services?.docs?.map((item, index) => (
                        <div className=' bg-tertiary p-5 text-white' key={index}>
                            <div className=''>
                                <img src={item?.icon} alt='' />
                            </div>
                            <div className='flex py-4 pr-8 text-light_text'>
                                <h1 className='header_4'>{index + 1}</h1>
                                <h2 className='header_3 ml-5'>{item?.name}</h2>
                            </div>
                            <hr className='pb-5' />
                            <p className='paragraph_1 text-light_text'>
                                {item?.description}
                            </p>
                        </div>
                    ))}


                </div>
                {
                    path === '/services' ? <div className='flex justify-center mt-12'>
                        <FrontPagination totalPages={services?.totalPages} page={services?.page} total={services?.totalDocs} limit={services?.limit} onPageChange={(page) => getServices({ "page": page })} />
                    </div> :
                        <div className='text-center text-dark_text dark:text-white mt-10'>
                            <Link className='underline' href='/services'>
                                {i18n?.t('View More')}
                            </Link>
                        </div>
                }
            </div>
        </section>
    );
};

export default HowItWorks;
