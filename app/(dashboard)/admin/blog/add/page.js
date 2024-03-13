"use client";
import { Card, Form, Switch } from 'antd';
import React from 'react';
import PageTitle from '../../../../../components/common/title';
import { fetchCategories, fetchTags, postBlog } from '../../../../helpers/backend';
import { useI18n } from '../../../../providers/i18n';
import { useRouter } from 'next/navigation';
import { useAction, useFetch } from '../../../../helpers/hooks';
import FormInput, { HiddenInput } from '../../../../../components/form/input';
import FormSelect from '../../../../../components/form/select';
import MultipleImageInput from '../../../../../components/form/multiImage';
import Button from '../../../../../components/common/button';
import JodiEditor from '../../../../../components/form/jodiEditor';

const AdminBlogCreate = () => {
    const [form] = Form.useForm();
    return (
        <div>
            <PageTitle title={"Add New Blog"} />
            <Card>
                <BlogForm form={form} />
            </Card>
        </div>
    );
};

export default AdminBlogCreate;


export const BlogForm = ({ form }) => {
    const [category, getCategory, { loading }] = useFetch(fetchCategories);
    const [tags, getTags] = useFetch(fetchTags);
    const { push } = useRouter()
    const i18n = useI18n();
    const onFinish = (values) => {
        values.image = values?.image[0]?.originFileObj;
        return useAction(
            postBlog,
            {
                ...values,
            },
            () => {
                push('/admin/blog')
            }
        );
    };

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>

            <HiddenInput name="_id" />

            <FormInput label={i18n.t("Title")} name="title" required initialValue="" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category && (
                    <FormSelect
                        label={i18n.t("Blog Category")}
                        name="category"
                        required
                        initialValue=""
                        options={category?.docs?.map((cat) => ({
                            label: cat?.name,
                            value: cat?._id,
                        }))}
                    />
                )}
                {tags && (
                    <FormSelect
                        label={i18n.t("Blog Tags")}
                        name="tags"
                        required
                        multi={true}
                        options={tags?.docs?.map((tag) => ({
                            label: tag?.name,
                            value: tag?._id,
                        }))}
                    />
                )}
            </div>
            <FormInput label={i18n.t("Short Description")} name="short_description" textArea />
            <JodiEditor label={i18n.t("Details")} name="details" required />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Form.Item
                    name="add_to_popular"
                    label={i18n.t("Add to popular")}
                    valuePropName="checked"
                >
                    <Switch className="text-black bg-[#505d69] !rounded-full" />
                </Form.Item>

                <Form.Item
                    name="published"
                    label={i18n.t("Published")}
                    valuePropName="checked"
                >
                    <Switch className="text-black bg-[#505d69] !rounded-full" />
                </Form.Item>
                <MultipleImageInput label={i18n.t("Images")} name={"image"} required />

            </div>
            <div className="">
                <div className="flex ">
                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </div>
            </div>
        </Form>
    );
};
