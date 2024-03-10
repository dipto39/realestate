"use client"
import React from 'react';
import Banner from '../../../../components/theme2/common/banner';
import Contact from '../../../../components/theme2/home/contact';
import Mapp from '../../../../components/theme2/contact/map';
import { useI18n } from '../../../providers/i18n';
function ContactUs() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t('Contact Us')} />
            <Contact />
            <Mapp />
        </>
    );
}

export default ContactUs;
