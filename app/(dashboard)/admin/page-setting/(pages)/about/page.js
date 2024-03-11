'use client';
import { Card, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchSinglePage, postPage, postSingleImage } from '../../../../../helpers/backend';
import { useI18n } from '../../../../../providers/i18n';
import FormInput, { HiddenInput } from '../../../../../../components/form/input';
import Button from '../../../../../../components/common/button';
import MultipleImageInput from '../../../../../../components/form/multiImage';

const AboutPage = ({ slug }) => {
    const [form] = Form.useForm();
    const [page, getPage] = useFetch(fetchSinglePage, {}, false);
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const [planDesignImg, setPlanDesignImg] = useState([]);
    const i18n = useI18n()

    useEffect(() => {
        getPage({ slug: slug });
        if (page) {
            form.setFieldsValue({
                ...page,
                plan_design: {
                    heading: JSON.parse(page?.content)?.plan_design?.heading,
                    description_1: JSON.parse(page?.content)?.plan_design?.description_1,
                    description_2: JSON.parse(page?.content)?.plan_design?.description_2,

                },
                plan_design_image1: (JSON.parse(page?.content)?.plan_design?.plan_design_image1)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.plan_design?.plan_design_image1))
                            ? (JSON.parse(page?.content)?.plan_design?.plan_design_image1)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.plan_design?.plan_design_image1),
                                },
                            ]
                    )
                    : [],

                plan_design_image2: (JSON.parse(page?.content)?.plan_design?.plan_design_image2)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.plan_design?.plan_design_image2))
                            ? (JSON.parse(page?.content)?.plan_design?.plan_design_image2)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.plan_design?.plan_design_image2),
                                },
                            ]
                    )
                    : [],
                sweet_journey: {
                    heading: JSON.parse(page?.content)?.sweet_journey?.heading,
                    description: JSON.parse(page?.content)?.sweet_journey?.description,
                },

                sweet_journey_image: (JSON.parse(page?.content)?.sweet_journey?.sweet_journey_image)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.sweet_journey?.sweet_journey_image))
                            ? (JSON.parse(page?.content)?.sweet_journey?.sweet_journey_image)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.sweet_journey?.sweet_journey_image),
                                },
                            ]
                    )
                    : [],
            });
        }

    }, [page?.slug]);



    return (
        <div>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (values) => {
                        if (values?.sweet_journey_image?.[0]?.originFileObj) {
                            const image = { image: values?.sweet_journey_image?.[0]?.originFileObj, image_name: "sweet_journey" };
                            const { data } = await postSingleImage(image);
                            values.sweet_journey_image = data;
                        }
                        setLoadSpinner(true)
                        if (values?.plan_design_image1?.[0]?.originFileObj) {
                            const image = { image: values?.plan_design_image1?.[0]?.originFileObj, image_name: "plan_design_image" };
                            const { data } = await postSingleImage(image);
                            values.plan_design_image1 = data;
                        }
                        if (values?.plan_design_image2?.[0]?.originFileObj) {
                            const image = { image: values?.plan_design_image2?.[0]?.originFileObj, image_name: "plan_design_image" };
                            const { data } = await postSingleImage(image);
                            values.plan_design_image2 = data;
                        }
                        setLoadSpinner(false)
                        let formData = new FormData();
                        
                        if (values?._id) {
                            formData = {
                                id: page?._id,
                                title: page?.title,
                                slug: page?.slug,
                                content: JSON.stringify({
                                    plan_design: {
                                        heading: values?.plan_design?.heading,
                                        description_1: values?.plan_design?.description_1,
                                        description_2: values?.plan_design?.description_2,
                                        plan_design_image1: values.plan_design_image1,
                                        plan_design_image2: values.plan_design_image2
                                    },
                                    sweet_journey: {
                                        heading: values?.sweet_journey?.heading,
                                        description: values?.sweet_journey?.description,
                                        sweet_journey_image: values.sweet_journey_image
                                    },
                                }),
                                content_type: 'json',
                            };
                        }
                        else {
                            formData = {
                                title: 'About Us',
                                content: JSON.stringify({
                                    plan_design: {
                                        heading: values?.plan_design?.heading,
                                        description_1: values?.plan_design?.description_1,
                                        description_2: values?.plan_design?.description_2,
                                        plan_design_image1: values.plan_design_image1,
                                        plan_design_image2: values.plan_design_image2
                                        // image: h_image,
                                    },
                                    sweet_journey: {
                                        heading: values?.sweet_journey?.heading,
                                        description: values?.sweet_journey?.description,
                                        sweet_journey_image: values.sweet_journey_image
                                    },
                                }),
                                content_type: 'json',
                            };
                        }
                        postPage(formData).then((res) => {
                            if (res?.error === false) {
                                message.success(res?.msg);
                            }
                        });

                    }
                    }
                >
                    <HiddenInput name="slug" />
                    <HiddenInput name="_id" />
                    <h6 className="text-secondary py-2 header_4">{i18n.t('Planning & Designing')}</h6>
                    <div className="border p-3 rounded">
                        <FormInput name={["plan_design", "heading"]} placeholder="Enter heading" />
                        <label className="text-secondary">{i18n.t('Description')}</label>
                        <FormInput name={["plan_design", "description_1"]} textArea />
                        <label className="text-secondary">{i18n.t('Description')}</label>
                        <FormInput name={["plan_design", "description_2"]} textArea />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <MultipleImageInput name={"plan_design_image1"} label={("Image 1")} />
                            </div>
                            <div className="col-span-1">
                                <MultipleImageInput name={"plan_design_image2"} label={("Image 2")} />
                            </div>
                        </div>
                    </div>
                    <div className="border p-3 rounded mt-8">
                        <h6 className="text-secondary">{i18n.t('Sweet Journey')}</h6>
                        <FormInput required name={["sweet_journey", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                        <label className="text-secondary">{i18n.t('Description')}</label>
                        <FormInput required name={["sweet_journey", "description"]} title={i18n.t("Description")} placeholder="Enter Description" textArea />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <MultipleImageInput name={"sweet_journey_image"} label={("Image")} />
                            </div>
                        </div>
                    </div>
                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>

            </Card>

        </div>
    );
};

export default AboutPage;