"use client"
import React from 'react';
import Banner from '../../../../components/theme2/common/banner';
import Signup from '../../../../components/theme2/login/signup';
import { useI18n } from '../../../providers/i18n';

function page() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Sign Up')} />
            <Signup />
        </>
    );
}

export default page;
