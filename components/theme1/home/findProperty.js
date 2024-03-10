import Link from 'next/link';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

const FindProperty = ({ theme1 }) => {
    return (
        <section className='my-20'>
            <div className='container mx-auto block items-center justify-between md:flex'>
                <div className='relative order-first basis-1/2'>
                    <img className='h-[738px] w-[600px]' src='/sydney.png' alt='' />
                    <p className='header_8 absolute left-10 top-8 text-white'>Syndey, Australia</p>
                    <div className='absolute bottom-10 left-10  w-full flex-col items-center justify-start text-white'>
                        <div className='pr-4'>
                            <p className='header_4'>Total Property: 124</p>
                        </div>

                        <div className='my-3 flex w-9/12 items-center'>
                            <div className='h-[2px] w-3/6 bg-secondary_text'></div>
                            <p className='header_5 pl-2'>Find Property</p>
                            <Link
                                href='#'
                                className='ml-4 flex h-8 w-8 items-center justify-center rounded-full border text-secondary_text transition-all hover:bg-primary hover:text-white'
                            >
                                <FiChevronRight />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='order-last basis-1/2'>
                    <div className='px-2'>
                        <div className='md:w-5/6'>
                            <h2 className={`header_2 ${theme1 ? 'text-white' : 'text-dark_text'}`}>
                                Find property in your location
                            </h2>
                        </div>
                        <p
                            className={`paragraph_1 py-8 ${theme1 ? 'text-violet-100' : 'text-secondary_text'}`}
                        >
                            A residential project that offers affordable and spacious apartments
                            with modern amenities and scenic views. The project aims to provide
                            quality housing for middle-income families in a convenient and safe
                            location.
                        </p>
                        <div className='relative'>
                            <img
                                className='h-[313px] w-full object-cover'
                                src='/newYork.png'
                                alt=''
                            />
                            <p className='header_4 absolute bottom-4 left-4 text-white'>New York</p>
                        </div>
                        <div className=' mt-10'>
                            {/* <img src="./img/Arrow.png" alt="arrow"> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FindProperty;
