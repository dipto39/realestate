    "use client";
    import React from 'react';
    import { useFetch } from '../../../app/helpers/hooks';
    import { blogListCategories, fetchSiteSettings } from '../../../app/helpers/backend';
    import { useI18n } from '../../../app/providers/i18n';
    import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
    import { FaFacebook, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
    import Link from 'next/link';

    const NewsCategory = ({ getData }) => {
        const [category, getCategory] = useFetch(blogListCategories);
        const i18n = useI18n();
        const [settings, getSettings] = useFetch(fetchSiteSettings)

        return (
            <>
                <div className="bg-[#fafafd] p-4 mb-5 rounded-md">
                    <div className='flex justify-between items-center font-libre_baskerville  text-dark_text'>
                        <span className="text-3xl pb-5">{i18n?.t('Blog Categories')}</span>
                        <span className="text-md pb-5 cursor-pointer hover:underline hover:text-primary"
                            onClick={() => getData({ "category": undefined })}>{i18n?.t('Clear')}</span>
                    </div>

                    <div className="text-secondary_text">

                        {
                            category?.map((item, index) => (
                                <div key={index} className="flex justify-between items-center w-full paragraph_1 py-3">
                                    <p className="basis-2/6 cursor-pointer hover:underline hover:text-primary"
                                        onClick={() =>
                                            getData({ "category": item?._id })
                                        }
                                    >{item.categoryName}</p>
                                    <span className="basis-2/6 h-[2px] w-full bg-gray_text"></span>
                                    <p>({item.count})</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='bg-[#fafafd] p-4 mt-6'>
                    <p className="text-2xl font-libre_baskerville font-bold  pr-2 text-dark_text">{i18n?.t('Follow Us')}</p>
                    <div className='flex items-center gap-5 mt-7'>
                        <Link
                            href={settings?.linkedin || ''}
                            target='_blank'
                            className='flex items-center p-3 rounded-full bg-[#003049] bg-opacity-10 justify-center  text-dark_text  transition-all hover:text-hover_color'
                        >
                            <FaLinkedinIn className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.instagram || ''}
                            target='_blank'
                            className=' p-3 rounded-full bg-[#003049] bg-opacity-10 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                        >
                            <AiFillInstagram className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.facebook || ''}
                            target='_blank'
                            className=' p-3 rounded-full bg-[#003049] bg-opacity-10 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                        >
                            <FaFacebook className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.twitter || ''}
                            target='_blank'
                            className=' p-3 rounded-full bg-[#003049] bg-opacity-10 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                        >
                            <AiOutlineTwitter className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.youtube || ''}
                            target='_blank'
                            className=' p-3 rounded-full bg-[#003049] bg-opacity-10 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                        >
                            <FaYoutube className='text-2xl' />
                        </Link>
                    </div>
                </div>  
            </>
        );
    };

    export default NewsCategory;