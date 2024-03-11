"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useFetch } from '../../../app/helpers/hooks';
import { fetchSinglePage } from '../../../app/helpers/backend';
import { useI18n } from '../../../app/providers/i18n';

const WhoWeAre = ({ theme1 }) => {
    const i18n = useI18n()
    const [about, getAbout] = useFetch(fetchSinglePage, {}, false)

    useEffect(() => {
        getAbout({
            slug: 'about_us'
        })
    }, [])

    const jsonData = JSON.parse(about?.content || '{}')
    console.log("🚀 ~ WhoWeAre ~ jsonData:", jsonData)
    return (
        <div className="container">
            <div className="mx-auto flex flex-wrap mb-[8rem] mt-[5rem] ">
                <div className='md:w-[45%] w-full mb-5 h-[397px] md:h-[810px] lg:h-[530px]' >
                    <div className="relative">
                        <div className="w-[210px] h-[200px] md:w[476px] md:h-[444px] lg:w-[347px] lg:h-[367px] border-2 border-hover_color"></div>
                        { jsonData?.plan_design?.plan_design_image1[0]?.url ? <img alt="about" className="sm:w-[380px] h-[270px] w-[260px] md:ml-3 md:w-[740px] md:h-[710px] lg:h-[530px] lg:w-[490px] object-fill z-10 absolute top-10 left-7" src={jsonData?.plan_design?.plan_design_image1} /> :
                        jsonData?.plan_design?.plan_design_image1 ? <img alt="about" className="sm:w-[380px] h-[270px] w-[260px] md:ml-3 md:w-[740px] md:h-[710px] lg:h-[530px] lg:w-[490px] object-fill z-10 absolute top-10 left-7" src={jsonData?.plan_design?.plan_design_image1} /> : ''}
                    </div>
                </div>
                <div className="body md:pl-20 md:w-[55%] sm:mt-6 md:mt-0">
                    <h1 className={`mt-2 header_2 ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>{jsonData?.plan_design?.heading}</h1>
                    <p className={`mt-8 paragraph_1 ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}>
                        {jsonData?.plan_design?.description_1}
                    </p>
                    <p className={`mt-8 paragraph_1 ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}>
                        {jsonData?.plan_design?.description_2}
                    </p>
                    <div className="flex items-center mt-6">
                        <div className="h-[2px] w-2/5 bg-secondary_text"></div>
                        <p className={`pl-2 header_5 ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-dark_text'}`}>{i18n?.t('Contact Us')}</p>
                        <Link href="/contact" className="border rounded-full h-8 w-8 flex justify-center items-center ml-4  hover:bg-primary hover:text-white text-secondary_text transition-all">
                            <FiChevronRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoWeAre;