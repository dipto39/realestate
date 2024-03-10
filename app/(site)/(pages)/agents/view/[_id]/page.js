"use client";
import Profile from '../../../../../../components/theme2/common/profile';
import React, { useEffect } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaStar,
    FaTwitter,
} from 'react-icons/fa';
import {
    FaLocationDot,
} from 'react-icons/fa6';
import { useFetch } from '../../../../../helpers/hooks';
import { agentDetail } from '../../../../../helpers/backend';
import Link from 'next/link';
import { useI18n } from '../../../../../providers/i18n';
import Banner from '../../../../../../components/theme2/common/banner';

const FrontAgentDetails = ({ params }) => {

    const [data, getData] = useFetch(agentDetail, {}, false);
    useEffect(() => {
        getData({ _id: params._id });
    }, [data?._id]);

    const i18n = useI18n();

    return (
        <section>
            <Banner title={i18n?.t(`Agent’s Details`)}></Banner>
            <div className='container mx-auto md:flex block gap-5 py-20 lg:py-32'>
                <div className='basis-2/3'>
                    <div className='relative rounded-lg border p-5 '>
                        <div className='absolute right-3 top-2'>
                            <img src='/box_45.png' alt='' />
                        </div>
                        <div className='lg:flex block gap-10'>
                            <div className=''>
                                <img className='h-[350px] w-[300px] rounded-md' src={data?.image} alt='' />
                            </div>
                            <div className=''>
                                <h1 className='header_4_bold text-dark_text'>{data?.name}</h1>
                                <p className='paragraph_1 my-2 text-secondary_text'>
                                    {data?.uid}
                                </p>
                                <div className=''>
                                    <p className='paragraph_1 flex items-center py-2  text-dark_text'>
                                        <span className='pe-2'>
                                            <FaPhone />
                                        </span>
                                        {data?.phone}
                                    </p>
                                    <p className='paragraph_1 flex items-center py-2  text-dark_text'>
                                        <span className='pe-2'>
                                            <AiOutlineMail />
                                        </span>
                                        {data?.email}
                                    </p>
                                    <p className='paragraph_1 flex items-center py-2  text-dark_text'>
                                        <span className='pe-2'>
                                            <FaLocationDot />
                                        </span>
                                        {data?.address}
                                    </p>
                                </div>
                                <div className='flex pt-5 md:mt-20'>
                                    <Link href={data?.twitter || ''} target='_blank' className='mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray_text transition-all duration-300 ease-in hover:bg-primary_lite hover:text-primary'>
                                        <FaTwitter />
                                    </Link>
                                    <Link href={data?.facebook || ''} target='_blank' className='mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray_text transition-all duration-300 ease-in hover:bg-primary_lite hover:text-primary'>
                                        <FaFacebook />
                                    </Link>
                                    <Link href={data?.instagram || ''} target='__blank' className='mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray_text transition-all duration-300 ease-in hover:bg-primary_lite hover:text-primary'>
                                        <FaInstagram />
                                    </Link>
                                    <Link href={data?.linkedin || ''} target='_blank' className='mr-5 flex h-12 w-12 items-center justify-center rounded-full bg-gray_text transition-all duration-300 ease-in hover:bg-primary_lite hover:text-primary'>
                                        <FaLinkedin />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='absolute bottom-20 right-10 '>
                            <img className=' object-cover' src='/star2.png' alt='' />
                        </div>
                    </div>
                    <div className="my-10">
                        <h1 className='header_4_bold text-dark_text pb-6'>{i18n?.t('About Me')}</h1>
                        <p className='paragraph_4 text-secondary_text'>{data?.about}</p>
                    </div>
                </div>
                <div className='basis-1/3'>
                    <Profile data={data} />
                </div>
            </div>
        </section>
    );
};

export default FrontAgentDetails;