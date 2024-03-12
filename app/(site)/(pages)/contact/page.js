"use client"
import React, { useEffect } from 'react';
import Banner from '../../../../components/theme2/common/banner';
import Contact from '../../../../components/theme2/home/contact';
import Mapp from '../../../../components/theme2/contact/map';
import { useI18n } from '../../../providers/i18n';
import { useFetch } from '../../../helpers/hooks';
import { fetchSinglePage } from '../../../helpers/backend';
function ContactUs() {
    const i18n = useI18n();

    const [about, getAbout] = useFetch(fetchSinglePage, {}, false)

    useEffect(() => {
        getAbout({
            slug: 'contact_us'
        })
    }, [])

    return (
        <>
            <Banner title={i18n?.t('Contact Us')} />
            <div className='flex justify-center items-center'>
                <Contact />
            </div>
            <Mapp about={about} />
        </>
    );
}

export default ContactUs;
