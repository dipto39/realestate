"use client";
import { Form } from 'antd';
import React, { useEffect } from 'react';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchLanguage } from '../../../../../helpers/backend';
import PageTitle from '../../../../../../components/common/title';
import { LanguageForm } from '../../add/page';


const EditLanguages = ({ params }) => {
    const [form] = Form.useForm();
    const [data, getData, { loading }] = useFetch(fetchLanguage, {}, false);

    useEffect(() => {
        if (params?._id) {
            getData({ _id: params?._id });
        }
    }, [params]);

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data,
                rtl: data?.rtl ? true : false,
            });
        }
    }, [data]);

    return (
        <>
            <PageTitle title="Edit Languages" />
            <LanguageForm title="Edit Languages" form={form} />
        </>
    );
};

export default EditLanguages;