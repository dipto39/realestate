"use client"
import React from 'react';
import LoginC from '../../../../components/theme2/login/login';
import Banner from '../../../../components/theme2/common/banner';
import { useI18n } from '../../../providers/i18n';
function Login() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Login')} />
            <LoginC />
        </>
    );
}

export default Login;
