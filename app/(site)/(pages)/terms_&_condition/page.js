"use client";
import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import Banner from '../../../../components/theme2/common/banner';
import { fetchSinglePage } from '../../../helpers/backend';
import { useFetch } from '../../../helpers/hooks';
import { useI18n } from '../../../providers/i18n';


const PrivacyPolicy = () => {
    const [data, getData, { loading }] = useFetch(fetchSinglePage, {}, false)

    useEffect(() => {
        getData({
            slug: 'terms_&_condition'
        })
    }, [])
    const i18n = useI18n();
    return (
        <div>
            <Banner title={i18n?.t('Terms & Condition')}></Banner>
            {
                loading ? <Skeleton active /> :
                    <div className='container mx-auto'>
                        <div className='paragraph_1 text-dark_text md:mt-10'>
                            <div
                                className='paragraph_1 text-dark_text md:py-8 py-4'
                                dangerouslySetInnerHTML={{ __html: data?.content }}
                                style={{ whiteSpace: 'pre-line' }}
                            />
                        </div>
                    </div>
            }

        </div>
    );
};

export default PrivacyPolicy;