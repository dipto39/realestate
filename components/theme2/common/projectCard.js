import Link from 'next/link';
import React from 'react';
import { FiChevronRight, FiMapPin } from 'react-icons/fi';

const SingleProject = () => {
    return (
        <div>
            <div className='relative'>
                <img className='-z-10 w-full md:max-h-[610px]' src='/place3.png' alt='Property' />
                <button className='absolute left-2 top-2 z-10 bg-white p-2 text-xs text-black'>
                    Condo
                </button>
                <Link
                    href=''
                    className='absolute bottom-5 right-5 z-50 flex h-8 w-8 items-center justify-center rounded-full border text-white transition-all hover:bg-orange-400'
                >
                    <FiChevronRight />
                </Link>
            </div>
            <div className='px-2'>
                <h2 className='header_4 pt-2 !font-bold'>Appstick Private Resort</h2>
                <p className='paragraph_1 py-3 text-secondary_text'>
                    A spa resort that provides a tranquil and serene setting, luxurious treatments,
                    and a holistic approach to wellness and health.
                </p>
                <div className='paragraph_1 flex items-center !font-bold'>
                    <span className='pr-3'>
                        <FiMapPin />
                    </span>{' '}
                    New York, New Jersey
                </div>
            </div>
        </div>
    );
};

export default SingleProject;
