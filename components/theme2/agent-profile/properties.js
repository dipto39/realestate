"use client"
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { delAgentProperty, getAllProperty, toggleAdminPropertyActive } from '../../../app/helpers/backend';
import { useActionConfirm, useFetch } from '../../../app/helpers/hooks';

import { useRouter } from 'next/navigation';
import FrontTable from '../../common/fronTable';
import { statusClass } from '../../../app/helpers/utils';
import { Switch, message } from 'antd';
import { useI18n } from '../../../app/providers/i18n';

function AgentProperties({ user, active, setActive }) {
    const { push } = useRouter()

    const [data, getData, { loading }] = useFetch(getAllProperty);

    const i18n = useI18n()
    const columns = [
        {
            text: 'Thumb Image',
            dataField: 'thumb_image',
            formatter: (thumb_image) => <img src={thumb_image} className='w-20 h-12' alt='thumb_image' />,
        },
        {
            text: 'Title',
            dataField: 'title',
            formatter: (title) => <h1 className='capitalize'>{title?.slice(0, 20)}...</h1>,
        },
        {
            text: 'Type',
            dataField: 'type',
            formatter: (type) => <>{type}</>,
        },
        {
            text: 'Price',
            dataField: 'price',
            formatter: (price) => <>{price}</>,
        },

        {
            text: "Status",
            dataField: "status",
            formatter: (status) => <span className={statusClass[status]}>{status}</span>,
        },

        {
            text: 'Status', dataField: 'is_active', formatter: (_, d) => <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={d?.is_active}
                onChange={async (e) => {
                    await useActionConfirm(toggleAdminPropertyActive, { _id: d._id, }, getData, 'Are you sure you want to change active status?', 'Yes, Change');
                }}
                className='bg-gray-500'
            />
        },
    ]

    return (
        <div>
            {data ? <FrontTable columns={columns} data={data} pagination={true}
                indexed={true}
                action={

                    <button onClick={() => {
                        setActive('add-property')
                        if (!user?.activeSubscription?.active) {
                            message.error(i18n?.t('Please subscribe to add new property'));
                        }
                    }} className='flex items-center gap-1'>
                        <FaPlus />
                        <h1 className='font-bold'>{i18n?.t('Add New Property')}</h1>
                    </button>
                }
                onView={(data) => {
                    push(`/agent-profile?_id=${data._id}`);
                    setActive('view-property');
                }}
                onEdit={(data) => {
                    push(`/agent-profile?_id=${data._id}`);
                    setActive('add-property');
                }}
                onDelete={delAgentProperty}
                onReload={getData}
                loading={loading} /> : <div className='m-7 rounded-lg p-8 shadow-[0px_0px_10px_rgba(0,0,0,0.2)] '>
                <h1 className='header_4_bold pb-1 text-dark_text'>{i18n?.t('Properties')}</h1>
                <hr className='h-[2px] w-full bg-gray-200' />
                <div className='pt-10 text-center'>
                    <p className='paragraph_1'>{i18n?.t('Oops')}!</p>
                    <p className='paragraph_3 text-secondary_text'>{i18n?.t('No properties')}</p>
                </div>
            </div>}
        </div>
    );
}

export default AgentProperties;
