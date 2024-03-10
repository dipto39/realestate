"use client";
import { Form, Modal } from 'antd';
import React, { useState } from 'react';
import PageTitle from '../../../../../components/common/title';
import Table from '../../../../../components/common/table';
import FormInput, { HiddenInput } from '../../../../../components/form/input';
import Button from '../../../../../components/common/button';
import { useAction, useFetch } from '../../../../helpers/hooks';
import { delCategory, fetchCategories, postCategory } from '../../../../helpers/backend';
import { useI18n } from '../../../../providers/i18n';

const BlogCategory = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [data, getData, { loading }] = useFetch(fetchCategories);
    const [isEdit, setIsEdit] = useState(false);
    const i18n = useI18n()

    const columns = [
        { text: "Name", dataField: "name" },
    ];
    return (
        <div>
            <PageTitle title="Blog Categories" />
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
                    });
                    setOpen(true);
                    setIsEdit(true);
                }}
                onDelete={delCategory}
                indexed
                pagination
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={i18n.t("Blog Category Details")}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        return useAction(
                            values?._id ? postCategory : postCategory,
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

                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default BlogCategory;