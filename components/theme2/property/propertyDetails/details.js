"use client"
import React, { useEffect } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useFetch } from '../../../../app/helpers/hooks';
import { getAgentProperty } from '../../../../app/helpers/backend';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '../../../../app/providers/i18n';

const TabDetails = ({ singleData }) => {
    const i18n = useI18n();

    return (
        <div className='mt-6'>
            <p className='paragraph_3 pb-3 text-secondary_text'>
                {
                    singleData?.short_description
                }
            </p>
            <div dangerouslySetInnerHTML={{ __html: singleData?.description }}>
            </div>
            <div className='my-6'>
                <p className='paragraph_1 !font-bold text-dark_text'>{i18n?.t('Nearest Location')}</p>
                {
                    singleData?.nearest_location?.map((item, index) => <div key={index} className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        <p className='paragraph_1 text-secondary_text'>{i18n?.t('Location')}: {item?.location}</p>
                        <p className='paragraph_1 !font-bold text-dark_text'>{i18n?.t('Distance')}: {item?.distance}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default TabDetails;
