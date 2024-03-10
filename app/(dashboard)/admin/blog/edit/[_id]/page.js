"use client";
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { fetchBlog } from '../../../../../helpers/backend';
import { useFetch } from '../../../../../helpers/hooks';
import PageTitle from '../../../../../../components/common/title';
import { BlogForm } from '../../add/page';

const EditAdminBlog = ({ params }) => {
    const [form] = Form.useForm();
    const [data, getData] = useFetch(fetchBlog, {}, false);

    useEffect(() => {
        getData({ _id: params?._id });
        if (data) {
            form.setFieldsValue({
                ...data,
                category: data?.category?._id,
                tags: data?.tags?.map((tag) => tag._id),
                image:
                    data?.image?.length > 0
                        ? [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: data?.image,
                            },
                        ]
                        : [],
            });
        }

    }, [data?._id]);
    return (
        <div>
            <PageTitle title={"Edit Blog"} />
            <div className="border rounded-md p-4 bg-white shadow-md">
                <BlogForm form={form} />
            </div>
        </div>
    );
};

export default EditAdminBlog;