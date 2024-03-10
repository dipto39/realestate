"use client";
import React, { useEffect, useState } from 'react';
import { blogDetails } from '../../../../../helpers/backend';
import Single_news from '../../../../../../components/theme2/news/single_news';
import { useFetch } from '../../../../../helpers/hooks';

const NewsDetails = ({ params }) => {
    const [data, getData] = useFetch(blogDetails, {}, false);
    const [url, setUrl] = useState("");

    useEffect(() => {
        setUrl(window.location.href);
        getData({ _id: params._id });
    }, [data?._id]);
    return (
        <div className='py-20'>
            <Single_news data={data} url={url} />
        </div>
    );
};

export default NewsDetails;