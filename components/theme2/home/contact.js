"use client";
import { Form, message } from 'antd';
import React from 'react';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhoneCall, FiTwitter, FiYoutube } from 'react-icons/fi';
import { useFetch } from '../../../app/helpers/hooks';
import { fetchSiteSettings, postContactUs } from '../../../app/helpers/backend';
import FormInput from '../../form/input';
import { useI18n } from '../../../app/providers/i18n';
import PhoneNumberInput from '../../form/phoneNumberInput';
import Btn from '../../common/btn/btn';
import Link from 'next/link';

import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa"

const Contact = () => {
    const [form] = Form.useForm()
    const i18n = useI18n()
    const [settings, getSettings] = useFetch(fetchSiteSettings)


    const handleFinish = async (values) => {
        const res = await postContactUs(values)
        if (res?.error === false) {
            message.success(res?.msg)
            form.resetFields();
        } else {
            message.error(res?.message)
        }
    }

    return (
        <section>
            <div className='py-20 md:py-32'>
                <h1 className='header_2 text-center text-dark_text'>{i18n?.t('Get in touch with us')} </h1>

                <div className='container mx-auto'>
                    <div className='mt-3 md:mt-16 flex items-center max-w-[1216px] flex-col justify-between rounded-md p-5 gap-5 shadow-lg lg:flex-row'>
                        <div className='relative mt-6 w-full rounded-md bg-secondary p-5 lg:mt-0 lg:w-[550px] lg:h-[630px] mr-8 lg:mr-0'>
                            <div className='flex h-full flex-col justify-between gap-6 z-20'>
                                <div className='mt-4'>
                                    <h1 className='header_3 text-white'>{i18n?.t('Contact Information')}</h1>
                                    <p className='paragraph_1 mt-2 text-white'>
                                        {i18n?.t('Say something to start a live chat!')}
                                    </p>
                                </div>

                                <div className='relative z-20'>
                                    <ul className='flex flex-col space-y-4'>
                                        <li className='paragraph_1 flex items-center gap-2'>
                                            <FiPhoneCall className='text-white' />
                                            <span className='text-white'>
                                                {settings?.phone}
                                            </span>
                                        </li>
                                        <li className='paragraph_1 flex items-center gap-2'>
                                            <FiMail className='text-white' />
                                            <span href='#' className='text-white'>
                                                {settings?.email}
                                            </span>
                                        </li>
                                        <li className='paragraph_1 flex items-center gap-2'>
                                            <FiMapPin className='text-white' />
                                            <span href='#' className='text-white'>
                                                {settings?.address}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className='z-50 relative'>
                                    <Folluwing settings={settings}></Folluwing>
                                </div>
                            </div>
                            <div className='absolute bottom-0 right-0 z-10'>
                                <img src='/element7.png' alt='contact' className=' object-cover' />
                            </div>
                        </div>

                        <div className='md:pt-0 pt-10 contact_form'>
                            <Form onFinish={handleFinish} form={form} layout='vertical'>
                                <div className='lg:!max-w-[585px] pt-0 md:pt-0'>
                                    <p className='header_4 mb-4 text-[#717171]'>{i18n?.t('Any question or remarks? Just write us a message!')}</p>
                                    <div className='flex flex-col gap-8 lg:flex-row'>
                                        <div className='lg:w-[422px]'>
                                            <FormInput name='name' required placeholder={i18n?.t('Name')} label={i18n?.t('Name')} className='placeholder:paragraph_3 w-full !border-b !border-b-secondary_text py-1 text-dark_text placeholder-secondary_text transition-colors focus:border-b-2 focus:outline-none' />
                                        </div>
                                        <div className='lg:w-[422px]'>
                                            <FormInput name='email' required placeholder={i18n?.t('Email')} label={i18n?.t('Email Address')} isEmail className='placeholder:paragraph_3 w-full !border-b !border-b-secondary_text py-1 text-dark_text placeholder-secondary_text transition-colors focus:border-b-2 focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='mt-2 flex flex-col gap-8 lg:flex-row'>
                                        <div className='lg:w-[422px]'>
                                            <PhoneNumberInput name='phone' required label={i18n?.t('Phone Number')} className='placeholder:paragraph_3 w-full !border-b !border-b-secondary_text py-1 text-dark_text placeholder-secondary_text transition-colors focus:border-b-2 focus:outline-none' />
                                        </div>
                                        <div className='lg:w-[422px]'>
                                            <FormInput name='company' placeholder={i18n?.t('Company Name')} label={i18n?.t('Company Name')} className='placeholder:paragraph_3 w-full !border-b !border-b-secondary_text py-1 text-dark_text placeholder-secondary_text transition-colors focus:border-b-2 focus:outline-none' />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <FormInput name='message' placeholder={i18n?.t('Message')} label={i18n?.t('Message')} textArea className='placeholder:paragraph_3 w-full !border-b !border-b-secondary_text py-1 text-dark_text placeholder-secondary_text transition-colors focus:border-b-2 focus:outline-none' />
                                    </div>
                                </div>
                                {/* <button type='submit' className='header_5 rounded-sm  rounded-tr-3xl bg-primary px-7 py-4 text-lg text-white transition-all ease-in-out hover:bg-hover_color flex justify-center items-center w-fit'>{i18n?.t('Send Message')}</button> */}
                                <div className="flex justify-end mt-11">

                                    <Btn>
                                        <p className='header_5 text-white'>{i18n?.t('Send Message')}</p>
                                    </Btn>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

export const Folluwing = ({ settings }) => <div className="flex items-center mt-6 ">
    <Link
        href={settings?.linkedin || ''}
        target='_blank'
        className={` flex justify-center items-center hover:text-hover_color transition-all ${'text-secondary_text'}`}                        >
        <FaLinkedinIn className='text-2xl' />
    </Link>
    <Link
        href={settings?.instagram || ''}
        target='_blank'
        className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all ${'text-secondary_text'}`}                        >
        <AiFillInstagram className='text-2xl' />
    </Link>
    <Link
        href={settings?.facebook || ''}
        target='_blank'
        className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all ${'text-secondary_text'}`}                        >
        <FaFacebookF className='text-2xl' />
    </Link>
    <Link
        href={settings?.twitter || ''}
        target='_blank'
        className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all ${'text-secondary_text'}`}                        >
        <AiOutlineTwitter className='text-2xl' />
    </Link>
    <Link
        href={settings?.youtube || ''}
        target='_blank'
        className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all ${'text-secondary_text'}`}                        >
        <FaYoutube className='text-2xl' />
    </Link>

</div>
