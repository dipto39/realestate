"use client";
import React, { useEffect, useState } from 'react';
import PageTitle from '../../../../components/common/title';
import Table from '../../../../components/common/table';
import { useAction, useFetch } from '../../../helpers/hooks';
import { delSubscription, fetchSubscription, fetchSubscriptionDetails, postSubscription } from '../../../helpers/backend';
import { Form, Modal, Switch } from 'antd';
import Button from '../../../../components/common/button';
import { useI18n } from '../../../providers/i18n';
import FormInput from '../../../../components/form/input';
import FormSelect from '../../../../components/form/select';

const AdminPricingPlan = () => {
    const [data, getData, { loading }] = useFetch(fetchSubscription);
    const [subscriptionDetails, getSubscriptionDetails] = useFetch(fetchSubscriptionDetails, {}, false);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [is_active, setIsActive] = useState(null);
    const [planType, setPlanType] = useState('');
    const i18n = useI18n()

    useEffect(() => {
        if (!!subscriptionId) {
            getSubscriptionDetails({ _id: subscriptionId });
        }
    }, [subscriptionId]);

    const columns = [
        { text: "Name", dataField: "name", formatter: (d) => <span className='capitalize'>{d}</span> },
        { text: "Price", dataField: "price", formatter: (_, d) => d?.price },
        { text: "Plan Type", dataField: "plan_type", formatter: (_, d) => <span className='capitalize'>{d?.plan_type}</span> },
        { text: "Credits", dataField: "credits" },
        { text: "Minimum Buying", dataField: "minimum_buying" },

        {
            text: "Features", dataField: "features", formatter: (features) => <span>{
                features?.map((feature, index) => <p key={index}>{feature}</p>)
            }</span>
        },
        {
            text: "Status",
            dataField: "is_active",
            formatter: (d) =>
                d === true ? (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Active
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Inactive
                    </span>
                ),
        },

    ];

    return (
        <div>
            <PageTitle title="Pricing Plan" />
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                action={
                    <div className='flex items-center gap-3'>
                        <div>
                            <Button
                                onClick={() => {
                                    form.resetFields();
                                    setOpen(true);
                                }}
                            >
                                {i18n.t("Add New")}
                            </Button>
                        </div>
                    </div>
                }
                onEdit={(data) => {
                    setOpen(true);
                    setSubscriptionId(data?._id !== null ? data?._id : {})
                    form.setFieldsValue({
                        name: data?.name,
                        price: data?.price,
                        plan_type: data?.plan_type,
                        features: data?.features,
                        credits: data?.credits,
                        minimum_buying: data?.minimum_buying,
                        is_active: data?.is_active,
                    })
                    setPlanType(data?.plan_type)
                    setIsEdit(true);
                }}
                onDelete={delSubscription}
                indexed
                pagination
                title={i18n.t("Pricing Plan List")}
            />
            <Modal
                open={open}
                onCancel={() => {
                    setOpen(false);
                    setIsEdit(false);
                }}
                title={i18n.t("Pricing Plan")}
                footer={null}
                destroyOnClose={true}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        const payload = {
                            name: values?.name || form.getFieldValue('name')?._id,
                            price: +values?.price || form.getFieldValue('price'),
                            features: values?.features || form.getFieldValue('features')?.map((feature) => feature?.label),
                            plan_type: +values?.plan_type || form.getFieldValue('plan_type'),
                            credits: planType === 'regular' ? +values?.credits : 0,
                            minimum_buying: planType === 'custom' ? +values?.minimum_buying : 0,
                            is_active: is_active || form.getFieldValue('is_active'),
                            _id: isEdit && subscriptionId || undefined
                        }
                        console.log('payload', payload)
                        return useAction(
                            isEdit ?
                                postSubscription :
                                postSubscription, payload,
                            () => {
                                setOpen(false);
                                setIsEdit(false);
                                getData();
                            });

                    }}>

                    <FormInput label={i18n.t("Name")} name="name" required />
                    <Form.List name="features" initialValue={[[]]}>
                        {(fields, { add, remove }) => (
                            <div className='mb-2'>
                                {fields.map(({ name }, index) => (
                                    <div key={index} className="flex gap-x-2">
                                        <div className="w-full">
                                            <FormInput name={[name]} label={i18n.t("Features")} required />
                                        </div>
                                        <div className="" style={{ marginTop: 32 }}>
                                            <Button className="text-red-600 !bg-red-600" type="button" onClick={() => remove(index)}>X</Button>
                                        </div>
                                    </div>

                                ))}
                                <Button className="mb-5" type="button" onClick={() => add()}>{i18n.t("Add")}</Button>
                            </div>
                        )}
                    </Form.List>
                    <FormSelect label={i18n.t("Plan Type")} name="plan_type" required
                        onChange={(value) => {
                            setPlanType(value)
                        }}
                        options={[
                            { label: "Regular", value: "regular" },
                            { label: "Custom", value: "custom" },
                        ]}
                    />

                    <div className="grid grid-cols-2 gap-x-2">
                        <FormInput label={i18n.t("Price")} name="price" required
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Price can't be negative")))
                                        }
                                        return Promise.resolve()
                                    }
                                }),
                                () => ({
                                    validator(_, value) {
                                        if (isNaN(value)) {
                                            return Promise.reject(new Error(i18n.t("Price should be number")))
                                        }
                                        return Promise.resolve()
                                    }
                                })
                            ]}
                        />
                        {
                            planType === 'regular' &&
                            <FormInput label={i18n.t("Credits")} name="credits" required
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Credits can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Credits should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                            />
                        }

                        {
                            planType === 'custom' &&
                            <FormInput label={i18n.t("Minimum Buying")} name="minimum_buying" required
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Minimum Buying can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Minimum Buying should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                            />
                        }


                    </div>
                    {
                        isEdit &&
                        <div className="grid grid-cols-2 gap-x-2">
                            <Form.Item
                                name="is_active"
                                label={i18n.t("Active")}
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch checkedChildren="Active"
                                    unCheckedChildren="Inactive"
                                    onChange={(e) => {
                                        setIsActive(e)
                                    }}
                                    className="text-black bg-[#505d69] !rounded-full" />
                            </Form.Item>
                        </div>
                    }

                    <Button className="mt-5 w-full">{i18n.t("Submit")}</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminPricingPlan;