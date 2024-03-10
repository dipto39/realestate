"use client";
import React, { useState } from 'react';
import PageTitle from '../../../../components/common/title';
import Table, { TableImage } from '../../../../components/common/table';
import { Form, Modal, Tooltip } from 'antd';
import { useAction, useFetch } from '../../../helpers/hooks';
import { useI18n } from '../../../providers/i18n';
import { delService, fetchServices, postService } from '../../../helpers/backend';
import Button from '../../../../components/common/button';
import FormInput, { HiddenInput } from '../../../../components/form/input';
import MultipleImageInput from '../../../../components/form/multiImage';

const AdminService = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [data, getData, { loading }] = useFetch(fetchServices);
    const [isEdit, setIsEdit] = useState(false);
    const i18n = useI18n()


    const columns = [
        { text: "Name", dataField: "name" },
        {
            text: "Description", dataField: "description",
            formatter: (description) => <span className=''>{
                <Tooltip title={description?.length > 30 ? description : ''}
                >
                    <span className='cursor-help'>
                        {description?.length > 30 ? description?.slice(0, 30) + '...' : description}
                    </span>
                </Tooltip>
            }</span>,
        },
        {
            text: "Icon", dataField: "icon",
            formatter: (_, d) => (
                <div className="flex space-x-1">
                    <TableImage url={d?.icon} />
                </div>
            ),
        },
    ];
    return (
        <div>
            <PageTitle title="Services" />
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
                        icon:
                            values?.icon?.length > 0
                                ? [
                                    {
                                        uid: '-1',
                                        name: 'image.png',
                                        status: 'done',
                                        url: values?.icon,
                                    },
                                ]
                                : [],
                    });
                    setOpen(true);
                    setIsEdit(true);
                }}
                onDelete={delService}
                indexed
                pagination
            />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={i18n.t("Service Details")}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        values.icon = values?.icon[0]?.originFileObj;
                        return useAction(
                            values?._id ? postService : postService,
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
                    <FormInput label={i18n.t("Description")} name="description" required textArea />
                    <MultipleImageInput label={i18n.t("Icon")} name={"icon"} required />

                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminService;