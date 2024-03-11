import { Dropdown, Popover, Select, Space, message } from "antd";
import { FaBars } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { FiBell, FiLock, FiLogOut, FiMail, FiSettings, FiUser } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useUser } from "../../app/contexts/user"
import { useI18n } from "../../app/providers/i18n";
import Link from "next/link";
import { ImExit } from "react-icons/im";



const Header = () => {
    const user = useUser()
    const router = useRouter()
    const i18n = useI18n()
    const [arrow, setArrow] = useState('Hide');
    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }
    }, [arrow]);
    const defaultLang = i18n.languages?.find(lang => lang?.default)?.name


    const handleLogout = () => {
        try {
            localStorage.removeItem('token')
            message.success('Logged out successfully')
            router.push('/login')

        } catch (error) {
            console.log(error)
        }
    }

    const handleProfile = () => {
        if (user?.role === 'admin') {
            router.push('/admin/profile')
        }
        if (user?.role === 'owner') {
            router.push('/owner/profile')
        }
        if (user?.role === 'driver') {
            router.push('/driver/profile')
        }
    }

    const handleChat = () => {
        if (user?.role === 'admin') {
            router.push('/admin/chats')
        }
        if (user?.role === 'owner') {
            router.push('/owner/chats')
        }
        if (user?.role === 'driver') {
            router.push('/driver/chats')
        }
    }

    const handleChangePassword = () => {
        if (user?.role === 'admin') {
            router.push('/admin/profile/change-password')
        }
        if (user?.role === 'owner') {
            router.push('/owner/change-password')
        }
        if (user?.role === 'driver') {
            router.push('/driver/profile/change-password')
        }
    }

    const items = [
        {
            label: 'Profile',
            icon: <FiUser />,
            key: '1',
            onClick: handleProfile,
        },
        {
            label: 'Change Password',
            icon: <FiLock />,
            key: '2',
            onClick: handleChangePassword,
        },
        {
            label: 'Logout',
            icon: <FiLogOut />,
            key: '3',
            onClick: handleLogout,
        }
    ];

    // const content = (
    //     <NotificationPopover />
    // );

    return (
        <header className="header z-10">
            {
                defaultLang === undefined ?
                    <>

                    </>
                    :


                    <div className="flex justify-between items-center h-full p-4">
                        <div className="">
                            <FaBars
                                className="md:hidden"
                                role="button"
                                onClick={() => {
                                    window.document.querySelector('.sidebar').classList.toggle('open')
                                    window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-x-6">
                            <Link href="/" target="_blank" className="flex items-center gap-1 hover:text-primary">
                                <ImExit />
                                Live Site
                            </Link>
                            <div>
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
                                    className='inline-flex items-center justify-center textSelectWhite capitalize'
                                />
                            </div>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                            >
                                <a>
                                    <Space>
                                        {user && <span className="cursor-pointer">{user?.name}</span>}
                                        <BiUser className="cursor-pointer" size={18} />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </div>
            }

        </header>
    )
}

export default Header

