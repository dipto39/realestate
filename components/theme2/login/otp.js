"use client"
import React from 'react'

import OTPInput from 'react-otp-input'
import { useState } from 'react';
import { useI18n } from '../../../app/providers/i18n';
function Otp() {
    const [otp, setOtp] = useState('');
    const i18n= useI18n();
    return (
        <section className='relative '>
            <div className='absolute left-5 top-5'>
                <img width='50' src='./llt.png' alt='' />
            </div>
            <div className='absolute right-3 top-5'>
                <img width='50' src='./blt.png' alt='' />
            </div>
            <div className='absolute bottom-3 right-5'>
                <img src='./drow.png' alt='' />
            </div>
            <div className='container mx-auto flex flex-col items-center gap-10 px-4 py-20 md:flex-row lg:px-0'>
                <div className='order-2 basis-1/2 md:order-none'>
                    <img className='h-full w-full' src='./Image.png' alt='' />
                </div>
                <div className='order-1 basis-1/2 md:order-none mt-10 md:mt-0 z-10'>
                    <h1 className='text-2xl'>{i18n?.t('Verify Code')}</h1>
                    <p className='pb-6 pt-2 text-base text-slate-600'>
                        {i18n?.t('Your code send to this')}
                        <span className='text-primary'>{i18n?.t('bilsanders@gmial.com')}</span> {i18n?.t('email account.')}
                    </p>

                    <form action='' className='text-base'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            inputType='tel'
                            numInputs={6}
                            inputStyle={{
                                height: '48px',
                                width: '48px',
                                border: 'none',
                                fontSize: '2rem',
                                margin: "0px 10px 0px 10px",
                                boxShadow: "4px 0px 15px 0px #0000000F",
                                color: 'gray',
                                outline: 'none',
                                fontWeight: 900
                            }}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                        <input
                            className='my-5 mt-10 w-full cursor-pointer bg-primary p-4 text-center text-white header_7 '
                            type='submit'
                            value='Verify'
                        />
                        <p className='paragraph_3 text-secondary_text'>
                            Don't have an account?
                            <a href='' className='text-primary underline'>
                                {i18n?.t('Sign Up')}
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Otp