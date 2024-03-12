import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Tabs, Switch } from 'antd';

const { Option } = Select;
import { useFetch, useAction } from '../../app/helpers/hooks';
import { HiddenInput } from '../form/input';
import { fetchEmailSettings, postEmailSettings } from '../../app/helpers/backend';
import Button from '../common/button';
import { useI18n } from '../../app/providers/i18n';
import { Loader } from '../common/loader';


const SendGridManageEmail = () => {
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [checkedValue, setCheckedValue] = useState(false);
    const [settings, getSettings] = useFetch(fetchEmailSettings)
    console.log("🚀 ~ SendGridManageEmail ~ settings:", settings)


    // form data loading, if exist
    useEffect(() => {
        if (settings?._id) {
            form.resetFields();
            form.setFieldsValue({
                ...settings
            })

            if (form.getFieldsValue()?.default === 'sendgrid') {
                setCheckedValue(true)
            }
        }
    }, [settings])


    // // submit data
    const onFinish = async (values) => {
        return useAction(postEmailSettings, values, () => {
            getSettings();
        })
    };


    return (
        <div className='pt-0'>
            {
                settings?._id ? (
                    <Form
                        form={form}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout='vertical'
                    >
                        <div className='p-3'>
                            <p className="text-[16px] mb-6 border-b-[1px] border-b-[#21ec5e]">SendGrid SMTP</p>

                            <HiddenInput name="_id" />

                            <Form.Item
                                name={['sendgrid', 'host']}
                                label= {i18n.t("Email Host")}
                                rules={[
                                    {
                                        required: true,
                                        message: i18n.t("Please input email host!"),
                                    },
                                ]}
                            >
                                <Input placeholder= {i18n.t("Please input email host")} />
                            </Form.Item>

                            <Form.Item
                                name={['sendgrid', 'port']}
                                label= {i18n.t("Email Port")}
                                rules={[
                                    {
                                        required: true,
                                        message:  i18n.t("Please input email port!"),
                                    },
                                ]}
                            >
                                <Input placeholder= {i18n.t("Please input email port")} />
                            </Form.Item>


                            <Form.Item
                                name={['sendgrid', 'username']}
                                label= {i18n.t("Email Username")}
                                rules={[
                                    {
                                        required: true,
                                        message:  i18n.t("Please input email username!"),
                                    },
                                ]}
                            >
                                <Input placeholder= {i18n.t("Please input email username")} />
                            </Form.Item>




                            <Form.Item
                                name={['sendgrid', 'password']}
                                label=  {i18n.t("Email Password")}
                                rules={[
                                    {
                                        required: true,
                                        message: i18n.t("Please input email password!"),
                                    },
                                ]}
                            >
                                <Input placeholder= {i18n.t("Please input email password")} type='password' />
                            </Form.Item>


                            <Form.Item
                                name={['sendgrid', 'sender_email']}
                                label= {i18n.t("Sender Email")}
                                rules={[
                                    {
                                        required: true,
                                        message: i18n.t("Please input sender email!"),
                                    },
                                ]}
                            >
                                <Input placeholder= {i18n.t("Please input sender email")} />
                            </Form.Item>


                            <Form.Item
                                name='default'
                                label= {i18n.t("Set Default")}
                                valuePropName="sendgrid">
                                <Switch defaultChecked={checkedValue} />
                            </Form.Item>



                            <div className='relative'>
                                <Button className="mt-2.5">{i18n.t("Submit")}</Button>

                            </div>
                        </div>
                    </Form>
                ) :
                    <div className='flex justify-center items-center h-[300px]'>
                        <Loader />
                    </div>
            }
        </div>
    );
};

export default SendGridManageEmail;