"use client";
import Link from 'next/link';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { Form, Input, message } from 'antd';
import FormInput from '../form/input';
import { fetchSiteSettings, postNewsLetter } from '../../app/helpers/backend';
import { useFetch } from '../../app/helpers/hooks';
import { useI18n } from '../../app/providers/i18n';

const Footer = () => {
    const i18n = useI18n()

    const [form] = Form.useForm();
    const [settings, getSettings] = useFetch(fetchSiteSettings)

    const handleSubmit = async (values) => {
        const res = await postNewsLetter(values);
        if (res?.error === true) {
            message.error(res?.msg)
        } else {
            message.success(res?.msg)
            form.resetFields();
        }
    }

    return (
        <footer className='bg-secondary pt-16'>
            <div className='container'>
                <div className='flex flex-wrap items-center justify-between space-y-4'>
                    <div className='space-y-3 md:space-y-0 w-full md:w-1/2 '>
                        <h3 className='header_3 text-white'>{i18n?.t('Become a Agent')}</h3>
                        <div className='md:mt-4 flex items-center'>
                            <div className='h-[2px] w-2/5 bg-secondary_text'></div>
                            <p className='header_5 pl-2 text-white'>{i18n?.t('Sign up Today')}</p>
                            <Link
                                href='/signup'
                                className='ml-4 flex h-8 w-8 items-center justify-center rounded-full border text-secondary_text transition-all hover:bg-primary hover:text-white'
                            >
                                <FiChevronRight />
                            </Link>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 '>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.email.value;
                            handleSubmit({ email })
                        }} form={form}>
                            <div className='flex flex-col gap-x-2 md:justify-end lg:flex-row'>
                                <div className=''>
                                    <input
                                        name='email'
                                        type='text'
                                        className='input input-bordered h-14 w-auto border border-tertiary_text bg-secondary p-5 focus:bg-white focus:border-secondary_text focus:outline-none lg:w-[373px]'
                                        placeholder='Enter your email'
                                        required
                                        oninvalid={(e) => e.target.setCustomValidity('Please enter your email')}
                                    ></input>
                                   
                                    {/* <FormInput required className='input input-bordered h-14 w-auto border border-tertiary_text bg-secondary p-5 focus:bg-white focus:border-secondary_text focus:outline-none lg:w-[373px]' name="email" type="email" /> */}
                                    <div className='mt-2'>
                                        <p className='paragraph_3 text-light_text '>
                                            {settings?.description}
                                        </p>
                                    </div>
                                </div>
                                <button type="submit" className='button_paragraph header_5 mt-2 h-14 w-full bg-primary text-white lg:mt-0 lg:w-[158px]'>
                                    {i18n?.t('Subscribe')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='mt-8 md:mt-16 flex flex-wrap items-center justify-between space-y-6 py-5'>
                    <div className='logo order-1'>
                        <Link href='/'>
                            <img
                                className=' md:!h[80px] md:!w-[100px] xl:h-full xl:w-full '
                                src={settings?.logo}
                                alt=''
                            />
                        </Link>
                    </div>
                    {/* <div className='order-last flex w-full items-center justify-between md:order-2 md:w-fit md:space-x-6'> */}
                    <div className='md:flex items-center justify-between w-full md:w-fit md:space-x-6 order-last md:order-2'>

                        <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-light_text hover:text-hover_color '>
                            <Link href="/about">{i18n?.t('About Us')}</Link>
                        </div>
                        <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-light_text hover:text-hover_color '>
                            <Link href="/pricing-plan">{i18n?.t('Pricing')}</Link>
                        </div>
                        <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-light_text hover:text-hover_color '>
                            <Link href="/terms_&_condition">{i18n?.t('Terms & Conditions')}</Link>
                        </div>
                        <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-light_text hover:text-hover_color '>
                            <Link href="/privacy_policy">{i18n?.t('Privacy')}</Link>
                        </div>
                    </div>
                    <div className='order-3 mt-6 flex items-center md:order-2'>
                        <Link
                            href={settings?.linkedin || ''}
                            target='_blank'
                            className=' ml-4 flex items-center justify-center  text-light_text  transition-all hover:text-hover_color'
                        >
                            <FaLinkedinIn className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.instagram || ''}
                            target='_blank'
                            className=' ml-4 flex items-center justify-center  text-light_text  transition-all hover:text-hover_color'
                        >
                            <AiFillInstagram className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.facebook || ''}
                            target='_blank'
                            className=' ml-4 flex items-center justify-center  text-light_text  transition-all hover:text-hover_color'
                        >
                            <FaFacebookF className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.twitter || ''}
                            target='_blank'
                            className=' ml-4 flex items-center justify-center  text-light_text  transition-all hover:text-hover_color'
                        >
                            <AiOutlineTwitter className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.youtube || ''}
                            target='_blank'
                            className=' ml-4 flex items-center justify-center  text-light_text  transition-all hover:text-hover_color'
                        >
                            <FaYoutube className='text-2xl' />
                        </Link>
                    </div>
                </div>
                <div className='mt-8 md:mt-16 flex flex-col items-center justify-center border-t border-tertiary_text py-5'>
                    <p className='text-light_text'>
                        Copyright ©_<span>{new Date().getFullYear()}</span> {settings?.title}
                    </p>
                    <p className='text-light_text'>
                        <Link href='https://appstick.com.bd/' target="_blank">{i18n?.t('Developed By Appstick')} </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
