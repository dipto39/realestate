import React from 'react';
import { useI18n } from '../../../../app/providers/i18n';


const Plan = ({ singleData }) => {
    const i18n = useI18n();

    return (
        <div className='mt-12 grid grid-cols-2'>
            
            {
                singleData?.property_plan?.map((item, index) => <div key={index} className='mt-4'>
                    <p className='paragraph_1 text-secondary_text mb-3'>Name: {item?.property_name}</p>
                    <div className='flex items-start gap-5'>
                        <p className='paragraph_1 !font-bold text-secondary_text mb-3'>{i18n?.t('Image')} {index + 1}:</p>

                        <img src={item?.property_image} alt='' className='w-32 h-32 object-contain' />
                    </div>
                </div>)
            }
        </div>
    );
};

export default Plan;
