"use client";
import { Form, Radio, message } from 'antd'
import React, { useEffect, useState } from 'react'
import FormInput from '../../../../../components/form/input'
import PhoneNumberInput from '../../../../../components/form/phoneNumberInput'
import { createStripeSubscription, subscriptionPlanDetails } from '../../../../helpers/backend';
import { useAction, useFetch } from '../../../../helpers/hooks';
import { useUser } from '../../../../contexts/user';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../../providers/i18n';

const Page = ({ params }) => {
    const [value, setValue] = useState('');
    const router = useRouter();
    const i18n = useI18n()
    const { user } = useUser()

    const [data, getData] = useFetch(subscriptionPlanDetails)

    useEffect(() => {
        getData({ _id: params.id })
    }, [data?._id])

    return (
        <div className='container '>
            <div className='md:flex justify-between items-start gap-6 font-normal pricing-plan-form my-[80px]'>
                
                <div className='md:w-1/2 mx-auto w-full bg-[#D9D9D9] bg-opacity-20 p-[32px] rounded-xl mt-8 md:mt-0'>
                    <h1 className=' mb-8 text-2xl font-bold'>{i18n?.t('Plan Details')}</h1>
                    
                    {
                        data?.plan_type === "regular" && <h1 className='text-base'>{i18n?.t('Standard')}</h1>
                    }
                    {
                        data?.plan_type === "custom" ? <Form layout="vertical" autoComplete='off' className=''>
                            <FormInput onChange={(e) => setValue(e?.target.value)} type={"number"} label={i18n?.t('Custom Plan')} autoComplete='off' name={"customPlan"} placeholder={i18n?.t('Enter Custom Plan')} rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please provide Custom Plan'),
                                },
                                () => ({
                                    validator(_, value) {
                                        if (value && value < data?.minimum_buying) {
                                            return Promise.reject(new Error(`${i18n?.t('Custom Plan should be more than')} ${data?.minimum_buying}`))
                                        }
                                        return Promise.resolve()
                                    }
                                }),
                                () => ({
                                    validator(_, value) {
                                        if (isNaN(value)) {
                                            return Promise.reject(new Error(i18n.t("Cost should be number")))
                                        }
                                        return Promise.resolve()
                                    }
                                })
                            ]}></FormInput>
                        </Form> : null
                    }
                    <hr className='w-full my-6 border-[#909090]' />
                    <div className='mb-8 font-normal text-xl space-y-3'>
                        <div className=' flex justify-between items-center '>
                            <h1>{i18n?.t('Total Credit')}</h1>
                            <h1>{data?.plan_type === "regular" ? data?.credits : value}</h1>
                        </div>
                        <div className='mb-8 flex justify-between items-center'>
                            <h1>{data?.plan_type === "regular" ? i18n?.t('Price') : i18n?.t('Par Credit')}</h1>
                            <h1>${data?.price}</h1>
                        </div>
                    </div>
                    <div className='text-base'>
                        <h1 className='text-base mb-3'>{i18n?.t('Payment Method')}</h1>
                        <Radio.Group className='flex flex-col gap-3' value={"stripe"}>
                            <Radio value={'stripe'}>{i18n?.t('Stripe')}</Radio>
                            {/* <Radio value={2}>PayPal</Radio> */}
                            {/* <Radio value={3}>Bank Transfer</Radio> */}
                        </Radio.Group>
                    </div>
                    <button disabled={data?.plan_type === "custom" && value < data?.minimum_buying} onClick={async () => {
                        if (data?.plan_type === "regular") {
                            const res = await createStripeSubscription({ subscriptionID: data?._id })
                            if (res?.status === "success") {
                                message.success(res?.message)
                                window.open(res?.data?.checkoutSessionUrl, '_blank')
                            } else {
                                message.error(res?.message)
                            }
                        }
                        if (data?.plan_type === "custom") {
                            const res = await createStripeSubscription({ subscriptionID: data?._id, credits: value })
                            if (res?.status === "success") {
                                message.success(res?.message)
                                window.open(res?.data?.checkoutSessionUrl, '_blank')
                            } else {
                                message.error(res?.message)
                            }
                        }

                    }} className='header_5 mt-10 w-full rounded-lg border border-secondary_text bg-white py-3 text-secondary_text transition-all ease-in-out hover:bg-primary hover:text-white '>{i18n?.t('Checkout')}</button>
                </div>
            </div>
        </div>
    )
}

export default Page