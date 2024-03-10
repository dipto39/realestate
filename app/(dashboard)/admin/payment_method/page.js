"use client";
import React from 'react';
import { useFetch } from '../../../helpers/hooks';
import { delPaymentMethod, fetchPaymentMethods } from '../../../helpers/backend';
import { useRouter } from 'next/navigation';
import { useI18n } from '../../../providers/i18n';
import PageTitle from '../../../../components/common/title';
import Table from '../../../../components/common/table';
import Button from '../../../../components/common/button';

const PaymentMethods = () => {
    const [paymentMethod, getPaymentMethod, {loading}] = useFetch(fetchPaymentMethods)
    const {push} = useRouter()
    const i18n = useI18n()

    const columns = [
        {text: 'Name', dataField: 'name'},
        {text: 'Type', dataField: 'type', formatter: (_, d) => <span className="capitalize">{d?.type}</span>}
    ]
    return (
        <div>
            <Table
                columns={columns}
                data={paymentMethod}
                action={(
                    <Button href="/admin/payment_method/add">{i18n.t("Add Payment Method")}</Button>
                )}
                onEdit={({_id}) => push('/admin/payment_method/edit/' + _id)}
                onDelete={delPaymentMethod}
                onReload={getPaymentMethod}
                loading={loading}
                pagination
                indexed
                title={i18n.t("Payment Method List")}
            />
            
        </div>
    );
};

export default PaymentMethods;