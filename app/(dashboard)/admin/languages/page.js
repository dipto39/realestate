"use client";
import React from 'react';
import { Switch } from 'antd';
import { useI18n } from '../../../providers/i18n';
import { useRouter } from 'next/navigation';
import { useActionConfirm, useFetch } from '../../../helpers/hooks';
import { delLanguage, fetchLanguages, postLanguage } from '../../../helpers/backend';
import PageTitle from '../../../../components/common/title';
import Table from '../../../../components/common/table';
import Button from '../../../../components/common/button';


const Languages = () => {
    const i18n = useI18n()
    const { push } = useRouter()
    const [languages, getLanguages, { loading }] = useFetch(fetchLanguages)

    let columns = [
        { text: 'Name', dataField: 'name' },
        { text: 'Flag', dataField: 'flag' },
        { text: 'Code', dataField: 'code' },
        {
            text: 'Default', dataField: 'default', formatter: (_, d) => <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                checked={d?.default}
                onChange={async (e) => {
                    await useActionConfirm(postLanguage, { _id: d._id, default: e }, getLanguages, 'Are you sure you want to change default language?', 'Yes, Change');
                }}
                className='bg-gray-500'
            />
        },
        {
            text: 'RTL', dataField: 'rtl', formatter: (_, d) => <span>
                {d?.rtl ? 'Yes' : 'No'}
            </span>
        }
    ]
    return (
        <div>
            <Table
                columns={columns}
                data={{
                    ...languages,
                    docs: languages?.docs?.map(doc => ({
                        ...doc,
                        disableDelete: doc.code === 'en' ? 1 : 0,
                    })),
                }}
                onReload={getLanguages}
                loading={loading}
                pagination
                indexed
                action={(
                    <Button onClick={() => push('/admin/languages/add')}>{i18n.t("Add Language")}</Button>
                )}
                onEdit={({ _id }) => push('/admin/languages/edit/' + _id)}
                onDelete={delLanguage}
                onView={({ _id }) => push('/admin/languages/translations/' + _id)}
                title={i18n.t("Languages List")}
            />

        </div>
    );
};

export default Languages;