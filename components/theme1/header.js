"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FiPhoneCall, FiHome, FiUser, FiX, FiMail } from "react-icons/fi";
import { PiEqualsLight } from "react-icons/pi";
import { FaLinkedinIn, FaPlus, FaYoutube } from "react-icons/fa";
import { AiFillInstagram, AiOutlinePlus, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
// import { Menu, Transition } from "@headlessui/react";
import { useUser } from "../../app/contexts/user";
import { Dropdown, Space, message, Menu } from "antd";
import { MdLogout, MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";
// import { IoSunnySharp } from "react-icons/io5";
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";

import { useFetch } from "../../app/helpers/hooks";
import { fetchSiteSettings } from "../../app/helpers/backend";
import { useProperty } from "../../app/contexts/property";
import { useI18n } from "../../app/providers/i18n";


const Header = ({ theme1, theme3 }) => {
  const [show, setShow] = useState(false);
  const { getUser, user, setActive } = useUser();
  const router = useRouter();
  const { search, setSearch } = useProperty();
  const i18n = useI18n();
  const itemsPage = [
    {
      key: '3',
      label: i18n?.t('Agents'),
      href: '/agents'
    },
    {
      key: '4',
      label: i18n?.t('News'),
      href: '/news'
    },
    {
      key: '5',
      label: i18n?.t('About'),
      href: '/about'
    },
  ];

  const menu = (
    <Menu>
      {itemsPage.map(item => (
        <Menu.Item key={item.key}>
          <Link href={item.href}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

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

  const [settings, getSettings] = useFetch(fetchSiteSettings)

  const items = [
    {
      key: '1',
      label: <Link href={
        user?.role === "admin"
          ? "/admin"
          : user?.role === "agent"
            ? "/agent-profile"
            : "/profile"
      }>
        {i18n?.t('Dashboard')}
      </Link>,
      icon: <MdOutlineSpaceDashboard />

    },
    {
      key: '2',
      label: <div onClick={() => {
        try {
          setSearch(!search)
          localStorage.removeItem('token')
          message.success('Logged out successfully')
          router.push('/login')
          getUser()
          setActive('logout')

        } catch (error) {
          console.log(error)
        }
      }}>
        {i18n?.t('Logout')}
      </div>,
      icon: <MdLogout />
    }
  ];

  const handleShow = () => {
    setShow(true);
  };
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem("theme") || "light";
      } catch (error) {
        console.log(error);
      }
    } else {
      return "light";
    }
  });

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      setTheme(localStorage.getItem("theme") === "light" ? "light" : "dark");
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
      const localTheme = localStorage.getItem("theme");
      document.querySelector("html").setAttribute("data-theme", localTheme);
    } catch (error) {
      console.log(error);
    }
  }, [theme]);

  return (
    <header
      className={`relative z-50 ${theme1 ? "dark:bg-main_dark bg-white" : theme3 ? "bg-secondary" : "bg-white"}`}
    >
      <div className="flex items-center justify-between">
        <div className="container">
          <div className="flex items-center justify-between py-5">
            <div className="logo">
              <Link href={"/"}>
                <img
                  className="dark:hidden md:!h[80px] md:!w-[100px] xl:h-full xl:w-full "
                  src={`${theme1 || theme3 ? settings?.dark_logo : settings?.logo}`}
                  alt=""
                />
                <img
                  className="hidden dark:block md:!h[80px] md:!w-[100px] xl:h-full xl:w-full "
                  src={`${theme1 || theme3 ? settings?.logo : settings?.dark_logo}`}
                  alt=""
                />
              </Link>
            </div>
            <div className="hidden items-center space-x-6 md:flex ">
              <div
                className={`paragraph_1 flex cursor-pointer items-center space-x-2 ${theme1 || theme3 ? "dark:text-white text-dark_text" : "text-dark_text"} transition-all ease-in-out hover:text-hover_color`}
              >
                <FiPhoneCall />
                <p>{settings?.phone}</p>
              </div>
              {user?.role === "agent" && <Link href={"/agent-profile"} onClick={() => {
                setActive('add-property')
                if (!user?.activeSubscription?.active) {
                  message.error('Please subscribe to add new property')
                }
              }}
                className={`paragraph_1 flex cursor-pointer items-center space-x-2 ${theme1 || theme3 ? "dark:text-white text-dark_text" : "text-dark_text"} hover:text-hover_color `}
              >
                <FiHome />
                <p>Add Property</p>
              </Link>}
              {
                theme1 &&
                <>
                  {
                    theme === "light" ? <h1 className="mx-10" onClick={handleToggle}> <BiSun size={36} color="orange" /></h1> : <h1 className="mx-10" onClick={handleToggle}><BiMoon size={24} color="white" /></h1>

                  }
                </>
              }
              {
                !!user?._id ? <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <FiUser size={24} className="text-hover_color cursor-pointer" />
                  </a>
                </Dropdown> : <Link className="paragraph_1 flex cursor-pointer items-center space-x-2 dark:text-white text-dark_text transition-all ease-in-out hover:text-hover_color" href={'/login'}>{i18n?.t('Login')}</Link>
              }
            </div>
          </div>
        </div>
        <div
          onClick={handleShow}
          className={`!mr-6 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-2 ${theme1 || theme3 ? " dark:border-white border-dark_text" : "border-dark_text"} md:h-[80px]  md:w-[80px]`}
        >
          <PiEqualsLight className="text-hover_color" />
        </div>
      </div>

      {show && (
        <div className="absolute right-0 top-0 z-20 h-[100vh] w-full bg-white p-8 shadow-xl md:w-[524px]">
          <div className="flex justify-end">
            <div
              onClick={() => setShow(false)}
              className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-2 border-dark_text"
            >
              <FiX className="text-hover_color" />
            </div>
          </div>
          <div className="flex !h-full flex-col justify-between">
            <div className="flex flex-col gap-6">
              <Dropdown overlay={homeMenu}>
                <h1 className="paragraph_1  flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color"><span>{i18n?.t('Home')}</span>
                  {/* <FaPlus /> */}
                  <AiOutlinePlus />
                </h1>

              </Dropdown>
              <Link href={'/about'} className="paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color">
                {i18n?.t('About')}
              </Link>
              <Link href={'/property'} className="paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color">
                {i18n?.t('Properties')}
              </Link>
              <Link href={'/pricing-plan'} className="paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color">
                {i18n?.t('Pricing')}
              </Link>
              <Dropdown overlay={menu}>
                <a className="paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color" onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span>{i18n?.t('Pages')}</span>
                    {/* <FaPlus /> */}
                    <AiOutlinePlus />
                  </Space>
                </a>
              </Dropdown>
              <Link href={'/contact'} className="paragraph_1 flex cursor-pointer items-center space-x-2 text-dark_text transition-all ease-in-out hover:text-hover_color">
                {i18n?.t('Contact')}
              </Link>
            </div>
            <div className="mb-10">
              <div className="paragraph_1 mb-4 flex cursor-pointer items-center space-x-2 text-secondary_text transition-all ease-in-out hover:text-hover_color">
                <FiPhoneCall />
                <p>{settings?.phone}</p>
              </div>
              <div className="paragraph_1 flex cursor-pointer items-center space-x-2 text-secondary_text transition-all ease-in-out hover:text-hover_color">
                <FiMail />
                <p>{settings?.email}</p>
              </div>

              <div className=' mt-6 flex items-center '>
                <p className="header_5 pr-2 text-dark_text">{i18n?.t('Follow Us')}:</p>
                <div className="h-[2px] w-1/5 bg-secondary_text"></div>
                <Link
                  href={settings?.linkedin || ''}
                  target='_blank'
                  className=' ml-4 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                >
                  <FaLinkedinIn className='text-2xl' />
                </Link>
                <Link
                  href={settings?.instagram || ''}
                  target='_blank'
                  className=' ml-4 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                >
                  <AiFillInstagram className='text-2xl' />
                </Link>
                <Link
                  href={settings?.facebook || ''}
                  target='_blank'
                  className=' ml-4 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                >
                  <FaFacebookF className='text-2xl' />
                </Link>
                <Link
                  href={settings?.twitter || ''}
                  target='_blank'
                  className=' ml-4 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                >
                  <AiOutlineTwitter className='text-2xl' />
                </Link>
                <Link
                  href={settings?.youtube || ''}
                  target='_blank'
                  className=' ml-4 flex items-center justify-center  text-dark_text  transition-all hover:text-hover_color'
                >
                  <FaYoutube className='text-2xl' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
