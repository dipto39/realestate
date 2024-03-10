"use client";
import Pricing1 from '../../../../components/pricing/pricing';
import Banner from '../../../../components/theme2/common/banner';
import React from 'react';
import { useI18n } from '../../../providers/i18n';


const data = [
    {
        id: 1,
        plan: 'Basic',
        price: '$0',
        title: 'Free',
        image: '/price1.png',
        list: [
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
        ],
    },
    {
        id: 2,
        plan: 'Standard',
        price: '$30',
        title: '$3o',
        image: '/price2.png',
        list: [
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
        ],
    },
    {
        id: 3,
        plan: 'Premium',
        price: '$100',
        title: '$100',
        image: '/price1.png',
        list: [
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
            'Full Access to the Library',
        ],
    },
];

const Pricing = () => {
    const i18n = useI18n();

    return (
        <>
            <Banner title={i18n?.t('Pricing Plan')} />
            <Pricing1></Pricing1>
        </>
    );
};

export default Pricing;
