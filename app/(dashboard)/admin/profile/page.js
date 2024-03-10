"use client";
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import FormInput from '../../../../components/form/input';
import MultipleImageInput from '../../../../components/form/multiImage';
import PhoneNumberInput from '../../../../components/form/phoneNumberInput';
import { agentProfileUpdate, fetchUser } from '../../../helpers/backend';
import { useAction, useFetch } from '../../../helpers/hooks';
import { Form, message } from 'antd';
import Button from '../../../../components/common/button';

const AdminProfile = () => {
    const [edit, setEdit] = useState(false)
    const [user, getUser] = useFetch(fetchUser)
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            ...user,
            image:
                user?.image?.length > 0
                    ? [
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: user?.image,
                        },
                    ]
                    : [],
        })
    }, [user])


    return (
        <div>
            <div className=" rounded-t-lg bg-white p-7 shadow-sm mt-8">
                <div className='container mx-auto flex gap-3'>
                    <span
                        role="button"
                        onClick={() => setEdit(false)}
                        className={`font-semibold  cursor-pointer hover:text-primary ${!edit && 'text-primary'}`}>My Profile</span>
                    <span className="text-gray-500">|</span>
                    <a
                        role="button"
                        onClick={() => setEdit(true)}
                        className={`font-semibold uppercase flex hover:text-primary items-center ${edit && 'text-primary'}`}>
                        <FiEdit className="inline-block mr-1" />
                        Edit profile
                    </a>
                </div>
            </div>

            {
                edit ?
                    <div className='rounded-b-lg bg-white p-7 shadow-sm'>

                        <div className='container mx-auto'>
                            <Form layout="vertical" form={form} onFinish={
                                async (values) => {
                                    const data = {
                                        name: values.name,
                                        email: values.email,
                                        phone: values.phone
                                    }
                                    const res = await agentProfileUpdate({
                                        ...data,
                                        image: values?.image?.length > 0 ? values?.image[0]?.originFileObj : null
                                    })
                                    if (res?.error === false) {
                                        message.success('Profile updated Successfully')
                                        getUser()
                                        setEdit(false)
                                    } else {
                                        message.error(res?.message)
                                    }
                                }
                            }>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                    <FormInput name="name" label={"Name"} required />
                                    <MultipleImageInput name="image"
                                        label={"Profile Picture"}
                                        max={1}
                                        required
                                        style={{ backgroundColor: '#888AA0' }}
                                        className="!bg-[#D2D2D2]" />
                                    <FormInput name="email" label={"Email"} readOnly style={{ backgroundColor: '#888AA0' }} className="!bg-[#D2D2D2]" />
                                    <PhoneNumberInput name="phone" label={'Phone Number'} required={true} />
                                </div>
                                <Button variant="primary" className="mt-1">{'Update'}</Button>
                            </Form>
                        </div>
                    </div>
                    :
                    <div className='rounded-b-lg bg-white p-7 shadow-sm'>
                        <div className='container mx-auto'>
                            <div className="flex flex-col items-center gap-1 my-3">
                                <img src={user?.image} alt="" className="w-32 h-32 rounded-full border border-primary" />
                            </div>


                            <div className="flex flex-col md:flex-row justify-between w-[400px] md:w-full  mt-5 sm:space-y-0 space-y-4">
                                <div className="flex flex-col gap-y-4">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-700">{"Name"}</p>
                                        <p className="font-semibold">{user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-700">{"Email"}</p>
                                    <div className="flex gap-x-1 items-center">
                                        <p className="font-semibold">{user?.email}</p>

                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm text-gray-700">{"Phone"}</p>
                                    <div className="flex gap-x-2 items-center">
                                        <p className="font-semibold">{user?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

            }
        </div>
    );
};

export default AdminProfile;