import React from 'react';
import { FaHome } from 'react-icons/fa';
import { MdApproval } from "react-icons/md";
import { useFetch } from '../../../app/helpers/hooks';
import { agentDashboardDetail } from '../../../app/helpers/backend';
import { TbPlayerEjectFilled } from "react-icons/tb";
import { MdOutlinePropane } from "react-icons/md";
import { useI18n } from '../../../app/providers/i18n';
function Dashboard({ credits }) {
    const i18n = useI18n();
    const [dashboard, getDashboard] = useFetch(agentDashboardDetail);

    return (
        <>
            <h1 className='header_4_bold pb-3 text-dark_text'>{i18n?.t(`Your current credit's`)}: {credits ? credits : 0}</h1>
            <div className=' grid grid-cols-2 gap-8 '>
                <div className='relative rounded bg-[#1CAF65] px-6 py-5 text-white'>
                    <h1 className='header_2'>{dashboard?.total_property}</h1>
                    <p className='header_6 mt-12'>{i18n?.t('Total Properties')}</p>
                    <div className='absolute bottom-0 right-0'>
                        <img src='./Ellipse 842.png' alt='' />
                    </div>
                    <div className='absolute right-5 top-5'>
                        <span className='text-5xl text-gray-500'>
                            <FaHome></FaHome>
                        </span>
                    </div>
                </div>
                <div className='relative rounded bg-secondary px-6 py-5 text-white'>
                    <h1 className='header_2'>{dashboard?.approved}</h1>
                    <p className='header_6 mt-12'>{i18n?.t('Approved Properties')}</p>
                    <div className='absolute bottom-0 right-0'>
                        <img src='./Ellipse 842.png' alt='' />
                    </div>
                    <div className='absolute right-5 top-5'>
                        <span className='text-5xl text-gray-500'>
                        <MdApproval />
                        </span>
                    </div>
                </div>
                <div className='relative rounded bg-primary px-6 py-5 text-white'>
                    <h1 className='header_2'>{dashboard?.pending}</h1>
                    <p className='header_6 mt-12'>{i18n?.t('Pending Properties')}</p>
                    <div className='absolute bottom-0 right-0'>
                        <img src='./Ellipse 842.png' alt='' />
                    </div>
                    <div className='absolute right-5 top-5'>
                        <span className='text-5xl text-gray-500'>
                        <MdOutlinePropane />
                        </span>
                    </div>
                </div>
                <div className='relative rounded bg-[#1CAF65] px-6 py-5 text-white'>
                    <h1 className='header_2'>{dashboard?.rejected}</h1>
                    <p className='header_6 mt-12'>{i18n?.t('Rejected Properties')}</p>
                    <div className='absolute bottom-0 right-0'>
                        <img src='./Ellipse 842.png' alt='' />
                    </div>
                    <div className='absolute right-5 top-5'>
                        <span className='text-5xl text-gray-500'>
                        <TbPlayerEjectFilled />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
