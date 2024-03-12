"use client";
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { useI18n } from '../../providers/i18n';
import { useFetch } from '../../helpers/hooks';
import { fetchAdminProperties, fetchDashboardData } from '../../helpers/backend';
import PageTitle from '../../../components/common/title';
import { FaBuilding } from 'react-icons/fa';
import Table, { TableImage } from '../../../components/common/table';
import { statusClass } from '../../helpers/utils';
import { Tooltip } from 'antd';

const AdminDashboard = () => {
    const i18n = useI18n()
    const [data, getData, { loading }] = useFetch(fetchDashboardData)

    const [property, getProperty] = useFetch(fetchAdminProperties, { limit: 5 })

    const columns = [
        {
            text: "Title",
            dataField: "thumb_image",
            formatter: (_, d) => (
                <div className="flex space-x-1 gap-x-3">
                    <TableImage url={d?.thumb_image} />
                    <span className="">{
                        <Tooltip title={d?.title?.length > 30 ? d?.title : ''}
                        >
                            <span className='cursor-help'>
                                {d?.title?.length > 30 ? d?.title?.slice(0, 30) + '...' : d?.title}
                            </span>
                        </Tooltip>
                    }</span>
                </div>
            ),
        },
        { text: "User", dataField: "agent", formatter: (_, d) => <><p>{d?.agent?.name}</p> <p>{d?.agent?.email}</p> <p>{d?.agent?.phone}</p></> },
        { text: "Price", dataField: "price", formatter: (_, d) => <span>{d?.price}</span> },
        { text: "Type", dataField: "type", formatter: (_, d) => <span className="capitalize">{d?.type}</span> },
        {
            text: "Category", dataField: "category", formatter: (_, d) => <span className="capitalize">{d?.category?.name}</span>
        },
        {
            text: "Country", dataField: "country", formatter: (_, d) => <span className="capitalize">{d?.country}</span>
        },
        {
            text: "City", dataField: "city", formatter: (_, d) => <span className="capitalize">{d?.city}</span>
        },


        {
            text: "Status",
            dataField: "status",
            formatter: (d) => <span className={statusClass[d]}>{d}</span>,
        },
    ];


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

            <div className="mt-8">
                <PageTitle title="Latest Property List" />

                <Table
                    columns={columns}
                    data={property}
                    onReload={getProperty}
                    loading={loading}
                    indexed
                    pagination
                    onView={(data) => push(`/admin/property/view/${data?._id}`)}
                />
            </div>

        </div>
    );
};

export default AdminDashboard;