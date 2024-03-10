"use client";
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchPaymentMethod } from '../../../../../helpers/backend';
import PageTitle from '../../../../../../components/common/title';
import { PaymentMethodForm } from '../../add/page';


const EditPaymentMethod = ({ params }) => {
    const [form] = Form.useForm()
    const [data, getData] = useFetch(fetchPaymentMethod, {}, false);
    const [selectedMethod, setSelectedMethod] = useState('');

    useEffect(() => {
        getData({ _id: params?._id });
        if (data) {
            form.setFieldsValue({
                ...data,
            });
            setSelectedMethod(data?.type)
        }
    }, [data?._id]);
    return (
        <div>
            <PageTitle title="Edit Payment Method" />
            <PaymentMethodForm title="Edit Method" form={form} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}  />
        </div>
    );
};

export default EditPaymentMethod;