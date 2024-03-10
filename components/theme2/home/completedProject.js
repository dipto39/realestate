'use client';
import React from 'react';
import CountUp from 'react-countup';

function CompletedProject({ jsonData }) {
    return (
        <section className=' bg-secondary py-20 md:py-32'>
            <div style={{ fontSize: '150px' }}></div>
            <div className='container mx-auto justify-between  text-center text-white flex flex-col md:flex-row'>
                <div className='basis-1/4'>
                    <h1 className='header_3 pb-2'>
                        <CountUp start={0} end={jsonData?.achievements?.renovation_count} duration={3} enableScrollSpy={true} /> k+
                    </h1>
                    <p className='paragraph_3'>{jsonData?.achievements?.renovation}</p>
                </div>
                <div className='my-5 basis-1/4 md:my-0 md:border-x-2 md:border-primary'>
                    <h1 className='header_3 pb-2'>
                        <CountUp start={0} end={jsonData?.achievements?.agents_count} duration={3} enableScrollSpy={true} /> +
                    </h1>
                    <p className='paragraph_3'>{jsonData?.achievements?.agents}</p>
                </div>
                <div className='mb-5 basis-1/4 md:mb-0 md:border-r-2 md:border-primary'>
                    <h1 className='header_3 pb-2'>
                        <CountUp start={0} end={jsonData?.achievements?.project_count} duration={3} enableScrollSpy={true} /> k+
                    </h1>
                    <p className='paragraph_3'>{jsonData?.achievements?.project}</p>
                </div>
                <div className='basis-1/4'>
                    <h1 className='header_3 pb-2'>
                        <CountUp start={0} end={jsonData?.achievements?.satisfied_clients_count} duration={3} enableScrollSpy={true} /> %
                    </h1>
                    <p className='paragraph_3'>{jsonData?.achievements?.satisfied_clients}</p>
                </div>
            </div>
        </section>
    );
}

export default CompletedProject;
