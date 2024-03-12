'use claint';
import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import Button from '../../common/button';
import FormInput, { HiddenInput } from '../../form/input';
import MultipleImageInput from '../../form/multiImage';
import PhoneNumberInput from '../../form/phoneNumberInput';
import { useAction } from '../../../app/helpers/hooks';
import { agentProfileUpdate } from '../../../app/helpers/backend';
import { useRouter } from 'next/navigation';
import { useUser } from '../../../app/contexts/user';
import { useI18n } from '../../../app/providers/i18n';

const EditProfile = ({ setActive, active }) => {
    const [form] = Form.useForm();
    const { user, getUser } = useUser()
    console.log("🚀 ~ EditProfile ~ user:", user)
    const { push } = useRouter()
    const i18n = useI18n()

    useEffect(() => {
        form.setFieldsValue({
            ...user,
            image: user?.image ? [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: user?.image,
                },
            ] : ''
            
        })
    }, [user?._id])

    return (
        <Form form={form} layout="vertical" onFinish={async (values) => {
            return await useAction(agentProfileUpdate, {
                ...values,
                image: values?.image?.[0]?.originFileObj
            },
                () => user?.role === "agent" ? setActive('dashboard') : setActive('profile'),
            )
        }}>
            <HiddenInput name="_id" />
            <FormInput name="name" label={i18n?.t('Name')} />
            <FormInput name="email" label={i18n?.t('Email')} isEmail readOnly />
            <PhoneNumberInput name="phone" label={i18n?.t('Phone Number')} />
            {
                user?.role === "agent" && <>
                    <FormInput name="about" label={i18n?.t('About')} textArea />
                    <FormInput name="address" label={i18n?.t('Address')} />
                    <FormInput name="facebook" label={i18n?.t('Facebook Link')} />
                    <FormInput name="twitter" label={i18n?.t('Twitter Link')} />
                    <FormInput name="instagram" label={i18n?.t('Instagram Link')} />
                    <FormInput name="linkedin" label={i18n?.t('Linkedin Link')} />
                </>
            }
            <MultipleImageInput name="image" label={i18n?.t('Image')} />
            <Button className="mt-4" type="primary"> {i18n?.t('Update')} </Button>
        </Form>
    );
}

export default EditProfile;
