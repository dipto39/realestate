"use client";
import { Checkbox, Form, Input, Modal, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useI18n } from '../../../app/providers/i18n'
import { postRegister, sendOtp } from '../../../app/helpers/backend';
import PhoneNumberInput from '../../form/phoneNumberInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../app/contexts/user';
import OTPInput from 'react-otp-input';
import { useTimer } from 'use-timer';


function Signup() {
  const router = useRouter()
  const [form] = Form.useForm();
  const [value, setValue] = useState('agent');
  const [otpModal, setOtpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [registrationValues, setRegistrationValues] = useState({});
  const i18n = useI18n()
  const { getUser, user } = useUser()

  const { time, start, pause, reset, status } = useTimer({
    initialTime: 120,
    timerType: 'DECREMENTAL',
  });

  useEffect(() => {
    if (email) {
      start()
    }
    if (time === 0) pause()
  }, [time, start, pause, email])


  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <section className="relative py-20">
      <div className="absolute top-5 left-5">
        <img width="50" src="./llt.png" alt="" />
      </div>
      <div className="absolute top-5 right-3">
        <img width="50" src="./blt.png" alt="" />
      </div>
      <div className="absolute bottom-3 right-5">
        <img src="./drow.png" alt="" />
      </div>
      <div className="container mx-auto py-20 flex lg:flex-row flex-col items-center gap-32 lg:px-0 px-4">
        <div className="md:w-1/3 order-2 md:order-none">
          <img className="lg:h-[530px] h-full w-full" src="./Image.png" alt="" />
        </div>
        <div className="md:w-2/3 order-1 text-start  md:order-none">
          <h1 className="header_4_bold">{i18n?.t("Create Account")}</h1>
          <div className=" button_paragraph text-secondary_text font-libre_baskerville my-4">{i18n?.t("Already have an account?")}<Link href='/login' className='text-primary'> {i18n?.t("Login")}</Link></div>
          <Form
            form={form}
            onFinish={async (values) => {
              // return console.log("values", values)
              if (!!values?.email) {
                setEmail(values?.email)
                const { error, msg, data } = await sendOtp({ email: values?.email, action: 'registration' });
                if (error) {
                  return message.error(msg);
                } else {
                  message.success(`${i18n?.t('OTP sent to')} ${values?.email || values?.phone}`)
                  setOtpModal(true);
                  confirm(`${i18n?.t('Verification code sent to')} ${data}`)
                  values.role = value || 'user';
                  setRegistrationValues(values);
                }
              }
            }}
            layout="vertical"
          >
            <div className="flex md:flex-row w-full  flex-col md:justify-center lg:justify-start items-center text-center my-4">
              <Radio.Group onChange={onChange} name='role' value={value} className='text-primary'>
                <Radio className='paragraph_5 ' value={"agent"}>
                  {i18n?.t('Sign up as Agent')}
                </Radio>
                <Radio className='paragraph_5 ' value={"user"}>
                  {i18n?.t('Sign up as User')}
                </Radio>

              </Radio.Group>
            </div>

            <div className="flex justify-start mt-10">
              <div className="lg:w-[648px] w-full signup">
                <Form.Item
                  name="name"
                  label={i18n?.t('Name')}
                  rules={[{ required: true, message: i18n?.t('Please input your User Name!') }]}

                >
                  <Input className='focus:text-dark_text border w-full rounded-md h-10 pl-2' placeholder={i18n?.t('Enter Your Username')} />
                </Form.Item>
                <div className="md:flex items-center gap-4">
                  <div className="w-full md:w-1/2">

                    <Form.Item
                      name="email"
                      label={i18n?.t('Email')}
                      rules={[{ required: true, message: i18n?.t('Please input your Email!') }, { type: 'email', message: i18n?.t('Please enter a valid email address') }]}

                    >

                      <Input className=' focus:text-dark_text border w-full rounded-md h-10 pl-2' placeholder={i18n?.t('Enter Your Email')} />
                    </Form.Item>
                  </div>

                  <div className="w-full md:w-1/2">

                    <PhoneNumberInput name="phone" label={i18n?.t('Phone Number')} required={true} />
                  </div>
                </div>
                <div className="md:flex items-center gap-5">
                  <div className="w-full md:w-1/2">
                    <Form.Item
                      name="password"
                      label={i18n?.t('Password')}
                      rules={[
                        {
                          required: true,
                          message: i18n?.t('Please input your password!'),
                        },

                      ]}
                      hasFeedback
                    >
                      <Input.Password placeholder={i18n?.t('Enter Your Password')} className=' focus:text-dark_text border w-full rounded-md h-10  pl-2' />
                    </Form.Item>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Form.Item
                      name="confirm_password"
                      label={i18n?.t('Confirm Password')}
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: i18n?.t('Please confirm your password!'),
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(i18n?.t('The new password that you entered do not match!')));
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder={i18n?.t('Confirm Your Password')} className=' focus:text-dark_text w-full border rounded-md h-10  pl-2' />
                    </Form.Item>

                  </div>
                </div>

                {/* <Checkbox required className='!text-sm mb-4 '>{i18n?.t('By signing up. you agree to the')} <span className='text-primary'> {i18n?.t('Terms of Service')}</span> {i18n?.t('and')} <span className='text-primary'>{i18n?.t('Privacy policy')}.</span></Checkbox> */}
                <div className='flex items-center gap-1 mb-7'>
                  <Checkbox required className='!text-sm'></Checkbox>
                  <div className='flex items-center gap-1'>
                    <p>{i18n?.t('By signing up. you agree to the')}</p>
                    <Link className='text-primary' href={'/terms_&_condition'}>{i18n?.t('Terms of Service')}</Link>
                    <p> {i18n?.t('and')} </p>
                    <Link className='text-primary' href={'/privacy_policy'}>{i18n?.t('Privacy policy')}.</Link>
                  </div>
                </div>

                <button className='bg-primary text-white w-1/2 h-10 rounded-md button_paragraph'>{i18n?.t('Sign Up')}</button>
              </div>
            </div>
          </Form>

        </div>
      </div>
      <Modal open={otpModal} onCancel={() => setOtpModal(false)} footer={null} width={1000} >
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
                  }
                  const { error, msg, data } = await postRegister(payload);
                  if (error) {
                    return message.error(msg);
                  } else {
                    setOtpModal(false);

                    if (data?.role === "agent") {
                      router.push("/agent-profile")
                      localStorage.setItem('token', data.token)
                      message.success(msg)
                    } else if (data?.role === "admin") {
                      router.push("/admin")
                      localStorage.setItem('token', data.token)
                      message.success(msg)
                    }
                    else {
                      router.push("/")
                      localStorage.setItem('token', data.token)
                      getUser()
                      message.success(msg)
                    }
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
                      const { error, msg } = await sendOtp({ email: email, action: 'registration' });
                      if (error) return message.error(msg)
                      message.success(msg)
                      reset()
                      start()

                    }}
                  >
                    {"Resend"}
                  </span>
                  :
                  <span className="text-primary">
                    {i18n?.t(`resend in`)} {time} {i18n?.t('s')}
                  </span>
              }
            </p>
            <button className='bg-primary text-white w-full h-10 rounded-md mt-4 button_paragraph'  >{i18n?.t('Verify')}</button>
          </Form>
        </div>
      </Modal>

    </section>
  )
}

export default Signup