"use client";
import { Card, Form } from 'antd';
import React, { useState } from 'react';
import PageTitle from '../../../../../components/common/title';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../../providers/i18n';
import { postPaymentMethod } from '../../../../helpers/backend';
import FormInput, { HiddenInput } from '../../../../../components/form/input';
import FormSelect from '../../../../../components/form/select';
import Button from '../../../../../components/common/button';
import { useAction } from '../../../../helpers/hooks';

const AddPaymentMethods = () => {
    const [form] = Form.useForm();
    const [selectedMethod, setSelectedMethod] = useState('');

    return (
        <div>
            <PageTitle title="Add Payment Method" />
            <PaymentMethodForm title="Add Method" form={form} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />

        </div>
    );
};

export default AddPaymentMethods;

export const PaymentMethodForm = ({ title, form, selectedMethod, setSelectedMethod }) => {
    const { push } = useRouter()
    const i18n = useI18n()

    return (
        <>
            <Card>
                <h6 className="mb-4">{i18n.t("Payment Method Information")}</h6>
                <div className="body">
                    <Form form={form} layout="vertical" onFinish={(values) => {
                        return useAction(
                            values?._id ? postPaymentMethod : postPaymentMethod,
                            values, () => {
                                push('/admin/payment_method')
                            })
                    }}>
                        {
                            title !== "Add Method" && <HiddenInput name="_id" />
                        }
                        <div className="md:w-1/2">
                            <FormInput name="name" label={i18n.t("Name")} required />
                        </div>
                        <div className="md:w-1/2">
                            <FormSelect name="type" label={i18n.t("Method Type")}
                                onChange={(e) => {
                                    setSelectedMethod(e)
                                }}
                                options={[
                                    {
                                        value: 'paypal',
                                        label: "Paypal"
                                    },
                                    {
                                        value: 'stripe',
                                        label: "Stripe"
                                    },

                                ]}
                                allowClear
                            />
                        </div>
                        {
                            selectedMethod === 'paypal' &&
                            <>
                                <div className="md:w-1/2">
                                    <FormInput required name={['config', 'clientId']} label={i18n.t("Paypal Client ID")} placeholder={''} />
                                    <FormInput required name={['config', 'clientSecret']} label={i18n.t("Paypal Client Secret")} placeholder={''} />
                                    <FormSelect required name={['config', 'mode']} label={i18n.t("Paypal Mode")} options={[{ value: 'sandbox', label: 'Sandbox' }, { value: 'live', label: 'Live' }]} />
                                </div>
                            </>
                        }
                        {
                            selectedMethod === 'stripe' &&
                            <>
                                <div className="md:w-1/2">
                                    <FormInput required name={['config', 'clientId']} label={i18n.t("Stripe Client ID")} placeholder={''} />
                                    <FormInput required name={['config', 'clientSecret']} label={i18n.t("Stripe Client Secret")} placeholder={''} />
                                    <FormSelect required name={['config', 'mode']} label={i18n.t("Stripe Mode")} options={[{ value: 'sandbox', label: 'Sandbox' }, { value: 'live', label: 'Live' }]} />
                                </div>
                            </>
                        }
                        <Button>
                            {title === "Add Method" ? "Submit" : "Update"}
                        </Button>
                    </Form>
                </div>
            </Card>
        </>
    )
}
