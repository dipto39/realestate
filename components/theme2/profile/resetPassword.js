'use client';
import React, { useState } from 'react';
import { postChangePassword } from '../../../app/helpers/backend';
import { Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../app/providers/i18n';


function ResetPassword() {
    const { push } = useRouter()
    const [form] = Form.useForm();
    const i18n = useI18n();
    return (
        <>
            <h1 className='header_4_bold pb-3 text-dark_text'>{i18n?.t('Reset Password')}</h1>
            <div className='flex flex-col gap-y-4 mt-10'>
                <Form layout="vertical" form={form}
                    onFinish={async (values) => {
                        const { error, msg } = await postChangePassword(values)
                        if (!error) {
                            localStorage.removeItem('token')
                            message.success(msg)
                            push('/login')
                        } else {
                            message.error(msg)
                        }
                    }}
                >
                    <Form.Item
                        name="old_password"
                        label={i18n?.t('Old Password')}
                        rules={[
                            {
                                required: true,
                                message: i18n?.t('Please input your old password!'),
                            },
                        ]}
                    >
                        <Input.Password placeholder={i18n?.t('Enter Your old Password')} className=' focus:text-dark_text border w-full rounded-md h-10  pl-2' />
                    </Form.Item>
                    <Form.Item
                        name="new_password"
                        label={i18n?.t('New Password')}
                        rules={[
                            {
                                required: true,
                                message: i18n?.t('Please input your new password!'),
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder={i18n?.t('Enter Your New Password')} className=' focus:text-dark_text border w-full rounded-md h-10  pl-2' />
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        label={i18n?.t("Confirm Password")}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: i18n?.t('Please confirm your password!'),
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(i18n?.t('The new password that you entered do not match!')));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder={i18n?.t('Confirm Your Password')} className=' focus:text-dark_text w-full border rounded-md h-10  pl-2' />
                    </Form.Item>
                    <button className='bg-primary text-white py-2 px-4 rounded-md'>{i18n?.t('Reset Password')}</button>
                </Form>
            </div>
        </>
    );
}

export default ResetPassword;
