"use client"
import Link from 'next/link';
import React from 'react';
import { AiFillDashboard, AiOutlineHome } from 'react-icons/ai';
import {
    FaArrowDown,
    FaArrowUp,
    FaCreditCard,
    FaEdit,
    FaHome,
    FaPlus,
    FaSearch,
    FaTrash,
    FaTrashAlt,
    FaUserAlt,
} from 'react-icons/fa';
import { FaHouseCircleCheck, FaLocationDot, FaRotate, FaShield } from 'react-icons/fa6';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { delAgentProperty, getAllProperty, toggleAdminPropertyActive } from '../../../app/helpers/backend';
import { useActionConfirm, useFetch } from '../../../app/helpers/hooks';
import Image from 'next/image';
import dayjs from 'dayjs';
import Button from '../../common/button';
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
            <FrontTable columns={columns} data={data} pagination={true}
                indexed={true}
                action={
                    // <Button onClick={() => setActive('add-property')}>
                    //     Add New 
                    // </Button>
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
                loading={loading} />
        </div>
    );
}

export default AgentProperties;
