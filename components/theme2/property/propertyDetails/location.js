import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { useI18n } from '../../../../app/providers/i18n';

const Location = ({singleData}) => {
    const i18n = useI18n();
    return (
        <div className='mt-12'>
            <div className=''>
                <div className='flex rounded-md bg-white p-5'>
                    <div className='flex flex-col justify-start pl-4 pt-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary_lite '>
                            <FiMapPin className='text-[32px] text-primary ' />
                        </div>
                        <p className='header_4_bold mt-8 text-dark_text'>{i18n?.t('Address')}</p>
                        <p className='paragraph_1 mt-4 text-secondary_text'>
                            {singleData?.address}
                        </p>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Location;
