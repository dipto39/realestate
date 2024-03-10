"use client";
import React, { useEffect } from 'react';
import Agents from '../../../../components/theme1/home/agents';
import Blogs from '../../../..//components/theme1/home/blogs';
import Featured from '../../../../components/theme1/home/featured/featured';
import FindProperty from '../../../../components/theme1/home/findProperty';
import Hero from '../../../../components/theme1/home/hero';
import HowItWorks from '../../../../components/theme1/home/howItWorks';
import Places from '../../../../components/theme1/home/places';
import Testimonial from '../../../../components/theme1/home/testimonial';
import WhoWeAre from '../../../../components/theme1/home/whoWeAre';
import { useFetch } from '../../../helpers/hooks';
import { fetchSinglePage } from '../../../helpers/backend';

const Home = () => {
    const [home, getHome] = useFetch(fetchSinglePage, {}, false)

    useEffect(() => {
        getHome({
            slug: 'home'
        })
    }, [])

    const jsonData = JSON.parse(home?.content || '{}')
    return (
        <main className='dark:bg-neutral-800 bg-white'>
            <Hero jsonData={jsonData} theme1={true} />
            <Places jsonData={jsonData} theme1={true} />
            <WhoWeAre theme1={true} />
            <HowItWorks theme1={true} />
            <Featured theme1={true} />
            {/* <FindProperty theme1={true} />  */}
            <Testimonial theme1={true} />
            <Agents />
            <Blogs theme1={true} />
        </main>
    );
};

export default Home;