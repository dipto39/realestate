'use claint';
import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useUser } from '../../../app/contexts/user';
import Button from '../../common/button';
import FormInput, { HiddenInput } from '../../form/input';
import MultipleImageInput from '../../form/multiImage';
import PhoneNumberInput from '../../form/phoneNumberInput';
import { useAction } from '../../../app/helpers/hooks';
import { agentProfileUpdate } from '../../../app/helpers/backend';
import { useRouter } from 'next/navigation';

const Setting = ({ active, setActive }) => {
    const [form] = Form.useForm();
    const { user, getUser } = useUser()
    const { push } = useRouter()

    useEffect(() => {
        form.setFieldsValue({
            ...user,
            image: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: user?.image,
                },
            ]
            ,
        })
    }, [user])

    return (
        <Form form={form} layout="vertical" onFinish={async (values) => {
            return await useAction(agentProfileUpdate, {
                ...values,
                image: values?.image?.[0]?.originFileObj
            },
                () => setActive('dashboard'),
            )
        }}>
            <HiddenInput name="_id" />
            <FormInput name="name" label="Name" />
            <FormInput name="email" label="Email" isEmail readOnly={true} required={true} />
            <FormInput name="about" label="About" />
            <PhoneNumberInput name="phone" label="Phone Number" />
            {/* <FormInput name="description" label="Description" textArea /> */}
            <FormInput name="address" label="Address" />
            <FormInput name="facebook" label="Facebook Link" />
            <FormInput name="twitter" label="Twitter Link" />
            <FormInput name="instagram" label="Instagram Link" />
            <FormInput name="linkedin" label="Linkedin Link" />
            {/* <FormInput name="youtube" label="Youtube Link" /> */}
            <MultipleImageInput name="image" label={"Image"} />
            <Button className="mt-4" type="primary"> {"Submit"} </Button>
        </Form>
    );
}

export default Setting;
