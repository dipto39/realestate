"use client";

import {
    FaHome,
    FaWrench,
    FaBuilding,
    FaLanguage,
    FaServicestack,
    FaQuestion,
} from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { PiNewspaperLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { fetchUser } from "../../helpers/backend";
import MainLoader, { hideLoader } from "../../../components/common/loader";
import { BiCategory, BiCreditCard, BiDollar, BiGlobe } from "react-icons/bi";
import UserContext from "../../contexts/user";
import { ImExit } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { MdOutlineContactSupport } from "react-icons/md";
import Sidebar from "../../../components/layout/sidebar";
import Header from "../../../components/layout/header";
import { MdOutlineManageHistory, MdOutlineSpaceDashboard } from "react-icons/md";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
    const router = useRouter();

    const [user, setUser] = useState(null)
    useEffect(() => {
        fetchUser().then(({ error, data }) => {
            if (error === false && data.role === "admin") {
                // hideLoader();
                setUser(data);
            } else {
                router.push("/login");
            }
        });
    }, []);

    if (!user) {
        return (
            <>
                <MainLoader />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {!!user && (
                <>
                    <UserContext.Provider value={user}>
                        <Sidebar title="Home Stick" menu={menu} />
                        <Header title="Home Stick" />
                        <div className="content">
                            <div className="p-4">{children}</div>
                        </div>
                    </UserContext.Provider>
                </>
            )}
        </div>
    );
};

export default Layout;

const menu = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: <MdOutlineSpaceDashboard />,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <FaUsers />,
    },
    {
        label: "User Subscription",
        href: "/admin/subscription",
        icon: <BiCreditCard />,
    },
    {
        menu: "Blog",
    },
    {
        label: "Category",
        href: "/admin/blog/category",
        icon: <BiCategory />,
    },
    {
        label: "Tags",
        href: "/admin/blog/tags",
        icon: <BiCategory />,
    },
    {
        label: "Blogs",
        href: "/admin/blog",
        icon: <BiCategory />,
    },

    {
        menu: "Property",
    },
    {
        label: "Category",
        href: "/admin/property/category",
        icon: <FaBuilding />,
    },
    {
        label: "Additional Info",
        href: "/admin/property/additional-info",
        icon: <FaBuilding />,
    },
    {
        label: "Property",
        href: "/admin/property",
        icon: <FaBuilding />,
    },
    {
        menu: "Others",
    },
    {
        label: "Service",
        href: "/admin/service",
        icon: <FaServicestack />,
    },
    {
        label: "Testimonials",
        href: "/admin/testimonial",
        icon: <MdReviews />,
    },
    {
        label: "Pricing Plan",
        href: "/admin/pricing-plan",
        icon: <MdSubscriptions />,
    },
    {
        label: "Newsletter",
        href: "/admin/newsletter",
        icon: <PiNewspaperLight />,
    },
    {
        label: "Contacts",
        href: "/admin/contacts",
        icon: <MdOutlineContactSupport />,
    },
    {
        label: "Payment Methods",
        icon: <BiCreditCard />,
        href: "/admin/payment_method",
    },
    {
        label: "Languages",
        href: "/admin/languages",
        icon: <FaLanguage />,
    },
    {
        menu: "Settings",
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: <FaWrench />,
    },
    {
        label: "Faq Page",
        href: "/admin/faq",
        icon: <FaQuestion />,
    },
    {
        label: "Page Settings",
        href: "/admin/page-setting",
        icon: <FaWrench />,
    },
];