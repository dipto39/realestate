"use client"
import React, { useEffect } from 'react'
import { getAgentProperty } from '../../../app/helpers/backend';
import { useFetch } from '../../../app/helpers/hooks';
import { useSearchParams } from 'next/navigation';
import Gallery from '../property/gallery';
import Facilities from '../property/facilities';
import Details from '../property/details';
import Video from '../property/propertyDetails/video';
import Location from '../property/propertyDetails/location';
import TabDetails from '../property/propertyDetails/details';
import Plan from '../property/propertyDetails/plan';
import { useI18n } from '../../../app/providers/i18n';

const ViewProperty = ({ setActive }) => {
    const [singleData, getSingleData] = useFetch(getAgentProperty, {}, false);
    const propertyId = useSearchParams().get("_id");
    useEffect(() => {
        getSingleData({ _id: propertyId });
    }, [propertyId]);

    const i18n = useI18n();

    const data = [
        {
            id: 1,
            label: (
                <p className='header_5 text-secondary_text transition-all ease-in-out hover:text-primary'>
                    {i18n?.t('Property Details')}
                </p>
            ),
            children: <TabDetails singleData={singleData} />,
        },
        {
            id: 2,
            label: (
                <p className='header_5 text-secondary_text transition-all ease-in-out hover:text-primary'>
                    {i18n?.t('Property Plan')}
                </p>
            ),
            children: <Plan singleData={singleData} />,
        },
        {
            id: 3,
            label: (
                <p className='header_5 text-secondary_text transition-all ease-in-out hover:text-primary'>
                    {i18n?.t('Video')}
                </p>
            ),
            children: <Video singleData={singleData} />,
        },
        {
            id: 4,
            label: (
                <p className='header_5 text-secondary_text transition-all ease-in-out hover:text-primary'>
                    {i18n?.t('Location')}
                </p>
            ),
            children: <Location singleData={singleData} />,
        },
        // {
        //     id: 5,
        //     label: (
        //         <p className='header_5 text-secondary_text transition-all ease-in-out hover:text-primary'>
        //             Reviews
        //         </p>
        //     ),
        //     children: <Review singleData={singleData} />,
        // },
    ];


    return (
        <div>
            <div className=''>
                <div className='container'>
                    <Gallery singleData={singleData} />
                    <Facilities singleData={singleData} />
                </div>
                <Details data={data} singleData={singleData} />
            </div>
        </div>
    )
}

export default ViewProperty