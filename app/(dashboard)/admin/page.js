"use client";
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { useI18n } from '../../providers/i18n';
import { useFetch } from '../../helpers/hooks';
import { fetchDashboardData } from '../../helpers/backend';
import PageTitle from '../../../components/common/title';
import { FaBuilding } from 'react-icons/fa';

const AdminDashboard = () => {
    const i18n = useI18n()
    const [data, getData, { loading }] = useFetch(fetchDashboardData)
    return (
        <div>
            <PageTitle title="Admin Dashboard" />
            <div className="flex lg:flex-row flex-col gap-8">
                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total Property')}</p>
                            <p className="header_7 mt-2">{data?.total_property}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FaBuilding className="text-white" size={24} />
                        </div>
                    </div>
                </div>


                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total Approved Property')}</p>
                            <p className="header_7 mt-2">{data?.approved_property}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FaBuilding className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total Pending Property')}</p>
                            <p className="header_7 mt-2">{data?.pending_property}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FaBuilding className="text-white" size={24} />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex lg:flex-row flex-col gap-8 mt-8">

                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total Rejected Property')}</p>
                            <p className="header_7 mt-2">{data?.rejected_property}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FaBuilding className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total User')}</p>
                            <p className="header_7 mt-2">{data?.user}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FiUsers className="text-white" size={24} />
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg h-24">
                    <div className="flex justify-between items-center px-4 py-4">
                        <div className="">
                            <p className="text-muted">{i18n.t('Total Agent')}</p>
                            <p className="header_7 mt-2">{data?.agent}</p>
                        </div>
                        <div className="bg-primary rounded-full w-16 h-16 flex justify-center items-center -mt-20">
                            <FiUsers className="text-white" size={24} />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default AdminDashboard;