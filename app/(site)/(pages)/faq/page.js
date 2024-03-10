"use client"
import Banner from '../../../../components/theme2/common/banner';
import FAQ from '../../../../components/theme2/faq/faq';
import React from 'react';
import { useI18n } from '../../../providers/i18n';

const Faq = () => {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Faq')} />
            <div className='my-20 bg-white'>
                <div className='container'>
                    <div className='mb-16'>
                        <p className='header_2 text-center text-dark_text '>
                            {i18n?.t('Frequently Asked Questions')}
                        </p>
                    </div>
                    <FAQ />
                </div>
            </div>
        </>
    );
};

export default Faq;
