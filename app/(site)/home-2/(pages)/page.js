"use client";
import React, { useEffect } from 'react';
// import Agents from '../../../../components/theme1/home/agents';
import Blogs from '../../../..//components/theme1/home/blogs';
import Featured from '../../../../components/theme1/home/featured/featured';
import FindProperty from '../../../../components/theme1/home/findProperty';
import Hero from '../../../../components/theme1/home/hero';
import HowItWorks from '../../../../components/theme1/home/howItWorks';
import Places from '../../../../components/theme1/home/places';
import Testimonial from '../../../../components/theme1/home/testimonial';
import WhoWeAre from '../../../../components/theme1/home/whoWeAre';
import { useFetch } from '../../../helpers/hooks';
import { agentsList, fetchSinglePage } from '../../../helpers/backend';
import { usePathname } from 'next/navigation';
import Agents from '../../../../components/theme2/home/agents';

const Home = () => {
    const [home, getHome] = useFetch(fetchSinglePage, {}, false)
    const [data, getData, { loading }] = useFetch(agentsList, {}, false);
    const path = usePathname();
    useEffect(() => {
        getHome({
            slug: 'home'
        })
    }, [])

    useEffect(() => {
        if (path === "/") {
            getData({ limit: 4 });
        }
        if (path === "/home-2") {
            getData({ limit: 4 });
        }
    }, [path]);

    const jsonData = JSON.parse(home?.content || '{}')
    return (
        <main className='dark:bg-main_dark bg-white'>
            <Hero jsonData={jsonData} theme1={true} />
            <Places jsonData={jsonData} theme1={true} />
            <WhoWeAre theme1={true} />
            <HowItWorks theme1={true} />
            <Featured loading={loading} theme1={true} />
            {/* <FindProperty theme1={true} />  */}
            <Testimonial theme1={true} />
            {/* <Agents data={data} /> */}
            <Agents theme2={true} />
            <Blogs theme1={true} />
        </main>
    );
};

export default Home;