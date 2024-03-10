'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from "antd";
import { AiFillDashboard } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { postChangePassword } from '../../../app/helpers/backend';
import { useUser } from '../../../app/contexts/user';
import { FaEdit } from 'react-icons/fa';
import EditProfile from './edit-profile';
import ResetPassword from './resetPassword';
import { useI18n } from '../../../app/providers/i18n';

const items = [
    {
        key: 'profile',
        label: 'Profile',
        icon: <AiFillDashboard></AiFillDashboard>,
    },
    {
        key: 'setting',
        label: 'Setting',
        icon: <FiSettings></FiSettings>,
    },
    {
        key: 'resetPassword',
        label: 'Reset Password',
        icon: <FaEdit></FaEdit>,
    },
    {
        key: 'logout',
        label: 'Logout',
        icon: <FiSettings></FiSettings>,
    }
]

const UserProfile = () => {
    const [active, setActive] = useState('profile')
    const { user, getUser } = useUser()
    const [form] = Form.useForm()
    const { push } = useRouter()
    const i18n = useI18n()

    useEffect(() => {
        getUser()
    }, [user?._id, active])

    if (!user?.role === 'user') {
        return (
            <div className='container'>
                <h1 className='header_2 mt-16 py-10 text-center'>{i18n?.t('Admin')}</h1>
            </div>
        )

    }
    return (
        <div className='container'>
            <h1 className='header_2 mt-16 py-10 text-center'>{active == 'profile' ? 'My Profile' : 'Change Password'}</h1>
            <div className='flex gap-10 mb-20'>
                <div className='w-4/12 border shadow-lg shadow-gray-400 rounded-md p-10 sticky top-0'>
                    <h2 className='text-2xl font-bold'>{i18n?.t('Account Information')}</h2>
                    <div className="relative my-10">
                        <p className='paragraph_6 text-secondary_text'>{i18n?.t('Profile Picture')}</p>
                        <div className="max-w-[200px]">
                            <img className='w-full h-full' src={user?.image ? user?.image : "./man.png"} alt="" />
                        </div>
                        <span className='text-primary text-3xl absolute top-10 cursor-pointer -right-2'><FaEdit onClick={() => setActive('setting')}></FaEdit></span>
                    </div>
                    {
                        items.map((item, index) => <div key={index} onClick={() => {
                            setActive(item.key);
                            if (item.key === 'logout') {
                                localStorage.removeItem('token')
                                message.success(i18n?.t('Logged out successfully'))
                                push('/login')
                                getUser()
                            }
                        }} className={` flex cursor-pointer  items-center header_5_lite border hover:text-white hover:bg-primary w-full py-3 px-2 rounded-md my-5 transition-colors duration-500 ease-in-out ${item.key === active ? "text-white bg-primary" : "text-secondary_text"}`}><span className='header_4 w-8'>{item.icon}</span> {item.label}</div>)
                    }
                </div>
                {
                    active == 'profile' && <div className='w-full flex flex-col gap-2'>
                        <div className='w-full border shadow-lg shadow-gray-400 rounded-md p-10'>
                            <ul className="grid grid-cols-2 gap-4">
                                <li>
                                    <h2 className="text-base font-normal opacity-60 mb-1">{i18n?.t('Fullname')}</h2>
                                    <h5 className="text-base font-normal mb-1">{user.name}</h5>
                                </li>
                                <li>
                                    <h2 className="text-base font-normal opacity-60 mb-1">{i18n?.t('Email')}</h2>
                                    <h5 className="text-base font-normal mb-1">{user.email}</h5>
                                </li>
                                <li>
                                    <h2 className="text-base font-normal opacity-60 mb-3">{i18n?.t('Image')}</h2>
                                    <Image src={user?.image} height={100} width={100} alt="profile" className="rounded-full w-20 h-20 " />
                                </li>
                                <li>
                                    <h2 className="text-base font-normal opacity-60 mb-1">{i18n?.t('Phone')}</h2>
                                    <h5 className="text-base font-normal mb-1">{user.phone}</h5>
                                </li>
                            </ul>
                        </div></div>}
                {
                    active === "resetPassword" && <div className='w-full flex flex-col gap-2'>
                        <div className='w-full border shadow-lg shadow-gray-400 rounded-md p-10'>
                            <div className='flex flex-col gap-y-4 mt-10'>
                                <ResetPassword></ResetPassword>
                            </div>
                        </div></div>
                }
                {
                    active == 'setting' && <div className='w-full flex flex-col gap-2'>
                        <div className='w-full border shadow-lg shadow-gray-400 rounded-md p-10'>
                            <EditProfile setActive={setActive} active={active}></EditProfile>
                        </div>
                    </div>
                }
            </div>
        </div>

    );
};

export default UserProfile;