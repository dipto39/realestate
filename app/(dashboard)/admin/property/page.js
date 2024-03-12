"use client";
import React from 'react';
import PageTitle from '../../../../components/common/title';
import Table, { TableImage } from '../../../../components/common/table';
import { Select, Switch, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../providers/i18n';
import { useActionConfirm, useFetch } from '../../../helpers/hooks';
import { delAdminProperty, fetchAdminProperties, toggleAdminPropertyActive } from '../../../helpers/backend';
import { statusClass } from '../../../helpers/utils';
import Button from '../../../../components/common/button';
import { useUser } from '../../../contexts/user';

const AdminPropertyList = () => {
    const [data, getData, { loading }] = useFetch(fetchAdminProperties);
    const { push } = useRouter();
    const i18n = useI18n()
    const user = useUser()

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
            text: 'Active', dataField: 'is_active', formatter: (_, d) => <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={d?.is_active}
                onChange={async (e) => {
                    await useActionConfirm(toggleAdminPropertyActive, { _id: d._id, }, getData, 'Are you sure you want to change active status?', 'Yes, Change');
                }}
                className='bg-gray-500'
            />
        },
        {
            text: "Status",
            dataField: "status",
            formatter: (d) => <span className={statusClass[d]}>{d}</span>,
        },
    ];

    let action = (
        <div className='flex md:flex-row flex-col gap-2'>
            <div>
                <Select
                    allowClear
                    placeholder="TYPE"
                    style={{ minWidth: 150 }}
                    onClear={() => getData({ type: undefined })}
                    onChange={value => getData({ type: value })}>
                    <Select.Option value={undefined}>{i18n.t("All")}</Select.Option>
                    <Select.Option value={'sale'}>{i18n.t("Sale")}</Select.Option>
                    <Select.Option value={'rent'}>{i18n.t("Rent")}</Select.Option>
                </Select>
            </div>
            <div>
                <Select
                    allowClear
                    placeholder="STATUS"
                    style={{ minWidth: 150 }}
                    onClear={() => getData({ status: undefined })}
                    onChange={value => getData({ status: value })}>
                    <Select.Option value={undefined}>{i18n.t("All")}</Select.Option>
                    <Select.Option value={'pending'}>{i18n.t("Pending")}</Select.Option>
                    <Select.Option value={'approved'}>{i18n.t("Approved")}</Select.Option>
                    <Select.Option value={'rejected'}>{i18n.t("Rejected")}</Select.Option>
                </Select>
            </div>
            <Button
                onClick={() => {
                    push("/admin/property/add");
                }}
            >
                {i18n.t("Add New")}
            </Button>
        </div>
    )

    return (
        <div>
            <PageTitle title="Property List" />
            <Table
                columns={columns}
                data={{
                    ...data,
                    docs: data?.docs?.map(doc => ({
                        ...doc,
                        disableEdit: doc.agent?._id === user?._id ? 0 : 1,
                        disableDelete: doc.agent?._id === user?._id ? 0 : 1,
                    })),
                }}
                loading={loading}
                onReload={getData}
                onDelete={delAdminProperty}
                action={action}
                onEdit={(data) => { push(`/admin/property/edit/${data?._id}`) }}
                onView={(data) => push(`/admin/property/view/${data?._id}`)}
                indexed
                pagination
            />
        </div>
    );
};

export default AdminPropertyList;