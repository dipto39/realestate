'use client';

import { Dropdown, Menu, Select, Space } from 'antd';
import Link from 'next/link';
import Script from 'next/script';
import React, { useState, Fragment } from 'react';
import { FaPlus, FaUser } from 'react-icons/fa';
import { FiMenu, FiUser, FiX } from 'react-icons/fi';
// import { Menu, Transition } from '@headlessui/react';
import { useUser } from '../../app/contexts/user';
import { message } from 'antd';
import { MdLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useI18n } from '../../app/providers/i18n';
import { useProperty } from '../../app/contexts/property';



export function Header() {
    const { setSearch, search } = useProperty()
    const i18n = useI18n()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getUser, user, setActive } = useUser()
    const router = useRouter()
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        {
            name: i18n?.t('Home'),
            href: '/',
            dropDown: true
        },
        {
            name: i18n?.t('Property'),
            href: '/property',
            dropDown: false,
        },
        {
            name: i18n?.t('Pages'),
            href: '',
            dropDown: true,
        },
        {
            name: i18n?.t('Contact'),
            href: '/contact',
            dropDown: false,
        },
    ];
    const homeItems = [
        {
            key: '3',
            label: i18n?.t('Home'),
            href: '/',

        },
        {
            key: '1',
            label: i18n?.t('Home 2'),
            href: '/home-2',

        },
        {
            key: '2',
            label: i18n?.t('Home 3'),
            href: '/home-3',
        }
    ]

    const homeMenu = <Menu>
        {
            homeItems.map((item, index) => (
                <Menu.Item key={index}>
                    <Link href={item?.href}>{item?.label}</Link>
                </Menu.Item>

            ))
        }
    </Menu>

    const items = [

        {
            key: '3',
            label: i18n?.t('Agents'),
            href: '/agents',

        },
        {
            key: '4',
            label: i18n?.t('News'),
            href: '/news',

        },
        {
            key: '5',
            label: i18n?.t('About'),
            href: '/about',
        },
    ];

    const itemsMenu = <Menu>
        {
            items.map((item, index) => (
                <Menu.Item key={index} >
                    <Link href={item?.href}>{item?.label}</Link>
                </Menu.Item>
            ))
        }
    </Menu>

    const userItem = [
        {
            key: '1',
            label: <Link href={
                user?.role === 'admin' ? '/admin' :
                    user?.role === 'agent' ? '/agent-profile' :
                        '/profile'
            }>{i18n?.t('Dashboard')}</Link>
        },
        {
            key: '2',
            label: (
                <div onClick={() => {
                    setSearch(!search)
                    localStorage.removeItem('token')
                    message.success(i18n?.t('Logged out successfully'))
                    router.push('/login')
                    getUser()
                    setActive('logout')
                }}>
                    <p>{i18n?.t('Logout')}</p>
                </div>
            )
        }
    ]

    const userMenu = <Menu>
        {
            userItem.map((item, index) => (
                <Menu.Item key={index} >{item?.label}</Menu.Item>
            ))
        }
    </Menu>

    const defaultLang = i18n.languages?.find(lang => lang?.default)?.name

    return (
        <div className='container relative !z-10 w-full'>
            {
                defaultLang === undefined ?
                    <>

                    </>
                    :
                    <div className='mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-md bg-light_text px-4 py-2 sm:px-6 lg:px-8'>
                        <div className='inline-flex items-center space-x-2'>
                            <span>
                                <Link href='/'>
                                    <img
                                        className=' sm:!h[50px] !h-[70px] sm:!w-[70px] md:!w-[100px]'
                                        src='/logo.png'
                                        alt=''
                                    />
                                </Link>
                            </span>
                        </div>
                        <div className='hidden lg:block'>
                            <ul className='inline-flex space-x-12 '>
                                {menuItems.map((item, index) =>
                                    item['dropDown'] === true ? (
                                        <>
                                            <li key={index}>
                                                <Dropdown
                                                    className='paragraph_9 text-dark_text transition-colors ease-in-out cursor-pointer hover:text-primary'
                                                    overlay={item['name'] === i18n?.t('Home') ? homeMenu : itemsMenu}
                                                >
                                                    <a onClick={(e) => {
                                                        e.preventDefault()
                                                        setSearch(!search)
                                                    }}>
                                                        <Space>
                                                            {item.name}
                                                            <FaPlus />
                                                        </Space>
                                                    </a>
                                                </Dropdown>
                                            </li>{' '}
                                        </>
                                    ) : (
                                        <>
                                            <li key={index} onClick={() => {
                                                setSearch(!search)
                                            }}>
                                                <Link
                                                    href={item.href}
                                                    className='paragraph_9 text-dark_text transition-colors ease-in-out hover:text-primary'
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        </>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className='hidden items-center space-x-4 lg:flex'>
                            <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color'>

                                <Select
                                    defaultValue={
                                        localStorage.getItem('lang') ?
                                            i18n.languages?.find(lang => lang?._id === localStorage.getItem('lang'))?.name
                                            :
                                            i18n.languages?.find(lang => lang?.default)?.name
                                    }
                                    style={{ width: 100, color: 'white' }}
                                    bordered={false}
                                    onChange={(value) => {
                                        i18n.changeLanguage(value)
                                    }}
                                    options={i18n.languages?.map(lang => ({ value: lang?._id, label: lang?.name }))}
                                    className='text-sm font-semibold text-gray-800 hover:text-gray-900 capitalize'
                                />
                            </div>
                            

                            {!!user?._id ? <Dropdown overlay={userMenu}
                            >
                                <FiUser className='h-6 w-6 cursor-pointer' />
                            </Dropdown> :
                                <Link href='/login'>
                                    <div className=' paragraph_9 flex cursor-pointer items-center text-dark_text transition-all ease-in-out hover:text-hover_color'>
                                        {/* <FiUser className='h-6 w-6' /> */}
                                        Login
                                    </div>
                                </Link>
                            }

                            {user?.role === 'agent' && <div onClick={() => {
                                setActive('add-property')
                                if (!user?.activeSubscription?.active) {
                                    message.error(i18n?.t('Please subscribe to add new property'))
                                }
                            }} className=' paragraph_9 flex cursor-pointer items-center text-dark_text transition-all ease-in-out hover:text-hover_color'>
                                <Link href='/agent-profile'>+{i18n.t('Add Properties')}</Link>
                            </div>}
                        </div>
                        <div className='flex space-x-6 lg:hidden'>
                            <div className='flex items-center space-x-6'>
                                <div className='paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color'>
                                    <span className='text-sm font-semibold text-gray-800 hover:text-gray-900'>
                                        EN
                                    </span>
                                </div>
                                <div className=' paragraph_1 flex cursor-pointer items-center text-dark_text transition-all ease-in-out hover:text-hover_color'>
                                    <FiUser className='h-6 w-6' />
                                </div>
                            </div>
                            <FiMenu onClick={toggleMenu} className='h-6 w-6 cursor-pointer' />
                        </div>
                        {isMenuOpen && (
                            <div className='absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden'>
                                <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                                    <div className='px-5 pb-6 pt-5'>
                                        <div className='flex items-center justify-end'>
                                            <div className='-mr-2'>
                                                <button
                                                    type='button'
                                                    onClick={toggleMenu}
                                                    className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                                >
                                                    <span className='sr-only'>Close menu</span>
                                                    <FiX className='h-6 w-6' aria-hidden='true' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <nav className='grid gap-y-4 list-none'>
                                                {menuItems.map((item, index) =>
                                                    item['dropDown'] === true ? (
                                                        <>
                                                            <li className='w-full' key={index}>
                                                                <Dropdown
                                                                    className='paragraph_9 text-dark_text w-full transition-colors ease-in-out hover:text-primary'
                                                                    overlayStyle={{
                                                                        width: '80%',
                                                                        height: '100%'
                                                                    }}
                                                                    menu={{ items }}
                                                                >
                                                                    <a onClick={(e) => e.preventDefault()}>
                                                                        <Space>
                                                                            {item.name}
                                                                            <FaPlus />
                                                                        </Space>
                                                                    </a>
                                                                </Dropdown>
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li key={index}>
                                                                <Link
                                                                    href={item.href}
                                                                    className='paragraph_9 text-dark_text transition-colors ease-in-out hover:text-primary'
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        </>
                                                    )
                                                )}
                                            </nav>
                                        </div>
                                        <Link href='/agent-profile'
                                            onClick={() => {
                                                setActive('add-property')
                                                if (!user?.activeSubscription?.active) {
                                                    message.error(i18n.t('Please subscribe to add new property'))
                                                }
                                            }}
                                            type='button'
                                            className='mt-4 w-full text-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
                                        >
                                            +{i18n.t('Add Properties')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </div>
    );
}
