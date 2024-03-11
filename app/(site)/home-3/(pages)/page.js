"use client";
import About from '../../../../components/theme2/home/about';
import Hero from '../../../../components/theme2/home/hero';
import Service from '../../../../components/theme2/home/service';
import React, { useEffect } from 'react';
import Places from '../../../../components/theme1/home/places';
import Testimonial from '../../../../components/theme2/home/testimonial';
import Blogs from '../../../../components/theme2/home/blogs';
import Contact from '../../../../components/theme2/home/contact';
import CompletedProject from '../../../../components/theme2/home/completedProject';
import Featured from '../../../../components/theme2/home/featured';
import Agents from '../../../../components/theme2/home/agents';
import { useFetch } from '../../../helpers/hooks';
import { agentsList, fetchSinglePage } from '../../../helpers/backend';
import { usePathname } from 'next/navigation';

const Home = () => {
    const [home, getHome] = useFetch(fetchSinglePage, {}, false)

    const [data, getData, { loading }] = useFetch(agentsList, {}, false);
    const path = usePathname();
    useEffect(() => {

        if (path === "/home-3") {
            getData({ limit: 4 });
        }
    }, [path]);
    useEffect(() => {
        localStorage.removeItem('theme')
        
    }, [])
    const jsonData = JSON.parse(home?.content || '{}')
    return (
        <>
            <Hero jsonData={jsonData} home3={true}></Hero>
            <About></About>
            <Service></Service>
            <Featured></Featured>
            <CompletedProject jsonData={jsonData}></CompletedProject>
            <Places jsonData={jsonData} home3={false}></Places>
            <Agents data={data} getData={getData} loading={loading} />
            <Contact />
            <Testimonial />
            <Blogs />
        </>
    );
};
export default Home;
