'use client';
import { Card, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchSinglePage, postMultipleImage, postPage, postSingleImage } from '../../../../../helpers/backend';
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
                plan_design_image: (JSON.parse(page?.content)?.plan_design?.plan_design_image || []).map((img, index) => ({
                    uid: index,
                    name: img,
                    status: 'done',
                    url: img,
                })),
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

                        const imgArray = [];
                        if (values?.plan_design_image?.length > 0) {
                            for (let i = 0; i < values?.plan_design_image.length; i++) {
                                imgArray.push(values?.plan_design_image[i]?.originFileObj);
                            }
                        }
                        if (values?.sweet_journey_image?.[0]?.originFileObj) {
                            const image = { image: values?.sweet_journey_image?.[0]?.originFileObj, image_name: "sweet_journey" };
                            const { data } = await postSingleImage(image);
                            values.sweet_journey_image = data;
                        }
                        setLoadSpinner(true)
                        if (imgArray.length > 0) {
                            const image = { images: imgArray, image_name: "plan_design_image" };
                            const { data } = await postMultipleImage(image);
                            values.plan_design_image = data;
                        }
                        setLoadSpinner(false)

                        console.log("images", values.plan_design_image);


                        let formData = new FormData();
                        // formData = {
                        //     id: page?._id,
                        //     title: page?.title,
                        //     slug: page?.slug,
                        //     content: JSON.stringify(values?.our_history),
                        //     content_type: 'json',
                        //     ...(values.image && { image: values?.image[0]?.originFileObj }),
                        // };
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
                                        plan_design_image: values.plan_design_image
                                        // image: h_image,
                                    },
                                    sweet_journey: {
                                        heading: values?.sweet_journey?.heading,
                                        description: values?.sweet_journey?.description,
                                        sweet_journey_image: values.sweet_journey_image
                                    },
                                    // download_app: {
                                    //     heading: values?.download_app?.heading,
                                    //     description: values?.download_app?.description,
                                    //     user: {
                                    //         google_play: values?.download_app?.user?.google_play,
                                    //         app_store: values?.download_app?.user?.app_store,
                                    //     },
                                    //     driver: {
                                    //         google_play: values?.download_app?.driver?.google_play,
                                    //         app_store: values?.download_app?.driver?.app_store,
                                    //     },
                                    //     owner: {
                                    //         google_play: values?.download_app?.owner?.google_play,
                                    //         app_store: values?.download_app?.owner?.app_store,
                                    //     },
                                    // },
                                }),
                                // history_image: values?.history_image[0]?.originFileObj,
                                // app_image: values?.app_image[0]?.originFileObj,
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
                                        plan_design_image: values.plan_design_image
                                        // image: h_image,
                                    },
                                    sweet_journey: {
                                        heading: values?.sweet_journey?.heading,
                                        description: values?.sweet_journey?.description,
                                        sweet_journey_image: values.sweet_journey_image
                                    },
                                    // download_app: {
                                    //     heading: values?.download_app?.heading,
                                    //     description: values?.download_app?.description,
                                    //     user: {
                                    //         google_play: values?.download_app?.user?.google_play,
                                    //         app_store: values?.download_app?.user?.app_store,
                                    //     },
                                    //     driver: {
                                    //         google_play: values?.download_app?.driver?.google_play,
                                    //         app_store: values?.download_app?.driver?.app_store,
                                    //     },
                                    //     owner: {
                                    //         google_play: values?.download_app?.owner?.google_play,
                                    //         app_store: values?.download_app?.owner?.app_store,
                                    //     },
                                    // },
                                }),
                                // history_image: values?.history_image[0]?.originFileObj,
                                // app_image: values?.app_image[0]?.originFileObj,
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
                                <MultipleImageInput name={"plan_design_image"} label={("Image")} max={2} />
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
                        {/* <FormInput required name={["download_app", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                        <FormInput required name={["download_app", "description"]} textArea title={i18n.t("Short Description")} placeholder="Enter short info" />

                        <h6 className="text-secondary">{i18n.t('User App')}</h6>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "user", "google_play"]} title={i18n.t("Google Play Link")} placeholder="01Ride User App Google Play Link" />
                            </div>
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "user", "app_store"]} title={i18n.t("App Store Link")} placeholder="01Ride User App App Store Link" />
                            </div>
                        </div>

                        <h6 className="text-secondary">{i18n.t('Driver App')}</h6>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "driver", "google_play"]} title={i18n.t("Google Play Link")} placeholder="01Ride Driver App Google Play Link" />
                            </div>
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "driver", "app_store"]} title={i18n.t("App Store Link")} placeholder="01Ride Driver App App Store Link" />
                            </div>
                        </div>

                        <h6 className="text-secondary">{i18n.t('Owner App')}</h6>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "owner", "google_play"]} title={i18n.t("Google Play Link")} placeholder="01Ride Owner App Google Play Link" />
                            </div>
                            <div className="col-span-1">
                                <FormInput required name={["download_app", "owner", "app_store"]} title={i18n.t("App Store Link")} placeholder="01Ride Owner App App Store Link" />
                            </div>
                        </div> */}

                        {/* <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <MultipleImageInput name={"app_image"} label={("Image")} />
                            </div>
                        </div> */}
                    </div>
                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>

            </Card>

        </div>
    );
};

export default AboutPage;