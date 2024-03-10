"use client";
import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { fetchAdminProperty } from '../../../../../helpers/backend';
import { useFetch } from '../../../../../helpers/hooks';
import PageTitle from '../../../../../../components/common/title';
import { PropertyForm } from '../../add/page';

const EditAdminProperty = ({ params }) => {
    const [form] = Form.useForm();
    const [data, getData] = useFetch(fetchAdminProperty, {}, false);
    const [selectedCountry, setSelectedCountry] = useState('')
    const [isEdit, setIsEdit] = useState(true)

    console.log('data', data)

    useEffect(() => {
        getData({ _id: params?._id });
        if (data) {
            form.setFieldsValue({
                ...data,
                description: data?.description,
                category: data?.category?._id,
                additional_info: data?.additional_info?.map((additional_info) => additional_info._id),
                images: data?.images?.map((img, index) => ({
                    uid: `-${index + 1}`,
                    name: img,
                    status: 'done',
                    url: img,
                })),
                thumb_image: data?.thumb_image?.length > 0
                    ? [
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: data?.thumb_image,
                        },
                    ]
                    : [],
                video: data?.video?.length > 0
                    ? [
                        {
                            uid: '-1',
                            name: 'video.mp4',
                            status: 'done',
                            url: data?.video,
                        },
                    ]
                    : [],
                nearest_location: data?.nearest_location?.map((nearest_location) => ({
                    location: nearest_location.location,
                    distance: nearest_location.distance,
                })),
                property_plan: data?.property_plan?.map((property_plan) => ({
                    property_name: property_plan.property_name,
                    property_image: property_plan.property_image?.length > 0
                        ? [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: property_plan.property_image,
                            },
                        ]
                        : [],

                })),
            });
        }
    }, [data?._id]);
    return (
        <div>
            <PageTitle title={"Edit Property"} />
            <div className="border rounded-md p-4 bg-white shadow-md">
                <PropertyForm form={form}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
};

export default EditAdminProperty;