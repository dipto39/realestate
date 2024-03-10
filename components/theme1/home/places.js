import Link from 'next/link';
import React from 'react';
import { FiChevronRight, FiMapPin } from 'react-icons/fi';
import { useI18n } from '../../../app/providers/i18n';
import { useProperty } from '../../../app/contexts/property';

const Places = ({ theme1, jsonData }) => {
    const { setSearch, search } = useProperty();
    const i18n = useI18n();
    return (
        <section className='mt-0 md:mt-16 pt-16 pb-20'>
            <div className='project_section wrapper container mx-auto py-5 '>
                <div className=' w-full px-2 md:w-[545px] md:pb-24'>
                    <h2 className={`header_2 ${theme1 ? 'text-dark_text dark:text-white' : 'text-dark_text'}`}>
                        {jsonData?.explore_places?.heading}
                    </h2>
                    <p
                        className={`paragraph_1 py-8 text-secondary_text ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}
                    >
                        {' '}
                        {jsonData?.explore_places?.description}
                    </p>
                    <div className=' pb-5'>{/* <img src="./img/Arrow.png" alt="arrow"> */}</div>
                </div>
                <div className='relative'>
                    <div className='gap-3 md:flex'>
                        <div className='mb-5 basis-full md:mb-0 md:flex-shrink-0 md:basis-1/3'>
                            <div className='relative'>
                                <img
                                    className='-z-10 w-full md:max-h-[610px]'
                                    src={jsonData?.explore_places?.explore_place_one?.image}
                                    alt='Property'
                                />
                            </div>
                            <div className='px-2'>
                                <h2
                                    className={`header_4 pt-2 !font-bold ${theme1 ? 'text-zinc-800 dark:text-white' : 'text-zinc-800'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_one?.heading}
                                </h2>
                                <p
                                    className={`paragraph_1 py-3 text-secondary_text ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_one?.description}
                                </p>

                            </div>
                        </div>
                        <div className='mb-5 basis-full md:mb-0 md:mt-[-150px] md:flex-shrink-0 md:basis-1/3'>
                            <div className='relative'>
                                <img
                                    className='-z-10 w-full md:max-h-[610px]'
                                    src={jsonData?.explore_places?.explore_place_two?.image}
                                    alt='Property'
                                />
                            </div>
                            <div className='px-2'>
                                <h2
                                    className={`header_4 pt-2 !font-bold ${theme1 ? 'text-zinc-800 dark:text-white' : 'text-zinc-800'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_two?.heading}
                                </h2>
                                <p
                                    className={`paragraph_1 py-3 text-secondary_text ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_two?.description}
                                </p>

                            </div>
                        </div>
                        <div className='mb-5 basis-full md:mb-0 md:mt-[-300px] md:flex-shrink-0 md:basis-1/3'>
                            <div className='relative'>
                                <img
                                    className='-z-10 w-full md:max-h-[610px]'
                                    src={jsonData?.explore_places?.explore_place_three?.image}
                                    alt='Property'
                                />
                            </div>
                            <div className='px-2'>
                                <h2
                                    className={`header_4 pt-2 !font-bold ${theme1 ? 'text-zinc-800 dark:text-white' : 'text-zinc-800'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_three?.heading}
                                </h2>
                                <p
                                    className={`paragraph_1 py-3 text-secondary_text ${theme1 ? 'text-secondary_text dark:text-violet-100' : 'text-secondary_text'}`}
                                >
                                    {jsonData?.explore_places?.explore_place_three?.description}
                                </p>

                            </div>
                        </div>
                    </div>

                    <div className='flex w-full items-center justify-end md:float-right md:mt-[-32px] md:w-3/6'>
                        <div className='h-[2px] w-1/5 bg-slate-400 md:w-3/5'></div>
                        <p className={`px-3 text-lg ${theme1 ? 'text-dark_text dark:text-violet-100' : 'text-zinc-800'}`}>
                            {i18n?.t('Explore All Propertys')}
                        </p>
                        <Link onClick={() => setSearch(!search)}
                            href='/property'
                            className={`z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-all hover:bg-hover_color hover:text-white
                            ${theme1 ? 'text-secondary dark:text-white' : 'text-secondary_text'}`}
                        >
                            <FiChevronRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Places;
