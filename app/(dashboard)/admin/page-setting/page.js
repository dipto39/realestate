'use client';
import React, { useState } from 'react';
import { AiOutlineContacts } from "react-icons/ai";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GoCodeOfConduct } from "react-icons/go";
import PrivacyPage from './(pages)/privacy/page';
import AboutPage from './(pages)/about/page';
import ContactPage from './(pages)/contact/page';
import TermsPage from './(pages)/terms/page';
import { LiaBorderStyleSolid } from "react-icons/lia";
import { useI18n } from '../../../providers/i18n';
import PageTitle from '../../../../components/common/title';
import HomePageSetting from './(pages)/home/page';

const Content = () => {
    const [tab, setTab] = useState(0);
    const i18n = useI18n()
    const methods = [
        {
            label: ("Home"),
            icon: <LiaBorderStyleSolid />,
            form: <HomePageSetting slug={'home'} />
        },
        {
            label: ("About Us"),
            icon: <LiaBorderStyleSolid />,
            form: <AboutPage slug={'about_us'} />
        },
        {
            label: ("Contact Us"),
            icon: <AiOutlineContacts />,
            form: <ContactPage slug={'contact_us'} />
        },
        {
            label: ("Privacy Policy"),
            icon: <MdOutlinePrivacyTip />,
            form: <PrivacyPage slug={'privacy_policy'} />
        },
        {
            label: ("Terms & Conditions"),
            icon: <GoCodeOfConduct />,
            form: <TermsPage slug={'terms_&_condition'} />
        },
    ];

    return (
        <div>
            <PageTitle title="Pages List" />
            <div className="flex flex-col md:flex-row gap-4">
                <div className="basis-3/12">
                    <div className="flex flex-col">
                        {methods.map((method, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-start p-4 cursor-pointer ${tab === index ? "bg-primary text-white" : "bg-white text-dark_text"}`}
                                onClick={() => setTab(index)}
                            >
                                <div className="mr-4">{method.icon}</div>
                                <div>{i18n.t(method.label)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="basis-9/12">
                    {methods[tab].form}
                </div>
            </div>
        </div>
    );
};

export default Content;