"use client";
import React, { useState } from 'react';
import { Form, Modal, Tooltip } from 'antd';
import { useAction, useFetch } from '../../../helpers/hooks';
import { delFaq, fetchFaq, postFaq } from '../../../helpers/backend';
import { useI18n } from '../../../providers/i18n';
import Table from '../../../../components/common/table';
import Button from '../../../../components/common/button';
import FormInput, { HiddenInput } from '../../../../components/form/input';

const AdminFaq = () => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [data, getData, { loading }] = useFetch(fetchFaq);
    const [isEdit, setIsEdit] = useState(false);
    const i18n = useI18n()
    const columns = [
        { text: "Question", dataField: "question" },
        {
            text: "Answer", dataField: "answer",
            formatter: (answer) => <span className=''>{
                <Tooltip title={answer?.length > 40 ? answer : ''}
                >
                    <span className='cursor-help'>
                        {answer?.length > 40 ? answer?.slice(0, 40) + '...' : answer}
                    </span>
                </Tooltip>
            }</span>,
        },

    ];
    return (
        <div>
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
                onDelete={delFaq}
                indexed
                pagination
                title={i18n.t("Frequently Ask Question")}
            />

            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={i18n.t("Frequently Ask Question Details")}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        return useAction(
                            values?._id ? postFaq : postFaq,
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
                    <FormInput label={i18n.t("Question")} name="question" required />
                    <FormInput label={i18n.t("Answer")} name="answer" textArea required />


                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>
            </Modal>

        </div>
    );
};

export default AdminFaq;