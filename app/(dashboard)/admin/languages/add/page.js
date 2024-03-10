"use client";
import React from 'react';
import { Card, Form } from 'antd';
import PageTitle from '../../../../../components/common/title';
import { useI18n } from '../../../../providers/i18n';
import { useRouter } from 'next/navigation';
import FormInput, { HiddenInput } from '../../../../../components/form/input';
import { postLanguage } from '../../../../helpers/backend';
import { useAction } from '../../../../helpers/hooks';
import FormSelect from '../../../../../components/form/select';
import Button from '../../../../../components/common/button';


const AddLanguage = () => {
    const [form] = Form.useForm();

    return (
        <>
            <PageTitle title="Add Languages" />
            <LanguageForm title="Add Languages" form={form} />
        </>
    );
};

export default AddLanguage;

export const LanguageForm = ({ title, form }) => {
    const { push } = useRouter()
    const i18n = useI18n()

    return (
        <>
            <Card>
                <h6 className="mb-4 text-xl">{i18n.t("Language Information")}</h6>
                <div className="body">
                    <Form form={form} layout="vertical" onFinish={(values) => {
                        return useAction(
                            values?._id ? postLanguage : postLanguage,
                            values, () => {
                                push('/admin/languages')
                            })
                    }}>
                        {
                            title !== "Add Languages" && <HiddenInput name="_id" />
                        }
                        <div className="md:w-1/2">
                            <FormInput name="name" label={i18n.t("Name")} required />
                        </div>
                        <div className="md:w-1/2">
                            <FormInput name="code" label={i18n.t("Code")} required />
                        </div>
                        <div className="md:w-1/2">
                            <FormInput name="flag" label={i18n.t("Flag")} required />
                        </div>
                        <div className="md:w-1/2 multi">
                            <FormSelect name="rtl" label={i18n.t("Rtl Support")}
                                options={[
                                    { label: "Yes", value: true },
                                    { label: "No", value: false }
                                ]}

                            />
                        </div>

                        <Button>
                            {title === "Add Languages" ? "Submit" : "Update"}
                        </Button>
                    </Form>
                </div>
            </Card>
        </>
    );
}