"use client";
import Banner from '../../../../components/theme2/common/banner';
import FAQ from '../../../../components/theme2/faq/faq';
import Agents from '../../../../components/theme2/home/agents';
import React from 'react';
import { useI18n } from '../../../providers/i18n';

function page() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Agents')} />
            <Agents />
            <div className='container'>
                <FAQ />
            </div>
        </>
    );
}

export default page;
