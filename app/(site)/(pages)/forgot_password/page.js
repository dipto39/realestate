"use client"
import Banner from '../../../../components/theme2/common/banner';
import Forgot_password from '../../../../components/theme2/login/forgot_password';
import React from 'react';
import { useI18n } from '../../../providers/i18n';

function Forgot_Password() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Forgot Password')} />
            <Forgot_password />
        </>
    );
}

export default Forgot_Password;
