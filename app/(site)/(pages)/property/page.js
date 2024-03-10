"use client";
import React, { useEffect } from 'react';
import { propertyList } from '../../../helpers/backend';
import { useFetch } from '../../../helpers/hooks';
import FrontPagination from '../../../../components/theme2/common/pagination';
import Banner from '../../../../components/theme2/common/banner';
import SingleProperty from '../../../../components/theme2/common/propertyCard';
import Sidebar from '../../../../components/theme2/common/sidebar';
import { useProperty } from '../../../contexts/property';
import { Form, Spin } from 'antd';
import { useI18n } from '../../../providers/i18n';

const Property = () => {
    // const [data, getData] = useFetch(propertyList);
    const { data, getData, loading } = useProperty()
    const i18n = useI18n()

    return (
        <>
            <Banner title={i18n?.t('Properties')} />
            <div className='py-16 md:py-32'>
                <div className='container'>
                    <div className='col-span-1 grid grid-cols-1 gap-4 lg:grid-cols-3'>
                        <div className='sidebar flex flex-col items-center justify-start'>
                            <Sidebar data={data} getData={getData} />
                        </div>
                        <div className='sm:col-span-2 '>
                            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2'>
                                {data?.docs?.length > 0 ?
                                    data?.docs?.map((item) => <SingleProperty key={item._id} item={item} />)
                                    : loading ? <Spin size="large" className='col-span-2 mx-auto' /> : <p className='text-center header_3 py-6 col-span-2'>{i18n?.t('Property Not Found!!!')}</p>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-20'>
                        <FrontPagination totalPages={data?.totalPages} page={data?.page} total={data?.totalDocs} limit={data?.limit} onPageChange={(page) => getData({ "page": page })} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Property;