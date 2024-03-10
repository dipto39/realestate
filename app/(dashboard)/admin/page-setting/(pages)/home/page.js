"use client";
import { Card, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchSinglePage, postMultipleImage, postPage, postSingleImage } from '../../../../../helpers/backend';
import { useI18n } from '../../../../../providers/i18n';
import FormInput, { HiddenInput } from '../../../../../../components/form/input';
import MultipleImageInput from '../../../../../../components/form/multiImage';
import Button from '../../../../../../components/common/button';

const HomePageSetting = ({ slug }) => {
    const [form] = Form.useForm();
    const [page, getPage] = useFetch(fetchSinglePage, {}, false);
    const [loadingSpinner, setLoadSpinner] = useState(false);
    const i18n = useI18n()

    useEffect(() => {
        getPage({ slug: slug });
        if (page) {
            form.setFieldsValue({
                ...page,
                hero_section: {
                    heading: JSON.parse(page?.content)?.hero_section?.heading,
                    description: JSON.parse(page?.content)?.hero_section?.description,
                },
                hero_section_image: (JSON.parse(page?.content)?.hero_section?.hero_section_image)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.hero_section?.hero_section_image))
                            ? (JSON.parse(page?.content)?.hero_section?.hero_section_image)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.hero_section?.hero_section_image),
                                },
                            ]
                    )
                    : [],

                hero_section_image_home2: (JSON.parse(page?.content)?.hero_section?.hero_section_image_home2)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.hero_section?.hero_section_image_home2))
                            ? (JSON.parse(page?.content)?.hero_section?.hero_section_image_home2)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.hero_section?.hero_section_image_home2),
                                },
                            ]
                    )
                    : [],

                hero_section_image_home3: (JSON.parse(page?.content)?.hero_section?.hero_section_image_home3)
                    ? (
                        Array.isArray((JSON.parse(page?.content)?.hero_section?.hero_section_image_home3))
                            ? (JSON.parse(page?.content)?.hero_section?.hero_section_image_home3)?.map(image => ({
                                url: image.url,
                            }))
                            : [
                                {
                                    url: (JSON.parse(page?.content)?.hero_section?.hero_section_image_home3),
                                },
                            ]
                    )
                    : [],
                explore_places: {
                    heading: JSON.parse(page?.content)?.explore_places?.heading,
                    description: JSON.parse(page?.content)?.explore_places?.description,
                    explore_place_one: {
                        heading: JSON.parse(page?.content)?.explore_places?.explore_place_one?.heading,
                        description: JSON.parse(page?.content)?.explore_places?.explore_place_one?.description,

                        image: (JSON.parse(page?.content)?.explore_places?.explore_place_one?.image)
                            ? (
                                Array.isArray((JSON.parse(page?.content)?.explore_places?.explore_place_one?.image))
                                    ? (JSON.parse(page?.content)?.explore_places?.explore_place_one?.image)?.map(image => ({
                                        url: image.url,
                                    }))
                                    : [
                                        {
                                            url: (JSON.parse(page?.content)?.explore_places?.explore_place_one?.image),
                                        },
                                    ]
                            )
                            : [],
                    },
                    explore_place_two: {
                        heading: JSON.parse(page?.content)?.explore_places?.explore_place_two?.heading,
                        description: JSON.parse(page?.content)?.explore_places?.explore_place_two?.description,
                        image: (JSON.parse(page?.content)?.explore_places?.explore_place_two?.image)
                            ? (
                                Array.isArray((JSON.parse(page?.content)?.explore_places?.explore_place_two?.image))
                                    ? (JSON.parse(page?.content)?.explore_places?.explore_place_two?.image)?.map(image => ({
                                        url: image.url,
                                    }))
                                    : [
                                        {
                                            url: (JSON.parse(page?.content)?.explore_places?.explore_place_two?.image),
                                        },
                                    ]
                            )
                            : [],
                    },
                    explore_place_three: {
                        heading: JSON.parse(page?.content)?.explore_places?.explore_place_three?.heading,
                        description: JSON.parse(page?.content)?.explore_places?.explore_place_three?.description,
                        image: (JSON.parse(page?.content)?.explore_places?.explore_place_three?.image)
                            ? (
                                Array.isArray((JSON.parse(page?.content)?.explore_places?.explore_place_three?.image))
                                    ? (JSON.parse(page?.content)?.explore_places?.explore_place_three?.image)?.map(image => ({
                                        url: image.url,
                                    }))
                                    : [
                                        {
                                            url: (JSON.parse(page?.content)?.explore_places?.explore_place_three?.image),
                                        },
                                    ]
                            )
                            : [],
                    },
                },
                achievements: {
                    renovation: JSON.parse(page?.content)?.achievements?.renovation,
                    renovation_count: JSON.parse(page?.content)?.achievements?.renovation_count,
                    agents: JSON.parse(page?.content)?.achievements?.agents,
                    agents_count: JSON.parse(page?.content)?.achievements?.agents_count,
                    project: JSON.parse(page?.content)?.achievements?.project,
                    project_count: JSON.parse(page?.content)?.achievements?.project_count,
                    satisfied_clients: JSON.parse(page?.content)?.achievements?.satisfied_clients,
                    satisfied_clients_count: JSON.parse(page?.content)?.achievements?.satisfied_clients_count,
                },
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

                        if (values?.hero_section_image?.[0]?.originFileObj) {
                            const image = { image: values?.hero_section_image?.[0]?.originFileObj, image_name: "hero_section" };
                            const { data } = await postSingleImage(image);
                            values.hero_section_image = data;
                        }
                        if (values?.hero_section_image_home2?.[0]?.originFileObj) {
                            const image = { image: values?.hero_section_image_home2?.[0]?.originFileObj, image_name: "hero_section" };
                            const { data } = await postSingleImage(image);
                            values.hero_section_image_home2 = data;
                        }
                        if (values?.hero_section_image_home3?.[0]?.originFileObj) {
                            const image = { image: values?.hero_section_image_home3?.[0]?.originFileObj, image_name: "hero_section" };
                            const { data } = await postSingleImage(image);
                            values.hero_section_image_home3 = data;
                        }
                        if (values?.explore_places?.explore_place_one?.image?.[0]?.originFileObj) {
                            const image = { image: values?.explore_places?.explore_place_one?.image?.[0]?.originFileObj, image_name: "explore_place_one" };
                            const { data } = await postSingleImage(image);
                            values.explore_places.explore_place_one.image = data;
                        }
                        if (values?.explore_places?.explore_place_two?.image?.[0]?.originFileObj) {
                            const image = { image: values?.explore_places?.explore_place_two?.image?.[0]?.originFileObj, image_name: "explore_place_two" };
                            const { data } = await postSingleImage(image);
                            values.explore_places.explore_place_two.image = data;
                        }
                        if (values?.explore_places?.explore_place_three?.image?.[0]?.originFileObj) {
                            const image = { image: values?.explore_places?.explore_place_three?.image?.[0]?.originFileObj, image_name: "explore_place_three" };
                            const { data } = await postSingleImage(image);
                            values.explore_places.explore_place_three.image = data;
                        }

                        console.log("images", values.hero_section_image);


                        let formData = new FormData();

                        if (values?._id) {
                            formData = {
                                id: page?._id,
                                title: page?.title,
                                slug: page?.slug,
                                content: JSON.stringify({
                                    hero_section: {
                                        heading: values?.hero_section?.heading,
                                        description: values?.hero_section?.description,
                                        hero_section_image: values.hero_section_image || undefined,
                                        hero_section_image_home2: values.hero_section_image_home2 || undefined,
                                        hero_section_image_home3: values.hero_section_image_home3 || undefined,
                                    },
                                    explore_places: {
                                        heading: values?.explore_places?.heading,
                                        description: values?.explore_places?.description,
                                        explore_place_one: {
                                            heading: values?.explore_places?.explore_place_one?.heading,
                                            description: values?.explore_places?.explore_place_one?.description,
                                            image: values?.explore_places?.explore_place_one?.image || undefined,
                                        },
                                        explore_place_two: {
                                            heading: values?.explore_places?.explore_place_two?.heading,
                                            description: values?.explore_places?.explore_place_two?.description,
                                            image: values?.explore_places?.explore_place_two?.image || undefined,
                                        },
                                        explore_place_three: {
                                            heading: values?.explore_places?.explore_place_three?.heading,
                                            description: values?.explore_places?.explore_place_three?.description,
                                            image: values?.explore_places?.explore_place_three?.image || undefined,
                                        },
                                    },
                                    achievements: {
                                        renovation: values?.achievements?.renovation,
                                        renovation_count: values?.achievements?.renovation_count,
                                        agents: values?.achievements?.agents,
                                        agents_count: values?.achievements?.agents_count,
                                        project: values?.achievements?.project,
                                        project_count: values?.achievements?.project_count,
                                        satisfied_clients: values?.achievements?.satisfied_clients,
                                        satisfied_clients_count: values?.achievements?.satisfied_clients_count,
                                    }
                                }),
                                content_type: 'json',
                            };
                        }
                        else {
                            formData = {
                                title: 'Home',
                                content: JSON.stringify({
                                    hero_section: {
                                        heading: values?.hero_section?.heading,
                                        description: values?.hero_section?.description,
                                        hero_section_image: values.hero_section_image,
                                        hero_section_image_home2: values.hero_section_image_home2,
                                        hero_section_image_home3: values.hero_section_image_home3,
                                    },
                                    explore_places: {
                                        heading: values?.explore_places?.heading,
                                        description: values?.explore_places?.description,
                                        explore_place_one: {
                                            heading: values?.explore_places?.explore_place_one?.heading,
                                            description: values?.explore_places?.explore_place_one?.description,
                                            image: values?.explore_places?.explore_place_one?.image,
                                        },
                                        explore_place_two: {
                                            heading: values?.explore_places?.explore_place_two?.heading,
                                            description: values?.explore_places?.explore_place_two?.description,
                                            image: values?.explore_places?.explore_place_two?.image,
                                        },
                                        explore_place_three: {
                                            heading: values?.explore_places?.explore_place_three?.heading,
                                            description: values?.explore_places?.explore_place_three?.description,
                                            image: values?.explore_places?.explore_place_three?.image,
                                        },
                                    },
                                    achievements: {
                                        renovation: values?.achievements?.renovation,
                                        renovation_count: values?.achievements?.renovation_count,
                                        agents: values?.achievements?.agents,
                                        agents_count: values?.achievements?.agents_count,
                                        project: values?.achievements?.project,
                                        project_count: values?.achievements?.project_count,
                                        satisfied_clients: values?.achievements?.satisfied_clients,
                                        satisfied_clients_count: values?.achievements?.satisfied_clients_count,
                                    }
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
                    <h6 className="text-secondary py-2 header_4">{i18n.t('Home Page')}</h6>
                    <div className="border p-3 rounded">
                        <label className="text-secondary">{i18n.t('Hero Section')}</label>
                        <FormInput name={["hero_section", "heading"]} placeholder="Enter heading" />
                        <label className="text-secondary">{i18n.t('Description')}</label>
                        <FormInput name={["hero_section", "description"]} textArea />
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-1">
                                <MultipleImageInput name={"hero_section_image"} label={("Home-1 Image")} />
                            </div>
                            <div className="col-span-1">
                                <MultipleImageInput name={"hero_section_image_home2"} label={("Home-2 Image")} />
                            </div>
                            <div className="col-span-1">
                                <MultipleImageInput name={"hero_section_image_home3"} label={("Home-3 Image")} />
                            </div>
                        </div>
                    </div>
                    <div className="border p-3 rounded mt-8">
                        <h6 className="text-secondary">{i18n.t('Explore Places')}</h6>
                        <FormInput required name={["explore_places", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                        <label className="text-secondary">{i18n.t('Description')}</label>
                        <FormInput required name={["explore_places", "description"]} title={i18n.t("Description")} placeholder="Enter Description" textArea />
                        <div className="border p-3 rounded mt-1">
                            <h6 className="text-secondary">{i18n.t('Explore Place One')}</h6>
                            <FormInput name={["explore_places", "explore_place_one", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                            <label className="text-secondary">{i18n.t('Description')}</label>
                            <FormInput name={["explore_places", "explore_place_one", "description"]} title={i18n.t("Description")} placeholder="Enter Description" textArea />
                            <MultipleImageInput name={["explore_places", "explore_place_one", "image"]} label={("Image")} />
                        </div>
                        <div className="border p-3 rounded mt-1">
                            <h6 className="text-secondary">{i18n.t('Explore Place Two')}</h6>
                            <FormInput name={["explore_places", "explore_place_two", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                            <label className="text-secondary">{i18n.t('Description')}</label>
                            <FormInput name={["explore_places", "explore_place_two", "description"]} title={i18n.t("Description")} placeholder="Enter Description" textArea />
                            <MultipleImageInput name={["explore_places", "explore_place_two", "image"]} label={("Image")} />
                        </div>

                        <div className="border p-3 rounded mt-1">
                            <h6 className="text-secondary">{i18n.t('Explore Place Three')}</h6>
                            <FormInput name={["explore_places", "explore_place_three", "heading"]} title={i18n.t("Heading")} placeholder="Enter Heading" />
                            <label className="text-secondary">{i18n.t('Description')}</label>
                            <FormInput name={["explore_places", "explore_place_three", "description"]} title={i18n.t("Description")} placeholder="Enter Description" textArea />
                            <MultipleImageInput name={["explore_places", "explore_place_three", "image"]} label={("Image")} />
                        </div>
                    </div>
                    <h6 className="text-secondary mt-8">{i18n.t('Achievements')}</h6>
                    <div className="border p-3 rounded">
                        <h6 className="text-secondary">{i18n.t('Renovation')}</h6>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <FormInput name={["achievements", "renovation"]} title={i18n.t("Title")} placeholder="Renovation Property" />
                            <FormInput name={["achievements", "renovation_count"]} title={i18n.t("Count")}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Renovation can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Renovation should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                                placeholder="22" />
                        </div>

                        <h6 className="text-secondary mt-4">{i18n.t('Agents')}</h6>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <FormInput name={["achievements", "agents"]} title={i18n.t("Title")} placeholder="Team Agents" />
                            <FormInput name={["achievements", "agents_count"]} title={i18n.t("Count")}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Agents can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Agents should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                                placeholder="100" />
                        </div>

                        <h6 className="text-secondary mt-4">{i18n.t('Project')}</h6>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <FormInput name={["achievements", "project"]} title={i18n.t("Title")} placeholder="Project Completed" />
                            <FormInput name={["achievements", "project_count"]} title={i18n.t("Count")}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Project can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Project should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                                placeholder="20" />
                        </div>

                        <h6 className="text-secondary mt-4">{i18n.t('Satisfied Clients')}</h6>
                        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                            <FormInput name={["achievements", "satisfied_clients"]} title={i18n.t("Title")} placeholder="Satisfied Client" />
                            <FormInput name={["achievements", "satisfied_clients_count"]} title={i18n.t("Count")}
                                rules={[
                                    () => ({
                                        validator(_, value) {
                                            if (value && value < 0) {
                                                return Promise.reject(new Error(i18n.t("Satisfied Clients can't be negative")))
                                            }
                                            return Promise.resolve()
                                        }
                                    }),
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value)) {
                                                return Promise.reject(new Error(i18n.t("Satisfied Clients should be number")))
                                            }
                                            return Promise.resolve()
                                        }
                                    })
                                ]}
                                placeholder="100" />
                        </div>
                    </div>
                    <Button className="mt-2.5">{i18n.t("Submit")}</Button>
                </Form>

            </Card>
        </div>
    );
};

export default HomePageSetting;