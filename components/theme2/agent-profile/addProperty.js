"use client";
import { Checkbox, Form, Input, Select, Space, Spin, Switch, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import FormInput, { HiddenInput } from '../../form/input';
import FormSelect from '../../form/select';
import MultipleImageInput from '../../form/multiImage';
import { useFetch } from '../../../app/helpers/hooks';
import { getAgentProperty, postMultipleImage, postProperty, postSingleImage, propertyAdditionalInfo, propertyCategories } from '../../../app/helpers/backend';
// import { Country, City, Currency } from 'country-state-city';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import { cities, countries } from "country-cities";
import { useUser } from '../../../app/contexts/user';
import { useI18n } from '../../../app/providers/i18n';
import JodiEditor from '../../form/jodiEditor';

export default function AddProperty({ setActive }) {
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [singleData, getSingleData] = useFetch(getAgentProperty, {}, false);
    const propertyId = useSearchParams().get("_id");
    const [selectedCountry, setSelectedCountry] = useState('')
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const [auCities, setAuCities] = useState([])

    useEffect(() => {
        if (!!selectedCountry) {
            setAuCities(cities.getByCountry(selectedCountry));
        }
    }, [selectedCountry])


    useEffect(() => {
        getSingleData({ _id: propertyId });
        if (singleData) {
            form.setFieldsValue({
                ...singleData,
                description: singleData?.description,
                category: singleData?.category?._id,
                additional_info: singleData?.additional_info?.map((additional_info) => additional_info._id),
                images: singleData?.images?.map((img, index) => ({
                    uid: `-${index + 1}`,
                    name: img,
                    status: 'done',
                    url: img,
                })),
                thumb_image: singleData?.thumb_image?.length > 0
                    ? [
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: singleData?.thumb_image,
                        },
                    ]
                    : [],
                video: singleData?.video?.length > 0
                    ? [
                        {
                            uid: '-1',
                            name: 'video.mp4',
                            status: 'done',
                            url: singleData?.video,
                        },
                    ]
                    : [],
                nearest_location: singleData?.nearest_location?.map((nearest_location) => ({
                    location: nearest_location.location,
                    distance: nearest_location.distance,
                })),
                property_plan: singleData?.property_plan?.map((property_plan) => ({
                    property_name: property_plan.property_name,
                    property_image: property_plan.property_image?.length > 0
                        ? [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: property_plan.property_image,
                            },
                        ]
                        : [],

                })),
            });
        }
    }, [singleData?._id, propertyId]);

    const [data, getData] = useFetch(propertyCategories);

    const [addInfo, getAddInfo] = useFetch(propertyAdditionalInfo)



    return (
        <div className=''>
            <Form layout='vertical' form={form} onFinish={async (values) => {
                setLoading(true)
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
                    description: values?.description,
                    short_description: values?.short_description,
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
                
                if (user?.activeSubscription?.active) {
                    await postProperty(payload).then(({ data, error, msg }) => {
                        if (error === false) {
                            setLoading(false)
                            message.success(msg);
                            setLoading(false)
                            setActive('properties')
                        } else {
                            setLoading(false)
                            message.error(i18n.t('Failed to add property'));
                        }

                    }).catch((err) => err.response.data)
                } else {
                    if (payload?._id) {
                        await postProperty(payload).then(({ data, error, msg }) => {
                            if (error === false) {
                                setLoading(false)
                                message.success(msg);
                                setActive('properties')
                            } else {
                                setLoading(false)
                                message.error(msg);
                            }

                        }).catch((err) => {
                            setLoading(false)
                        })
                    }
                    else {
                        setLoading(false)
                        message.error(i18n.t('Please subscribe to add property'));

                    }
                }
            }} className=''>
                {propertyId && <HiddenInput name={'_id'} />}
                <div className=''>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n.t('Title')} <span className='text-primary'>*</span>
                        </p>

                    </div>
                    <FormInput required={true} name={'title'}></FormInput>
                </div>
                <div className='mt-6 flex items-center gap-12'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n.t('Type')} <span className='text-primary'>*</span>
                            </p>
                        </div>
                        <FormSelect required={true} name={'type'} options={[{ value: 'rent', label: 'Rent' }, { value: 'sale', label: 'Sale' }]}></FormSelect>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n.t('Category')} <span className='text-primary'>*</span>
                            </p>
                        </div>
                        <FormSelect required={true} name={'category'} options={data}></FormSelect>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n.t('Images')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <MultipleImageInput required={true} name={'images'} max={5} ></MultipleImageInput>
                </div>
                {/* <div className='mt-6'>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n.t('Description')}
                        </p>
                    </div>
                    <Form.Item
                        name="description"
                        style={{
                            border: "1px solid #F1EDFF",
                            padding: "5px",
                            borderRadius: 10,
                        }}
                    >
                        <TextEditor />
                    </Form.Item>
                </div> */}
                <div>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n.t('Short Description')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <FormInput name={'short_description'} textArea={true} rules={[{ required: true , message: i18n?.t('Please enter short description')}]}></FormInput>
                </div>

                <div className='mt-6'>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n.t('Description')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <JodiEditor  name={'description'} required={true} rules={[{ required: true , message: 'Please enter description'}]}></JodiEditor>
                </div>

                <div className='mt-6'>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n?.t('Property Location')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <FormInput required={true} name={'address'}></FormInput>
                </div>

                <div className='mt-6 grid grid-cols-4 gap-5'>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('Bedrooms')} <span className='text-primary'>*</span></p>
                        </div>
                        <FormInput
                            name={'bedrooms'}
                            type={'number'}
                            required={true}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                            ]}
                        />
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('Bathrooms')} <span className='text-primary'>*</span></p>
                        </div>
                        <FormInput name={'bathrooms'} type={'number'} required={true}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                            ]}>

                        </FormInput>
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('Total Garage')} <span className='text-primary'>*</span></p> 
                        </div>
                        <FormInput name={'garage'} type={'number'} required={true}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                            ]}>

                        </FormInput>
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('Total Kitchen')} <span className='text-primary'>*</span></p> 
                        </div>
                        <FormInput name={'kitchen'} type={'number'} required={true}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                            ]}>

                        </FormInput>
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n?.t('Area')} (m<sup>2</sup>) <span className='text-primary'>*</span>
                            </p>
                        </div>
                        <FormInput name={'area'} required={true} type={'number'}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                    </div>
                    <div className=''>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n?.t('Unit')} (m<sup>2</sup>) <span className='text-primary'>*</span>
                            </p>
                        </div>
                        <FormInput name={'unit'} required={true} type={'number'}
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && value < 0) {
                                            return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                    </div>
                    <div className='col-span-2'>
                        <div className='w-full'>
                            <div className='flex items-center justify-between pb-1'>
                                <p className='paragraph_1 text-dark_text '>{i18n?.t('Price')} <span className='text-primary'>*</span></p>
                            </div>
                            <FormInput name={'price'} type={'number'} required={true}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Cost can't be negative")))
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
                                ]}>

                            </FormInput>
                        </div>
                    </div>
                </div>
                <div className='mt-6 grid grid-cols-2 gap-5'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('Country')} <span className='text-primary'>*</span></p>
                        </div>
                        <FormSelect name={'country'}
                            onChange={(e) => {
                                const selectedCountry = countries?.all()?.find(country => country.name === e)
                                setSelectedCountry(selectedCountry?.isoCode)
                            }}
                            options={countries.all()?.map(d => ({ ...d, value: d?.name, label: d?.name }))}
                            search required />
                    </div>

                    <div className='w-full'>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>{i18n?.t('City')} <span className='text-primary'>*</span></p>
                        </div>

                        <FormSelect name={'city'}
                            options={auCities?.map(d => ({ ...d, value: d?.name, label: d?.name }))}
                            search required />
                    </div>
                </div>
                <div>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text !font-bold'>
                            {i18n?.t('Additional Information')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <hr className='border-none bg-slate-600 h-[1px] mb-5' />
                    <div className='property_additional'>
                        <Form.Item name="additional_info" rules={[{ required: true, message: i18n?.t('Please select atleast one additional information') }]}>
                            <Checkbox.Group>
                                {
                                    addInfo?.map((item, i) => (
                                        <Checkbox value={item._id}>{item?.name}</Checkbox>
                                    ))
                                }
                            </Checkbox.Group>
                        </Form.Item>
                    </div>

                </div>

                <div>
                    <p className='paragraph_1 text-dark_text mb-6 !font-bold'>
                        {i18n?.t('Nearest Location')}
                    </p>

                    <Form.List name="nearest_location">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ name }, index) => (

                                    <div key={index} className=' flex items-center gap-12'>
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between pb-1'>
                                                <p className='paragraph_1 text-dark_text '>
                                                    {i18n?.t('Select Location')}
                                                </p>
                                            </div>
                                            <FormInput name={[name, 'location']}></FormInput>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between'>
                                                <p className='paragraph_1 text-dark_text '>
                                                    {i18n?.t('Distance(km)')}
                                                </p>
                                            </div>
                                            <FormInput name={[name, 'distance']} type={"number"} rules={[() => ({
                                                validator(_, value) {
                                                    if (value && value < 0) {
                                                        return Promise.reject(new Error(i18n.t("Cost can't be negative")))
                                                    }
                                                    return Promise.resolve()
                                                }
                                            }), () => ({
                                                validator(_, value) {
                                                    if (isNaN(value)) {
                                                        return Promise.reject(new Error(i18n.t("Cost should be number")))
                                                    }
                                                    return Promise.resolve()
                                                }
                                            })
                                            ]}></FormInput>
                                        </div>
                                        {fields.length ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(index)}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                                <div className='hover:bg-primary bg-slate-500 text-white flex justify-end px-6 py-2 ml-auto rounded-full w-fit cursor-pointer' onClick={() => add()} block icon={<PlusOutlined />}>
                                    {i18n?.t('Add More')}
                                </div>
                            </>
                        )}
                    </Form.List>


                </div>

                <div>
                    <p className='paragraph_1 text-dark_text mb-6 !font-bold'>
                        {i18n?.t('Property Plan')}
                    </p>
                    <Form.List name="property_plan">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ name }, index) => (

                                    <div key={index} className=' flex items-start gap-12'>
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between pb-1'>
                                                <p className='paragraph_1 text-dark_text '>
                                                    {i18n?.t('Name')}
                                                </p>
                                            </div>
                                            <FormInput name={[name, 'property_name']}></FormInput>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between'>
                                                <p className='paragraph_1 text-dark_text '>
                                                    {i18n?.t('Image')}
                                                </p>
                                            </div>
                                            <MultipleImageInput name={[name, 'property_image']}></MultipleImageInput>
                                        </div>
                                        {fields.length ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(index)}
                                            />
                                        ) : null}
                                    </div>
                                ))}
                                <div className='hover:bg-primary bg-slate-500 text-white flex justify-end px-6 py-2 ml-auto rounded-full w-fit cursor-pointer ' onClick={() => add()} block icon={<PlusOutlined />}>
                                    {i18n?.t('Add More')}
                                </div>
                            </>
                        )}
                    </Form.List>
                </div>
                <div className=''>
                    <div className='flex items-center justify-between pb-1'>
                        <p className='paragraph_1 text-dark_text '>
                            {i18n?.t('Thumb Image')} <span className='text-primary'>*</span>
                        </p>
                    </div>
                    <MultipleImageInput name={"thumb_image"} required={true}></MultipleImageInput>
                </div>
                <div className=' flex items-start gap-12'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between pb-1'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n?.t('Video Description')}
                            </p>
                        </div>
                        <FormInput name={"video_description"}></FormInput>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <p className='paragraph_1 text-dark_text '>
                                {i18n?.t('Video')}
                            </p>
                        </div>
                        <MultipleImageInput name={"video"} video={true} required={true}></MultipleImageInput>
                    </div>
                </div>


                {user?.activeSubscription?.active ? <button disabled={loading} className='paragraph_1 mt-5 w-full rounded border border-primary bg-primary px-5 py-2 text-white  outline-none transition-all duration-700'>
                    {
                        loading ?
                            
                            <Spin />
                         
                        : i18n?.t('Submit')
                    }
                </button> : <div onClick={() => message.error(i18n?.t('Please subscribe to add property'))} className='paragraph_1 text-center cursor-pointer mt-5 w-full rounded border border-primary bg-primary px-5 py-2 text-white  outline-none transition-all duration-700'>
                    {i18n?.t('Please subscribe to add property')}
                </div>}
            </Form>
        </div>
    );
}
