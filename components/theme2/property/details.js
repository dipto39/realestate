"use client"
import { Tabs } from 'antd';
import React from 'react';
import Profile from '../common/profile';
import { useSearchParams } from 'next/navigation';

const Details = ({ data, singleData }) => {

    const propertyId = useSearchParams().get("_id");

    return (
        <div className='bg-[#F7F7FD] md:p-8 rounded-md'>
            <div className='container'>
                <div className={`${propertyId ? 'w-full' : 'grid grid-cols-1 md:gap-6 md:grid-cols-3 '}`}>
                    <div className='col-span-2 mb-4'>
                        <Tabs
                            animated={false}
                            defaultActiveKey='1'
                            items={data.map((item) => {
                                return {
                                    label: item.label,
                                    key: item.id,
                                    children: item.children,
                                };
                            })}
                        />
                    </div>
                    { !propertyId && <div className='col-span-1'>
                        <Profile data={singleData?.agent} />
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Details;
