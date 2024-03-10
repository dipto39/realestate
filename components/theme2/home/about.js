"use client"
import React, { useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { useFetch } from '../../../app/helpers/hooks';
import { fetchSinglePage } from '../../../app/helpers/backend';
import Link from 'next/link';
import { useI18n } from '../../../app/providers/i18n';
import { useProperty } from '../../../app/contexts/property';
import { Timeline } from 'antd';
import Btn from '../../common/btn/btn';


const About = () => {
    const { search, setSearch } = useProperty();
    const [about, getAbout] = useFetch(fetchSinglePage, {}, false)
    const i18n = useI18n();
    useEffect(() => {
        getAbout({
            slug: 'about_us'
        })
    }, [])

    const jsonData = JSON.parse(about?.content || '{}')

    return (
        <div className='aboutus relative py-32'>
            <div className='container mx-auto '>
                <img className='absolute left-2 top-0 -z-10' src='./dot_small.png' alt='' />
                <div className='justify-between items-center lg:flex gap-6'>
                    <div className='relative basis-1/2 pr-10 overflow-hidden'>
                        <div className='mx-auto h-96 w-96 border-4 border-slate-600'>
                            <img
                                className='absolute -bottom-10 -left-10 -z-10'
                                src='./dot.png'
                                alt=''
                            />
                            {/* <div className='absolute left-4 top-10 hidden lg:block'>
                                <img className='object-cover' src={jsonData?.plan_design?.plan_design_image[0]} alt='' />
                            </div> */}
                            {jsonData?.plan_design?.plan_design_image[0]?.url ?
                                <img className='h-full w-full lg:h-auto lg:w-auto' src={jsonData?.plan_design?.plan_design_image[0]?.url} alt="" />
                                :
                                <img className='w-full' src={jsonData?.plan_design?.plan_design_image[0]} alt="" />
                            }
                            <div className=' left-72 top-10 z-20 lg:absolute '>
                                {/* <img
                                    className='h-full w-full lg:h-auto lg:w-auto'
                                    src={jsonData?.plan_design?.plan_design_image[1]}
                                    alt=''
                                /> */}
                                {jsonData?.plan_design?.plan_design_image[1]?.url ?
                                    <img className='h-full w-full lg:h-auto lg:w-auto' src={jsonData?.plan_design?.plan_design_image[1]?.url} alt="" />
                                    :
                                    <img className='w-full' src={jsonData?.plan_design?.plan_design_image[1]} alt="" />
                                }

                            </div>
                        </div>
                    </div>
                    <div className=' basis-1/2 p-3  md:p-0'>
                        <div className='relative'>
                            <img
                                className='absolute left-1/3 top-[-60px]'
                                src='./group_star.png'
                                alt=''
                            />
                            <div className='space-y-5 md:space-y-8'>
                                <div>
                                    <h1 className='header_2 text-dark_text'>
                                        {jsonData?.plan_design?.heading}
                                    </h1>

                                </div>
                                <div className='flex gap-3 items-center border-l-4 border-primary pl-4'>
                                    {/* <div className='flex h-[140px] w-[15px] bg-primary'></div> */}
                                    <div className='flex flex-col'>
                                        <div className='me-5 w-4 bg-primary'></div>
                                        <p className='paragraph_1  text-secondary_text'>
                                            {jsonData?.plan_design?.description_1}
                                        </p>
                                        <p className='paragraph_1  text-secondary_text'>
                                            {jsonData?.plan_design?.description_2}
                                        </p>
                                    </div>
                                    {/* <Timeline items={[
                                        {
                                            children: <p className='paragraph_1  text-secondary_text'>
                                            {jsonData?.plan_design?.description_1}
                                        </p>
                                        },
                                        {
                                            children:  <p className='paragraph_1  text-secondary_text'>
                                            {jsonData?.plan_design?.description_2}
                                        </p>
                                        }
                                    ]} /> */}

                                </div>
                                {/* <Link href='/property' onClick={() => setSearch(!search)}  className='header_5 rounded-sm  rounded-tr-3xl bg-primary px-7 py-3 text-lg text-white transition-all ease-in-out hover:bg-hover_color flex justify-center items-center w-fit'>
                                    <button>
                                    {i18n?.t('View More')}
                                    </button>
                                </Link> */}
                                <div>

                                    <Link href='/property' onClick={() => setSearch(!search)}>
                                        <Btn>
                                            <h1 className='header_5 text-white'>{i18n.t('Find Property')}</h1>
                                        </Btn>
                                    </Link>
                                </div>
                                <div className='absolute -bottom-10 right-52'>
                                    <img src='./drow.png' alt='drow' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default About;
