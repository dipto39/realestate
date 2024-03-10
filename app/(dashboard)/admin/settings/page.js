'use client';
import React, { useEffect } from 'react';
import { Card, Col, Form, Row } from 'antd';
import { useFetch } from '../../../helpers/hooks';
import { message } from 'antd';
import { useI18n } from '../../../providers/i18n';
import PageTitle from '../../../../components/common/title';
import FormInput, { HiddenInput } from '../../../../components/form/input';
import Button from '../../../../components/common/button';
import FormSelect from '../../../../components/form/select';
import { fetchAdminSettings, postAdminSettings } from '../../../helpers/backend';
import PhoneNumberInput from '../../../../components/form/phoneNumberInput';
import MultipleImageInput from '../../../../components/form/multiImage';

const AdminSettings = () => {
    const [form] = Form.useForm();
    const [data, getData] = useFetch(fetchAdminSettings)
    const i18n = useI18n()

    useEffect(() => {
        if (data) {
            // Create a new object with the updated values
            const updatedData = {
                ...data,
                logo: data?.logo?.length > 0 ? [
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data?.logo,
                    },
                ] : [],

                dark_logo: data?.dark_logo?.length > 0 ? [
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data?.dark_logo,
                    },

                ] : [],
            };

            // Use the new object when setting form fields value
            form.setFieldsValue(updatedData);
        }
    }, [data, form]);

    const handleFinish = async (values) => {
        const data = {
            ...values,
            _id: values?._id,
            logo: values?.logo[0]?.originFileObj,
            dark_logo: values?.dark_logo[0]?.originFileObj
        }
        const { err, msg } = await postAdminSettings(data)
        if (err) {
            message.error(msg)
        } else {
            message.success(msg)
            getData()
        }
    }

    return (
        <div>
            <PageTitle title="Admin Settings" />
            <Card>
                <Row>
                    <Col span={24}>
                        <h6 className='mb-4'>{i18n.t("Admin Settings")}</h6>
                        <Form form={form} layout="vertical" onFinish={handleFinish}>
                            <div className="md:w-1/2">
                                <HiddenInput name="_id" />
                                <FormInput name="title" label="Title" required />
                                <FormInput name="email" label="Email" required isEmail />
                                <PhoneNumberInput name="phone" label="Phone Number" required />
                                <FormInput name="description" label="Description" required textArea />
                                <FormInput name="address" label="Address" required />
                                <FormInput name="facebook" label="Facebook Link" required />
                                <FormInput name="twitter" label="Twitter Link" required />
                                <FormInput name="instagram" label="Instagram Link" required />
                                <FormInput name="linkedin" label="Linkedin Link" required />
                                <FormInput name="youtube" label="Youtube Link" required />
                                <div className='grid grid-cols-1 md:grid-cols-2'>
                                    <MultipleImageInput name="logo" label={i18n.t("Logo")} required />
                                    <MultipleImageInput name="dark_logo" label={i18n.t("Dark Logo")} required />
                                </div>

                            </div>


                            <Button className="mt-4" type="primary"> {i18n.t("Submit")} </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AdminSettings;