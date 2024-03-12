"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { useFetch } from '../../../app/helpers/hooks';
import { agentsList } from '../../../app/helpers/backend';
import { usePathname, useRouter } from 'next/navigation';
import FrontPagination from '../common/pagination';
import { useI18n } from '../../../app/providers/i18n';

function Agents({theme2}) {
    const [data, getData, { loading }] = useFetch(agentsList);
    const router = useRouter();

    const path = usePathname();
    const i18n = useI18n();

    useEffect(() => {
        if (path === "/") {
            getData({ limit: 4 });
        }
        if (path === "/about") {
            getData({ limit: 4 });

        }
        if (path === "/home-3") {
            getData({ limit: 4 });

        }
        if (path === "/home-2") {
            getData({ limit: 4 });

        }
    }, [path])

    return (
        <section className={`relative ${(path !== '/agents' && path !== '/about') ? ` ${theme2 ? 'dark:bg-main_dark bg-white' : 'bg-gray_text'} py-10 md:py-20` : path === '/agents' ? 'py-20' : ''}`}>
            {
                path !== '/agents' &&  <>
                    <div className=' absolute left-5 top-1/2 hidden md:block'>
                        <img src='./element.png' alt='' />
                    </div>
                    <div className=' absolute bottom-0 left-5'>
                        <img width='150' src='./agl.png' alt='' />
                    </div>
                    <div className=' absolute right-0 top-0'>
                        <img width='100' src='./agr.png' alt='' />
                    </div>

                </>
            }

            <div className='container mx-auto'>
                <div className='my-10 text-center'>
                    <h1 className={`header_2 after:last: text-dark_text ${theme2 ? 'dark:text-white' : ''}`}>{i18n?.t('Meet Our Amazing Agents')}</h1>
                </div>
                <div className='grid min-h-[450px] grid-cols-1 items-center justify-center gap-5 md:grid-cols-2 lg:grid-cols-4'>

                    {
                        data?.docs?.map((data) =>
                            <div key={data?._id}>
                                <Link href={`/agents/view/${data?._id}`}>
                                    <div className='group relative md:hover:-translate-y-10 duration-300 lg:w-[270px] flex items-center justify-center w-auto rounded-full transition-all md:h-[400px]'>
                                        <div className='h-[270px] relative lg:w-[270px] w-full'>
                                            <img
                                                className='h-[270px] w-[270px] mx-auto rounded-full transition-all md:group-hover:h-[400px] group-hover:rounded-[100px]'
                                                src={data?.image}
                                                alt='man'
                                            />
                                            <div className='opacity-0 group-hover:opacity-100'>
                                                <h1 className=' header_5 absolute left-1/2 top-8 -translate-x-1/2 transform text-white'>
                                                    {data?.name}
                                                </h1>
                                                <div className='absolute -bottom-12 w-full text-white md:px-20 lg:px-10 px-28'>
                                                    <h1 className='pb-5 text-center cursor-pointer hover:underline header_5'
                                                        onClick={() => router.push(`/agents/view/${data?._id}`)}
                                                    >{data?.name}</h1>
                                                    <div className=' mb-8 flex justify-around md:mb-0'>
                                                        <span className='header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary'
                                                            onClick={() => window.open(`${data?.facebook}`, '_blank')}
                                                        >
                                                            <FaFacebookF></FaFacebookF>
                                                        </span>
                                                        <span className='header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary'
                                                            onClick={() => window.open(`${data?.twitter}`, '_blank')}
                                                        >
                                                            <FaTwitter></FaTwitter>
                                                        </span>
                                                        <span className='header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary'
                                                            onClick={() => window.open(`${data?.instagram}`, '_blank')}
                                                        >
                                                            <FaInstagram></FaInstagram>
                                                        </span>
                                                        <span className='header_5 cursor-pointer rounded-full border p-3 hover:bg-white hover:text-primary'
                                                            onClick={() => window.open(`${data?.linkedin}`, '_blank')}
                                                        >
                                                            <FaLinkedin />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                </div>

                {
                    path === '/agents' ? <div className='flex text-center justify-end mt-20'>
                        <FrontPagination totalPages={data?.totalPages} page={data?.page} total={data?.totalDocs} limit={data?.limit} onPageChange={(page) => getData({ "page": page })} />
                    </div> : <div className='my-8 text-center'>
                        <Link
                            href='/agents'
                            className='header_5 text-secondary_text hover:text-primary hover:underline'
                        >
                            {i18n?.t('View All')}
                        </Link>
                    </div>
                }


            </div>
        </section>
    );
}

export default Agents;
