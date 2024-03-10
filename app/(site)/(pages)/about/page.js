"use client";
import React, { useEffect } from 'react';
import Banner from '../../../../components/theme2/common/banner';
import About from '../../../../components/theme2/home/about';
import Service from '../../../../components/theme2/home/service';
import Agents from '../../../../components/theme2/home/agents';
import Testimonial from '../../../../components/theme2/home/testimonial';
import Blogs from '../../../../components/theme2/home/blogs';
import { fetchSinglePage } from '../../../helpers/backend';
import { useFetch } from '../../../helpers/hooks';
import Timeline from '../../../../components/theme2/about/timeline';
import { useI18n } from '../../../providers/i18n';


const AboutUs = () => {

    const [about, getAbout] = useFetch(fetchSinglePage, {}, false)

    useEffect(() => {
        getAbout({
            slug: 'about_us'
        })
    }, [])
    const i18n = useI18n();

    const jsonData = JSON.parse(about?.content || '{}')
    
    return (
        <>
            <Banner title={i18n?.t('About Us')}></Banner>
            <About />
            <Timeline jsonData={jsonData} />
            <Service />
            <Agents />
            <Testimonial />
            <Blogs />
        </>
    );
};

export default AboutUs;
