'use client';
import { postVerifyOtp, sendOtp } from '../../../app/helpers/backend';
import PhoneNumberInput from '../../form/phoneNumberInput';
import { Form, Input, Modal, Radio, message } from 'antd';
import { ignore } from 'antd/es/theme/useToken';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useTimer } from 'use-timer';
import { useI18n } from '../../../app/providers/i18n';

function Forgot_password() {
    const [form] = Form.useForm();
    const [value, setValue] = useState('gmail');
    const [otpModal, setOtpModal] = useState(false);
    const [email, setEmail] = useState('');
    const [registrationValues, setRegistrationValues] = useState({});
    const router = useRouter()
    const i18n = useI18n();
    const onChange = e => {
        setValue(e.target.value);
    };

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 120,
        timerType: 'DECREMENTAL',
    });

    useEffect(() => {
        if (email || registrationValues?.phone) {
            start()
        }
        if (time === 0) pause()
    }, [time, start, pause, email, registrationValues?.phone])

    return (
        <section className='relative py-20'>
            {/* {contextHolder} */}
            <div className='absolute left-5 top-5'>
                <img width='50' src='/llt.png' alt='' />
            </div>
            <div className='absolute right-3 top-5'>
                <img width='50' src='/blt.png' alt='' />
            </div>
            <div className='absolute bottom-3 right-5'>
                <img src='/drow.png' alt='' />
            </div>
            <div className='container mx-auto flex flex-col items-center gap-10 font-libre_baskerville px-4 py-20 md:flex-row lg:px-0'>
                <div className='order-2 basis-1/2 md:order-none'>
                    <img className='h-full w-full' src='/Image.png' alt='' />
                </div>
                <div className='z-10 order-1 mt-10 basis-1/2 md:order-none md:mt-0'>
                    <h1 className='text-2xl'>{i18n?.t('Forgot Your Password?')}</h1>
                    <p className='paragraph_1 pb-6 pt-2 text-dark_text'>
                        {i18n?.t('Please confirm your email address below and we will send you a verification code.')}
                    </p>
                    
                    <Form
                        form={form}
                        onFinish={async (values) => {

                            if (!!values?.email || !!values?.phone) {
                                setEmail(values?.email)
                                const { error, msg, data } = await sendOtp({ email: values?.email, phone: values?.phone, action: 'forgot_password' });
                                if (error) {
                                    return message.error(msg);
                                } else {
                                    setOtpModal(true);
                                    confirm(`${i18n?.t('Verification code sent to')} ${data}`)
                                    message.success(`${i18n?.t('OTP sent to')} ${values?.email || values?.phone}`)
                                    setRegistrationValues(values);
                                }
                            }
                        }}
                        layout="vertical"
                    >
                        <div className="flex md:flex-row flex-col md:justify-start items-center text-center mt-6">
                            <Radio.Group onChange={onChange} value={value} className='text-primary'>
                                <Radio className='paragraph_5 ' value={"gmail"}>
                                    {i18n?.t('Continue with Gmail')}
                                </Radio>
                                <Radio className='paragraph_5 ' value={"phone"}>
                                    {i18n?.t('Continue with Phone')}
                                </Radio>
                            </Radio.Group>
                        </div>

                        <div className="flex justify-center mt-14">
                            <div className="lg:w-[648px] w-full signup">
                                {
                                    value === 'gmail' &&
                                    <Form.Item
                                        name="email"
                                        label={i18n?.t('Email')}
                                        rules={[{ required: true, message: i18n?.t('Please input your Email!') }]}
                                    >
                                        <Input className=' focus:text-dark_text border w-full rounded-md h-10 pl-2' placeholder={i18n?.t('Enter Your Email')} />
                                    </Form.Item>
                                }
                                {
                                    value === 'phone' &&
                                    <PhoneNumberInput name="phone" label={i18n?.t('Phone Number')} required={true} />
                                }
                                <button className='bg-primary text-white w-1/2 h-10 rounded-md mt-4 button_paragraph'  >{i18n?.t('Send OTP')}</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <Modal
                open={otpModal}
                onCancel={() => {
                    setOtpModal(false)
                    reset()
                }}
                footer={null}
                width={1000}
                destroyOnClose
            >
                <div className=' w-4/5 md:w-3/5 mx-auto py-20'>
                    <h1 className='header_3 pb-2 text-center text-dark_text'>{i18n?.t('Verify Code')}</h1>
                    <Form
                        name="basic"
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={
                            async (values) => {
                                if (!!values?.otp) {
                                    setOtpModal(false);
                                    const payload = {
                                        ...registrationValues,
                                        otp: values?.otp,
                                        action: 'forgot_password'
                                    }
                                    const { error, msg, data } = await postVerifyOtp(payload);
                                    if (error) {
                                        return message.error(msg);
                                    } else {
                                        message.success(msg);
                                        localStorage.setItem('token', data.token);
                                        setOtpModal(false);
                                        router.push('/reset-password')
                                    }
                                }
                            }
                        }
                    >
                        <Form.Item
                            name="otp"
                            className='my-8'
                        >
                            <OTPInput
                                numInputs={4} renderInput={(props) => <input {...props} />} inputStyle={{
                                    width: '50px',
                                    height: '48px',
                                    marginRight: '1rem',
                                    fontSize: '20px',
                                    border: '1px solid #F79C39',
                                    outline: 'none',
                                }} />

                        </Form.Item>
                        <p className="dark:text-White_Color">
                            {i18n?.t(`Didn't receive the code?`)} {
                                time === 0 ?
                                    <span
                                        className="text-primary cursor-pointer"
                                        onClick={async () => {
                                            const { error, msg } = await sendOtp({ email: email, phone: registrationValues?.phone, action: 'forgot_password' });
                                            if (error) return message.error(msg)
                                            message.success(msg)
                                            reset()
                                            start()

                                        }}
                                    >
                                        {i18n?.t('Resend')}
                                    </span>
                                    :
                                    <span className="text-primary">
                                        {i18n?.t('resend in')} {time} {i18n?.t('s')}
                                    </span>
                            }
                        </p>
                        <button className='bg-primary text-white w-1/2 h-10 rounded-md mt-4 button_paragraph'>{i18n?.t('Verify')}</button>
                    </Form>
                </div>
            </Modal>
        </section>
    );
}

export default Forgot_password;


