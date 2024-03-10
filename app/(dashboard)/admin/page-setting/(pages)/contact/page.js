'use client';
import React, { useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';
import { useI18n } from '../../../../../providers/i18n';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchSinglePage, postPage } from '../../../../../helpers/backend';
import FormInput, { HiddenInput } from '../../../../../../components/form/input';
import Button from '../../../../../../components/common/button';

const ContactPage = ({ slug }) => {
    const [form] = Form.useForm();
    const i18n = useI18n()

    const [page, getPage] = useFetch(fetchSinglePage, {}, false);

    useEffect(() => {
        getPage({ slug: slug });

    }, [slug]);

    useEffect(() => {
        if (page?._id) {
            form.setFieldsValue({
                ...page,
                contact_us: {
                    heading: JSON.parse(page?.content)?.contact_us?.heading,
                    address: JSON.parse(page?.content)?.contact_us?.address,
                    email: JSON.parse(page?.content)?.contact_us?.email,
                    phone: JSON.parse(page?.content)?.contact_us?.phone,
                },
                map: JSON.parse(page?.content)?.map,
            });
        }
    }, [page]);

    return (
        <div>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {

                        let formData = new FormData();
                        if (values?._id) {
                            formData = {
                                id: page?._id,
                                title: page?.title,
                                slug: page?.slug,
                                content: JSON.stringify({
                                    contact_us: {
                                        heading: values?.contact_us?.heading,
                                        address: values?.contact_us?.address,
                                        email: values?.contact_us?.email,
                                        phone: values?.contact_us?.phone,
                                    },
                                    map: values?.map,
                                }),
                                content_type: 'json',
                            };
                        }
                        else {
                            formData = {
                                title: 'Contact Us',
                                content: JSON.stringify({
                                    contact_us: {
                                        heading: values?.contact_us?.heading,
                                        address: values?.contact_us?.address,
                                        email: values?.contact_us?.email,
                                        phone: values?.contact_us?.phone,
                                    },
                                    map: values?.map,
                                }),
                                content_type: 'json',
                            };
                        }

                        values?._id ? postPage(formData).then((res) => {
                            if (res?.error === false) {
                                message.success(res?.msg);
                            }
                        }) :
                            postPage(formData).then((res) => {
                                if (res?.error === false) {
                                    message.success(res?.msg);
                                }
                            });

                    }}
                >
                    <HiddenInput name="slug" />
                    <HiddenInput name="_id" />

                    <div className="border p-3 rounded">
                        <h6 className="text-secondary py-2 header_4 font-semibold text-lg">{i18n.t('Contact Us')}</h6>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormInput name={["contact_us", "heading"]} title={("Heading")} placeholder="Enter heading" />

                            </div>
                            <div className="col-span-1">
                                <FormInput name={["contact_us", "address"]} title={("Address")} placeholder="Enter Address" />

                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormInput name={["contact_us", "email"]} title={("Email")} placeholder="Enter Email" />
                            </div>
                            <div className="col-span-1">
                                <FormInput name={["contact_us", "phone"]} title={("Phone")} placeholder="Enter Phone" />
                            </div>
                        </div>
                    </div>

                    <div className='border p-3 rounded mt-3'>
                        <h1 className='text-dark_text text-lg'>{i18n.t('Google Map Address')}</h1>
                        <FormInput name={'map'} placeholder={"Enter Google Map Address"} />
                    </div>

                    <Button className="mt-2.5">{i18n.t('Submit')}</Button>
                </Form>

            </Card>
        </div>
    );
};

export default ContactPage;