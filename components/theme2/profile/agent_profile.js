"use client"
import React, { useEffect, useState } from 'react'
import { AiFillDashboard, AiOutlineHome } from 'react-icons/ai'
import { FaCreditCard, FaEdit, FaHome, FaUserAlt } from 'react-icons/fa'
import { FaHouseCircleCheck, FaLocationDot, FaShield } from 'react-icons/fa6'
import { FiLogOut, FiSettings } from 'react-icons/fi'
import Dashboard from '../agent-profile/dashboard'
import Credits from '../agent-profile/credits'
import AgentProperties from '../agent-profile/properties'
import ResetPassword from './resetPassword'
import AddProperty from '../agent-profile/addProperty'
import { useUser } from '../../../app/contexts/user'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { message } from 'antd'
import EditProfile from './edit-profile'
import ViewProperty from '../agent-profile/viewProperty'
import Contact from '../agent-profile/agent-contact'
import { useFetch } from '../../../app/helpers/hooks'
import { agentDashboardDetail } from '../../../app/helpers/backend'
import Pricing1 from '../../pricing/pricing'
import { MdOutlinePriceChange } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { useI18n } from '../../../app/providers/i18n'


function Agent_Profile() {
    const i18n = useI18n();
    const { push } = useRouter()
    const { user, getUser, active, setActive } = useUser()
    const [dashboard, getDashboard] = useFetch(agentDashboardDetail)
    const items = [
        {
            label: i18n?.t('Dashboard'),
            key: 'dashboard',
            icon: <MdDashboard></MdDashboard>,
        },
        {
            label: i18n?.t('Properties'),
            key: 'properties',
            icon: <FaHouseCircleCheck></FaHouseCircleCheck>,
        },
        {
            label: i18n?.t('My Credits'),
            key: 'credits',
            icon: <FaCreditCard></FaCreditCard>
        },
        {
            label: i18n?.t('Contact'),
            key: 'contact',
            icon: <FaUserAlt></FaUserAlt>
        },
        {
            label: i18n?.t('Pricing Plan'),
            key: 'pricing-plan',
            icon: <MdOutlinePriceChange />
        },
        {
            label: i18n?.t('Settings'),
            key: 'setting',
            icon: <FiSettings></FiSettings>
        },
        {
            label: i18n?.t('Reset Password'),
            key: 'resetPassword',
            icon: <FaEdit></FaEdit>
        },
        {
            label: i18n?.t('Logout'),
            key: 'logout',
            icon: <FiLogOut></FiLogOut>
        }
    ]
    const path = usePathname();

    const prams = useSearchParams().get("_id");
    console.log("🚀 ~ Agent_Profile ~ prams:", prams)

    useEffect(() => {
        getUser();
        if (active !== 'add-property' && active !== 'view-property') {
            if (active !== 'logout') {
                push(`/agent-profile`)
            }
        }

    }, [user?._id, active])

    return (
        <section className='relative'>
            <div className="absolute top-10 left-3">
                <img src="" alt="" />
            </div>
            <div className="absolute top-10 right-3">
                <img src="" alt="" />
            </div>
            <div className="container mx-auto pb-24">
                <div className="text-center">
                    <h1 className='header_2 py-10'>{items?.map((item) => item?.key === active && item?.label)}</h1>
                </div>
                <div className="lg:flex block gap-5">
                    <div className="basis-1/3 rounded-lg shadow-lg p-3 md:p-8">
                        <h1 className='header_4_bold text-dark_text'>{i18n.t('Account Information')}</h1>

                        <div className="relative my-10">
                            <div className='flex items-center justify-between'>

                                <p className='paragraph_6 text-secondary_text'>{i18n.t('Profile Picture')}</p>
                                <div className='text-primary text-3xl cursor-pointer'><FaEdit onClick={() => setActive('setting')}></FaEdit></div>
                            </div>
                            {user?.image && <div className="max-w-[200px]">
                               { user?.image ? <img className='w-full h-full rounded' src={user?.image} alt="" /> : ""}
                            </div>}
                        </div>
                        <div className="w-full">

                            {
                                items.map((item, index) => <li onClick={() => {
                                    setActive(item.key);
                                    if (item?.key === 'logout') {
                                        setActive('logout')
                                        localStorage.removeItem('token')
                                        message.success(i18n.t('Logged out successfully'))
                                        getUser()
                                        push('/login')
                                    }
                                }} className={` flex cursor-pointer  items-center header_5_lite border hover:text-white hover:bg-primary w-full py-3 px-2 rounded-md my-5 transition-colors duration-500 ease-in-out ${item.key === active ? "text-white bg-primary" : "text-secondary_text"}`}>
                                    <span className='header_4 w-8'>
                                        {item.icon}
                                    </span> {item.label}</li>
                                )
                            }
                        </div>
                    </div>
                    <div className={`basis-2/3 rounded-lg shadow-lg ${active === 'properties' ? 'p-0' : 'p-3 md:p-8'} mt-10 lg:mt-0 `}>
                        {active === 'dashboard' && <Dashboard credits={user?.activeSubscription?.credits} dashboard={dashboard} />}
                        {active === 'setting' && <EditProfile active={active} setActive={setActive}></EditProfile>}
                        {active === 'credits' && <Credits credits={user?.activeSubscription?.credits} />}
                        {active === 'properties' && <AgentProperties user={user} active={active} setActive={setActive} />}
                        {active === 'view-property' && <ViewProperty active={active} setActive={setActive} />}
                        {active === 'add-property' && <AddProperty active={active} setActive={setActive} />}
                        {active === 'resetPassword' && <ResetPassword />}
                        {active === 'contact' && <Contact />}
                        {active === 'pricing-plan' && <Pricing1 user={user}></Pricing1>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Agent_Profile;