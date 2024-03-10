'use client';
import { Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { postResetPassword } from '../../../helpers/backend';

function ResetPassword() {

    const router = useRouter()
    const handleSubmit = async (values) => {
        const payload = {
            ...values,
            token: localStorage.getItem('token')
        }
        const { error, msg, data } = await postResetPassword(payload)
        if (error) {
            message.error(msg)
        } else {
            message.success(msg)
            router.push('/login')
        }
    }
    return (
        <div className='flex justify-center'>
        <div className='w-2/4 py-20'>
            <h1 className='header_4_bold pb-3 text-dark_text'>Reset Password</h1>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="password"
                    label={"New Password"}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Enter Your Password' className=' focus:text-dark_text border w-full rounded-md h-10  pl-2' />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    label={"Re-type Password"}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder='Confirm Your Password' className=' focus:text-dark_text w-full border rounded-md h-10  pl-2' />
                </Form.Item>
                <button className='bg-primary text-white w-full h-10 rounded-md mt-4 button_paragraph'  >{'Reset'}</button>
            </Form>
        </div>
        </div>
    );
}

export default ResetPassword;
