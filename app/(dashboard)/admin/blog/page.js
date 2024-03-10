"use client";
import React from 'react';
import PageTitle from '../../../../components/common/title';
import Table, { TableImage } from '../../../../components/common/table';
import { Switch } from 'antd';
import { useActionConfirm, useFetch } from '../../../helpers/hooks';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../providers/i18n';
import { delBlog, fetchBlogs, toggleBlogPopular, toggleBlogPublish } from '../../../helpers/backend';
import Button from '../../../../components/common/button';

const AdminBlogCreate = () => {
    const [data, getData, { loading }] = useFetch(fetchBlogs);
    const { push } = useRouter();
    const i18n = useI18n()


    const columns = [
        {
            text: "Image",
            dataField: "image",
            formatter: (_, d) => (
                <div className="flex space-x-1">
                    <TableImage url={d?.image} />
                </div>
            ),
        },
        { text: "Title", dataField: "title" },
        {
            text: "Category", dataField: "category", formatter: (_, d) => <span>{d?.category?.name}</span>,
        },
        {
            text: "Tags",
            dataField: "tags", formatter: (_, d) => <span>{d?.tags?.map((d) => d?.name).join(", ")}</span>,
        },
        {
            text: 'Status', dataField: 'published', formatter: (_, d) => <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={d?.published}
                onChange={async (e) => {
                    await useActionConfirm(toggleBlogPublish, { _id: d._id, }, getData, 'Are you sure you want to change published status?', 'Yes, Change');
                }}
                className='bg-gray-500'
            />
        },
        {
            text: 'Popular', dataField: 'add_to_popular', formatter: (_, d) => <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={d?.add_to_popular}
                onChange={async (e) => {
                    await useActionConfirm(toggleBlogPopular, { _id: d._id, }, getData, 'Are you sure you want to change add popular status?', 'Yes, Change');
                }}
                className='bg-gray-500'
            />
        },
    ];

    return (
        <div>
            <PageTitle title="Blog List" />

            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                onDelete={delBlog}
                action={
                    <Button
                        onClick={() => {
                            push("/admin/blog/add");
                        }}
                    >
                        {i18n.t("Add New")}
                    </Button>
                }
                onEdit={(data) => { push(`/admin/blog/edit/${data?._id}`) }}
                onView={(data) => push(`/admin/blog/view/${data?._id}`)}
                indexed
                pagination
            />

        </div>
    );
};

export default AdminBlogCreate;