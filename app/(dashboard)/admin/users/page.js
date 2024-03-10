'use client';
import React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Select } from 'antd';
import { useFetch } from '../../../helpers/hooks';
import { fetchUsers } from '../../../helpers/backend';
import PageTitle from '../../../../components/common/title';
import Table from '../../../../components/common/table';
import { useI18n } from '../../../providers/i18n';

const UsersList = () => {
    const router = useRouter();
    const [data, getData, { loading }] = useFetch(fetchUsers);
    const i18n = useI18n()
    const columns = [
        { text: "Created At", dataField: "createdAt", formatter: (d) => dayjs(d).format('DD MMM YYYY') },
        { text: "Name", dataField: "name" },
        { text: "Phone", dataField: "phone" },
        { text: "Email", dataField: "email" },
        { text: "Role", dataField: "role", formatter: (d) => <span className="capitalize">{d}</span> },
    ];


    let action = (
        <div className='flex gap-2'>
            <div>
                <Select
                    allowClear
                    placeholder={i18n.t("Filter User")}
                    style={{ minWidth: 150 }}
                    onClear={() => getData({ role: undefined })}
                    onChange={value => getData({ role: value })}>
                    <Select.Option value={undefined}>{i18n.t("All")}</Select.Option>
                    <Select.Option value={'user'}>{i18n.t("User")}</Select.Option>
                    <Select.Option value={'agent'}>{i18n.t("Agent")}</Select.Option>
                </Select>
            </div>
        </div>
    )

    return (
        <div>
            <PageTitle title={'Users List'} />
            <Table
                columns={columns}
                loading={loading}
                data={data}
                onReload={getData}
                indexed
                pagination
                onView={(data) => {
                    router.push(`/admin/users/view/${data._id}`)
                }}
                action={action}
            />
        </div>
    );
};

export default UsersList;