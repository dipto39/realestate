"use client";
import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../../../components/common/title';
import { useAction, useFetch } from '../../../../../helpers/hooks';
import { fetchAdminProperty, postPropertyStatus } from '../../../../../helpers/backend';
import { DetailTable, TableImage } from '../../../../../../components/common/table';
import { Form, Select } from 'antd';
import { useI18n } from '../../../../../providers/i18n';
import FormSelect from '../../../../../../components/form/select';
import Button from '../../../../../../components/common/button';
import { useRouter } from 'next/navigation';

const AdminPropertyView = ({ params }) => {
    const [data, getData] = useFetch(fetchAdminProperty, {}, false);
    const [image, setImage] = useState(0)
    const router = useRouter()
    const [form] = Form.useForm()
    const i18n = useI18n()

    useEffect(() => {
        getData({ _id: params._id });
        form.setFieldsValue({ status: data?.status })
    }, [data?._id]);
    return (
        <div>
            <PageTitle item="Property Details" />
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <DetailTable
                        title="Property Details"
                        columns={[
                            { text: 'Agent', dataIndex: 'agent', formatter: (_, d) => <><p>{d?.agent?.name}</p> <p>{d?.agent?.email}</p> <p>{d?.agent?.phone}</p> </> },
                            { text: 'Title', dataIndex: 'title' },
                            { text: 'Price', dataIndex: 'price' },
                            { text: 'Type', dataIndex: 'type' },
                            { text: 'Category', dataIndex: 'category', formatter: (_, d) => d?.category?.name },
                            { text: 'Area', dataIndex: 'area' },
                            { text: 'Unit', dataIndex: 'unit' },
                            { text: 'Bedrooms', dataIndex: 'bedrooms' },
                            { text: 'Bathrooms', dataIndex: 'bathrooms' },
                            { text: 'Garage', dataIndex: 'garage' },
                            { text: 'Kitchen', dataIndex: 'kitchen' },
                            { text: 'Country', dataIndex: 'country' },
                            { text: 'City', dataIndex: 'city' },
                            { text: 'Address', dataIndex: 'address' },
                            { text: 'Additional Info', dataIndex: 'additional_info', formatter: (_, d) => d?.additional_info?.map((additional_info) => additional_info?.name).join(', ') },
                            { text: 'Nearest Location', dataIndex: 'nearest_location', formatter: (_, d) => d?.nearest_location?.map((nearest_location) => `${nearest_location?.location} - ${nearest_location?.distance} km`).join(', ') },
                            { text: 'Short Description', dataIndex: 'short_description' },
                            { text: 'Description', dataIndex: 'description', formatter: (_, d) => <div dangerouslySetInnerHTML={{ __html: d?.description }} style={{ whiteSpace: 'pre-line' }} /> },
                            { text: 'Video Description', dataIndex: 'video_description' },
                            { text: 'Active', dataIndex: 'is_active', formatter: d => d ? <span className="text-success">True</span> : <span className="text-danger">False</span> },
                            { text: 'Status', dataIndex: 'status', formatter: d => <span className='capitalize'>{d}</span> },
                        ]}
                        data={data} />

                    <div className="border rounded-md p-4 bg-white shadow-md mt-4">
                        <h6 className="title">Change Status</h6>
                        <div className="body mt-2">
                            <div >
                                <Form layout="vertical" className="flex flex-col gap-2" form={form} onFinish={values => {
                                    const d = {
                                        _id: params._id,
                                        status: values.status
                                    }
                                    return useAction(postPropertyStatus, d, () => {
                                        getData()
                                        router.push('/admin/property')
                                    })
                                }}>
                                    <FormSelect
                                        label={i18n.t('Status')}
                                        name="status"
                                        options={[
                                            { label: 'Pending', value: 'pending' },
                                            { label: 'Approved', value: 'approved' },
                                            { label: 'Rejected', value: 'rejected' },
                                        ]} />

                                    <Button className="">{i18n.t("Submit")}</Button>
                                </Form>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="border rounded-md p-4 bg-white shadow-md">
                        <h6 className="title">Property Images</h6>
                        <div className="body mt-2">
                            <div className="text-center mb-3" style={{ height: 300 }}>
                                <img src={data?.images[image]} style={{ height: '100%' }} alt="" />
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                                {data?.images?.map((image, index) => (
                                    <div
                                        key={index}
                                        role="button"
                                        onClick={() => setImage(index)}
                                        style={{ height: 80 }}
                                        className="rounded inline-block text-center bg-white p-2">
                                        <img src={image} style={{ height: '100%' }} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-md p-4 bg-white shadow-md mt-4">
                        <h6 className="title">Property Thumbnail Image</h6>
                        <div className="body mt-2">
                            <div className="text-center mb-3" style={{ height: 300 }}>
                                <img src={data?.thumb_image} style={{ height: '100%' }} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-md p-4 bg-white shadow-md mt-4">
                        <h6 className="title">Property Plan</h6>
                        <div className="body mt-2">
                            <div className="d-flex flex-wrap gap-2">
                                {data?.property_plan?.map((document, index) => (
                                    <div key={index} className="rounded inline-block text-center bg-white p-2">
                                        <TableImage url={document?.property_image} />
                                        <p className='my-2'>{document?.property_name}</p>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminPropertyView;