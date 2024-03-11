"use client";
import React, { useState } from 'react';
import SingleProperty from '../common/propertyCard';
import { useFetch } from '../../../app/helpers/hooks';
import { propertyList } from '../../../app/helpers/backend';
import Link from 'next/link';
import { useI18n } from '../../../app/providers/i18n';
import { useProperty } from '../../../app/contexts/property';
import SingelBtn from '../../common/btn/singelBtn';
import { usePathname } from 'next/navigation';

function Featured() {
    const { setSearch, search } = useProperty();

    const path = usePathname();

    const [active, setActive] = useState(1);
    const [data, getData] = useFetch(propertyList, { limit: 3 });
    const i18n = useI18n();

    return (
        <section className={`relative  ${path === '/home-3' ? 'md:pb-32 pb-16' : 'md:py-32 py-16'}`}>
            <div className='absolute left-5 top-5 opacity-80'>
                <img width='50' src='./fr.png' alt='' />
            </div>
            <div className='absolute right-5 top-5 opacity-80'>
                <img width='40' src='./fl.png' alt='' />
            </div>
            <div className='absolute bottom-5 right-5 opacity-80'>
                <img className='opacity-10' src='./br.png' alt='' />
            </div>
            <div className='container mx-auto '>
                <div className='mx-auto max-w-5xl text-center'>
                    <h1 className='header_2'>{i18n?.t('Featured Properties')}</h1>
                    <p className='paragraph-1 py-5 text-secondary_text'>
                        {i18n?.t(`These are the latest properties in the Sales category. You can create the list using the “latest listing shortcode” and show items by specific categories.`)}
                    </p>
                    <div className='space-x-3 space-y-3'>

                        <SingelBtn onClick={() => {getData({type: undefined}); setActive(1)}} className={`${active === 1 && "!bg-primary !text-white"}`}>
                            {i18n?.t('All Property')}
                        </SingelBtn>

                        <SingelBtn className={`${active === 2 && "!bg-primary !text-white"}`} onClick={() => {
                            getData({ type: "sale" })
                            setActive(2)
                        }} >
                            {i18n?.t('For Sale')}
                        </SingelBtn>

                        <SingelBtn className={`${active === 3 && "!bg-primary !text-white"}`} onClick={() => {
                            getData({ type: "rent" })
                            setActive(3)
                        }}>
                            {i18n?.t('For Rent')}
                        </SingelBtn>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-5 md:pb-12 pb-4 pt-12 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        data?.docs?.map((item) => <SingleProperty key={item._id} item={item} />)
                    }
                </div>
            </div>
        </section>
    );
}

export default Featured;
