"use client";
import React, { useState } from 'react';
import PageTitle from '../../../../components/common/title';
import { Form, Modal, Tooltip } from 'antd';
import { useAction, useFetch } from '../../../helpers/hooks';
import { useI18n } from '../../../providers/i18n';
import Table, { TableImage } from '../../../../components/common/table';
import { delTestimonial, fetchTestimonials, postTestimonial } from '../../../helpers/backend';
import Button from '../../../../components/common/button';
import FormInput, { HiddenInput } from '../../../../components/form/input';
import MultipleImageInput from '../../../../components/form/multiImage';

const AdminTestimonial = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [data, getData, { loading }] = useFetch(fetchTestimonials);
    const [isEdit, setIsEdit] = useState(false);
    const i18n = useI18n()


    const columns = [
        {
            text: "Image", dataField: "image",
            formatter: (_, d) => (
                <div className="flex space-x-1">
                    <TableImage url={d?.image} />
                </div>
            ),
        },
        { text: "Name", dataField: "name" },
        { text: "Rating", dataField: "rating" },
        {
            text: "Message", dataField: "message",
            formatter: (message) => <span className=''>{
                <Tooltip title={message?.length > 30 ? message : ''}
                >
                    <span className='cursor-help'>
                        {message?.length > 30 ? message?.slice(0, 30) + '...' : message}
                    </span>
                </Tooltip>
            }</span>,
        },

    ];
    return (
        <div>
            <PageTitle title="Testimonial" />
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setOpen(true);
                            setIsEdit(false);
                        }}
                    >
                        {i18n.t("Add New")}
                    </Button>
                }
                onEdit={(values) => {
                    form.resetFields();
                    form.setFieldsValue({

                        ...values,
                        image:
                            values?.image?.length > 0
                                ? [
                                    {
                                        uid: '-1',
                                        name: 'image.png',
                                        status: 'done',
                                        url: values?.image,
                                    },
                                ]
                                : [],
                    });
                    setOpen(true);
                    setIsEdit(true);
                }}
                onDelete={delTestimonial}
                indexed
                pagination
            />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={i18n.t("Testimonial Details")}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.image = values?.image[0]?.originFileObj;
                        return useAction(
                            values?._id ? postTestimonial : postTestimonial,
                            {
                                ...values,
                            },
                            () => {
                                setOpen(false);
                                getData();
                            }
                        );
                    }}
                >
                    {
                        isEdit && <HiddenInput name="_id" />
                    }
                    <FormInput label={i18n.t("Name")} name="name" required />
                    <FormInput label={i18n.t("Rating")} name="rating" placeholder={"Rate 1-5"} required
                        rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error(i18n.t("Rating can't be negative")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error(i18n.t("Rating should be number")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (value && value > 5) {
                                    return Promise.reject(new Error(i18n.t("Rating can't be greater than 5")))
                                }
                                return Promise.resolve()
                            }
                        })


                    ]} />
                    
                    <FormInput label={i18n.t("Message")} name="message" required textArea />
                    <MultipleImageInput label={i18n.t("Image")} name={"image"} required />

                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminTestimonial;