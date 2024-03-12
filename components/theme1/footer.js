"use client"
import Link from "next/link"
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai"
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa"
import { FiChevronRight } from "react-icons/fi"
import { useI18n } from "../../app/providers/i18n"
import { Form, message } from "antd"
import { useFetch } from "../../app/helpers/hooks"
import { fetchSiteSettings, postNewsLetter } from "../../app/helpers/backend"

const Footer = ({ theme1 }) => {
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
        <footer className={`pt-16 ${theme1 ? 'dark:bg-main_dark bg-white' : 'bg-white'}`} >
            <div className="container">
                <div className="flex flex-wrap space-y-4 items-center justify-between">
                    <div className=" w-full md:w-1/2 ">
                        <h3 className={`header_3 ${theme1 ? 'dark:text-white text-dark_text' : 'text-dark_text'}`}>{i18n?.t('Become a Agent')}</h3>
                        <div className="flex items-center mt-4">
                            <div className="h-[2px] w-2/5 bg-secondary_text"></div>
                            <p className={`pl-2 header_5 ${theme1 ? 'dark:text-white text-dark_text' : 'text-secondary_text'}`}>{i18n?.t('Sign up Today')}</p>
                            <Link href="/signup" className="border rounded-full h-8 w-8 flex justify-center items-center ml-4 hover:bg-primary hover:text-white text-secondary_text transition-all">
                                <FiChevronRight />
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 ">
                        {/* <form>
                            <div className="flex lg:flex-row flex-col gap-x-2 md:justify-end">
                                <input type="text" className={`input input-bordered p-5 h-14 lg:w-[373px] w-auto focus:outline-none border border-tertiary_text focus:border-secondary_text ${theme1 ? 'bg-neutral-800' : 'bg-white'}`} placeholder='Enter your email'></input>
                                <button className='lg:w-[158px] w-full h-14 bg-hover_color text-white button_paragraph lg:mt-0 mt-2'>x{i18n?.t('Subscribe')}</button>
                            </div>
                        </form> */}
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const email =  e.target.email.value;
                            handleSubmit({email})                            
                        }} form={form}>
                            <div className='flex flex-col gap-x-2 md:justify-end lg:flex-row'>
                                <div className=''>
                                    <input
                                    name='email'
                                        type='text'
                                        className='input input-bordered h-14 w-auto border border-tertiary_text bg-transparent p-5 focus:bg-white focus:border-secondary_text focus:bg-transparent focus:outline-none lg:w-[373px]'
                                        placeholder='Enter your email'
                                        required
                                        oninvalid={(e) => e.target.setCustomValidity('Please enter your email')}
                                    ></input>
                                    {/* <FormInput required className='input input-bordered h-14 w-auto border border-tertiary_text bg-secondary p-5 focus:bg-white focus:border-secondary_text focus:outline-none lg:w-[373px]' name="email" type="email" /> */}
                                    <div className='mt-2'>
                                        <p className='paragraph_3 dark:text-white text-secondary_text'>
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
                <div className="flex flex-wrap justify-between items-center py-5 mt-16 space-y-6">
                    <div className="logo order-1">
                        <Link href="/">
                            <img className="hidden dark:block xl:h-full xl:w-full md:!h[80px] md:!w-[100px] " src={settings?.logo} alt="" />
                            <img className="block dark:hidden xl:h-full xl:w-full md:!h[80px] md:!w-[100px] " src={settings?.dark_logo} alt="" />
                            {/* <img className=" xl:h-full xl:w-full md:!h[80px] md:!w-[100px] " src={`${theme1 ? '/Logo_Dark.png' : '/Logo.png'}`} alt="" /> */}
                        </Link>
                    </div>
                    <div className={`md:flex items-center justify-between w-full md:w-fit md:space-x-6 order-last md:order-2  ${theme1 ? 'dark:text-white text-secondary_text' : 'text-dark_text'}`}>
                        
                        <div className={`flex items-center paragraph_1 space-x-2 hover:text-hover_color cursor-pointer  `}>
                            <p>{i18n?.t('Features')}</p>
                        </div>
                        <div className={`flex items-center paragraph_1 space-x-2 hover:text-hover_color cursor-pointer`}>
                            <p>{i18n?.t('Pricing')}</p>
                        </div>
                        <div className={`flex items-center paragraph_1 space-x-2 hover:text-hover_color cursor-pointer`}>
                            <p>{i18n?.t('Help')}</p>
                        </div>
                        <div className={`flex items-center paragraph_1 space-x-2 hover:text-hover_color cursor-pointe`}>
                            <p>{i18n?.t('Privacy')}</p>
                        </div>
                    </div>
                    <div className={`flex items-center mt-6 order-3 md:order-2 ${theme1 ? 'dark:text-white text-secondary_text' : 'text-secondary_text'}`}>
                        <Link
                            href={settings?.linkedin || ''}
                            target='_blank'
                            className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all `}>
                            <FaLinkedinIn className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.instagram || ''}
                            target='_blank'
                            className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all `}>
                            <AiFillInstagram className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.facebook || ''}
                            target='_blank'
                            className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all`}>
                            <FaFacebookF className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.twitter || ''}
                            target='_blank'
                            className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all`}>
                            <AiOutlineTwitter className='text-2xl' />
                        </Link>
                        <Link
                            href={settings?.youtube || ''}
                            target='_blank'
                            className={` flex justify-center items-center ml-4  hover:text-hover_color transition-all`}>
                            <FaYoutube className='text-2xl' />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center items-center py-5 mt-16 border-t border-tertiary_text">
                    <p className="text-secondary_text">
                        Copyright ©_<span>
                            {new Date().getFullYear()}
                        </span> {settings?.title}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer