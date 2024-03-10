"use client";
import { Card, Checkbox, Form, Spin, message } from 'antd';
import React, { useEffect, useState } from 'react';
import FormInput, { HiddenInput } from '../../../../../components/form/input';
import PageTitle from '../../../../../components/common/title';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../../providers/i18n';
import FormSelect from '../../../../../components/form/select';
import { useAction, useFetch } from '../../../../helpers/hooks';
import { postAdminProperty, postMultipleImage, postSingleImage, propertyAdditionalInfo, propertyCategories } from '../../../../helpers/backend';
import MultipleImageInput from '../../../../../components/form/multiImage';
import { cities, countries } from "country-cities";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import Button from '../../../../../components/common/button';
import JodiEditor from '../../../../../components/form/jodiEditor';


const AdminPropertyAdd = () => {
    const [form] = Form.useForm();
    const [selectedCountry, setSelectedCountry] = useState('')
    return (
        <div>
            <PageTitle title={"Add New Property"} />
            <Card>
                <PropertyForm form={form}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                />
            </Card>
        </div>
    );
};

export default AdminPropertyAdd;

export const PropertyForm = ({ form, selectedCountry, setSelectedCountry, isEdit }) => {
    const [data, getData] = useFetch(propertyCategories);
    const [auCities, setAuCities] = useState([])
    const [addInfo, getAddInfo] = useFetch(propertyAdditionalInfo)
    const { push } = useRouter()
    const i18n = useI18n();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!!selectedCountry) {
            setAuCities(cities.getByCountry(selectedCountry));
        }
    }, [selectedCountry])

    return (
        <>
            <Form layout="vertical" form={form} onFinish={async (values) => {
                setLoading(true);
                const imgArray = [];
                const preImg = [];
                // const propertyImageArray = [];
                if (values?.images?.length > 0) {
                    for (let i = 0; i < values?.images.length; i++) {
                        if (values?.images[i]?.url) {
                            preImg.push(values?.images[i]?.url);
                        }
                        imgArray.push(values?.images[i].originFileObj);
                    }
                }

                if (imgArray.length > 0) {
                    const image = { images: imgArray, image_name: "property" };
                    const { data } = await postMultipleImage(image);
                    values.images = data;
                }

                if (values?.thumb_image?.length > 0) {
                    const image = { image: values?.thumb_image?.[0]?.originFileObj, image_name: "property_thumb" };
                    const { data } = await postSingleImage(image);
                    values.thumb_image = data;
                }

                if (values?.video?.length > 0) {
                    const image = { image: values?.video?.[0]?.originFileObj, image_name: "property_video" };
                    const { data } = await postSingleImage(image);
                    values.video = data;
                }

                if (values?.property_plan?.length > 0) {
                    for (let i of values?.property_plan) {
                        const image = { image: i?.property_image?.[0]?.originFileObj, image_name: "property_plan" };
                        const { data } = await postSingleImage(image);
                        i.property_image = data;
                    }
                }

                if (preImg?.length > 0) {
                    values.prev_images = preImg;
                }
                const payload = {
                    _id: values?._id,
                    title: values?.title,
                    type: values?.type,
                    category: values?.category,
                    short_description: values?.short_description,
                    description: values?.description,
                    images: values?.images,
                    prev_images: values?.prev_images,
                    video_description: values?.video_description,
                    thumb_image: values?.thumb_image,
                    video: values?.video,
                    address: values?.address,
                    bedrooms: values?.bedrooms,
                    bathrooms: values?.bathrooms,
                    garage: values?.garage,
                    kitchen: values?.kitchen,
                    area: values?.area,
                    unit: values?.unit,
                    price: values?.price,
                    country: values?.country,
                    city: values?.city,
                    additional_info: values?.additional_info,
                    nearest_location: values?.nearest_location?.map((item) => ({
                        location: item?.location,
                        distance: item?.distance
                    })),
                    property_plan: values?.property_plan?.map((item) => ({
                        property_name: item?.property_name,
                        property_image: item?.property_image
                    }))
                }
                // return useAction(
                //     postProperty,
                //     payload,
                //     () => {
                //         push('/admin/property')
                //     }
                // );
                const { data, error, msg } = await postAdminProperty(payload);
                if (error === false) {
                    setLoading(false);
                    message.success(msg);
                    push('/admin/property')
                }
                else {
                    setLoading(false);
                    message.error("Failed to add property");
                }
            }}>

                {
                    isEdit && <HiddenInput name="_id" />
                }
                <FormInput label={i18n.t("Title")} name="title" required initialValue="" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormSelect label={i18n.t("Property Type")} name="type" required options={[{ value: 'rent', label: 'Rent' }, { value: 'sale', label: 'Sale' }]} />
                    <FormSelect label={i18n.t("Property Category")} name="category" required options={data} />
                    <FormInput label={i18n.t("Price")} name="price" required rules={[
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
                    ]} />
                </div>

                <FormInput label={i18n.t("Short Description")} name="short_description" textArea />


                <JodiEditor label={i18n.t("Description")} name="description" required />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MultipleImageInput name={'images'} max={5} label={i18n.t("Images")} />
                    <MultipleImageInput name={'thumb_image'} label={i18n.t("Thumbnail Image")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label={i18n.t("Total Bedrooms")} name="bedrooms" required rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error(i18n.t("Bedrooms can't be negative")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error(i18n.t("Bedrooms should be number")))
                                }
                                return Promise.resolve()
                            }
                        })
                    ]} />
                    <FormInput label={i18n.t("Total Bathrooms")} name="bathrooms" required rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error(i18n.t("Bathrooms can't be negative")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error(i18n.t("Bathrooms should be number")))
                                }
                                return Promise.resolve()
                            }
                        })
                    ]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput label={i18n.t("Total Garage")} name="garage" required rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error(i18n.t("Garage can't be negative")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error(i18n.t("Garage should be number")))
                                }
                                return Promise.resolve()
                            }
                        })
                    ]} />
                    <FormInput label={i18n.t("Total Kitchen")} name="kitchen" required rules={[
                        () => ({
                            validator(_, value) {
                                if (value && value < 0) {
                                    return Promise.reject(new Error(i18n.t("Kitchen can't be negative")))
                                }
                                return Promise.resolve()
                            }
                        }),
                        () => ({
                            validator(_, value) {
                                if (isNaN(value)) {
                                    return Promise.reject(new Error(i18n.t("Kitchen should be number")))
                                }
                                return Promise.resolve()
                            }
                        })
                    ]} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className=""> Area (m<sup>2</sup>)</label>
                        <FormInput name="area" required rules={[
                            () => ({
                                validator(_, value) {
                                    if (value && value < 0) {
                                        return Promise.reject(new Error(i18n.t("Area can't be negative")))
                                    }
                                    return Promise.resolve()
                                }
                            }),
                            () => ({
                                validator(_, value) {
                                    if (isNaN(value)) {
                                        return Promise.reject(new Error(i18n.t("Area should be number")))
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]} />
                    </div>
                    <div>
                        <label className=""> Unit (m<sup>2</sup>)</label>

                        <FormInput name="unit" required rules={[
                            () => ({
                                validator(_, value) {
                                    if (value && value < 0) {
                                        return Promise.reject(new Error(i18n.t("Unit can't be negative")))
                                    }
                                    return Promise.resolve()
                                }
                            }),
                            () => ({
                                validator(_, value) {
                                    if (isNaN(value)) {
                                        return Promise.reject(new Error(i18n.t("Unit should be number")))
                                    }
                                    return Promise.resolve()
                                }
                            })
                        ]} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect name={'country'} label={i18n?.t("Country")}
                        onChange={(e) => {
                            const selectedCountry = countries.all()?.find(country => country.name === e)
                            setSelectedCountry(selectedCountry?.isoCode)
                        }}
                        options={countries.all()?.map(d => ({ ...d, value: d?.name, label: d?.name }))}
                        search required />

                    <FormSelect name={'city'} label={i18n?.t("Cities")}
                        options={auCities?.map(d => ({ ...d, value: d?.name, label: d?.name }))}
                        search required />
                </div>

                <FormInput name="address" label={i18n?.t("Address")} required />

                <label className="">{i18n.t("Additional Info")}</label>
                <Form.Item name="additional_info">
                    <Checkbox.Group>
                        {
                            addInfo?.map((item, i) => (
                                <Checkbox value={item._id}>{item?.name}</Checkbox>
                            ))
                        }
                    </Checkbox.Group>
                </Form.Item>

                <div>
                    <p className='text-base font-semibold'>
                        Nearest Location
                    </p>

                    <Form.List name="nearest_location">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ name }, index) => (

                                    <div key={index} className='grid grid-cols-1 sm:grid-cols-12 gap-4'>
                                        <div className='col-span-5'>
                                            <FormInput name={[name, 'location']} label={i18n?.t("Location")} />
                                        </div>
                                        <div className='col-span-5'>
                                            <FormInput name={[name, 'distance']} label={i18n?.t("Distance")} />
                                        </div>


                                        {fields.length > 1 ? (
                                            <div className='mt-10'>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button col-span-2 text-red-600"
                                                    onClick={() => remove(index)}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                                <div className='hover:bg-primary bg-slate-500 text-white flex justify-end px-6 py-2 ml-auto rounded-full w-fit cursor-pointer' onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </div>
                            </>
                        )}
                    </Form.List>


                </div>

                <div>
                    <p className='text-base font-semibold'>
                        Property Plan
                    </p>

                    <Form.List name="property_plan">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ name }, index) => (

                                    <div key={index} className='grid grid-cols-1 sm:grid-cols-12 gap-4'>
                                        <div className='col-span-5'>
                                            <FormInput name={[name, 'property_name']} label={i18n?.t("Location")} />
                                        </div>
                                        <div className='col-span-5'>
                                            <MultipleImageInput name={[name, 'property_image']} label={i18n?.t("Distance")} />
                                        </div>


                                        {fields.length > 1 ? (
                                            <div className='mt-10'>
                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button col-span-2 text-red-600"
                                                    onClick={() => remove(index)}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                                <div className='hover:bg-primary bg-slate-500 text-white flex justify-end px-6 py-2 ml-auto rounded-full w-fit cursor-pointer' onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add field
                                </div>
                            </>
                        )}
                    </Form.List>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <FormInput name={"video_description"} label={i18n?.t("Video Description")} />
                    <MultipleImageInput name={"video"} video={true} required={true} label={i18n?.t("Video")} />
                </div>

                { loading ? <Spin /> : <Button className="mt-2.5">{i18n.t("Submit")}</Button>}

            </Form>
        </>
    );
};