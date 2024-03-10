
"use client";
import React from 'react';
import { useFetch } from '../../../helpers/hooks';
import { useI18n } from '../../../providers/i18n';
import PageTitle from '../../../../components/common/title';
import { fetchAdminSubscriptionHistoryList } from '../../../helpers/backend';
import Table from '../../../../components/common/table';

const SubscriptionList = () => {
    const [data, getData, { loading }] = useFetch(fetchAdminSubscriptionHistoryList);
    const i18n = useI18n()

    const columns = [
        { text: 'UID', dataField: 'uid' },
        { text: "User", dataField: "user", formatter: (_, d) => <><p>{d?.user?.name}</p> <p>{d?.user?.email}</p> <p>{d?.user?.phone}</p></> },
        { text: "Price", dataField: "price", formatter: (_, d) => <span>{d?.price}</span> },
        { text: "Total Credits", dataField: "credits", formatter: (_, d) => <span>{d?.credits}</span> },
        { text: "Type", dataField: "type", formatter: (_, d) => <span className="capitalize">{d?.type}</span> },
        { text: "Plan", dataField: "subscription", formatter: (_, d) => <span className="capitalize">{d?.subscription?.name}</span> },
        { text: "Payment Method", dataField: "payment", formatter: (_, d) => <span className='capitalize'>{d?.payment?.method}</span> },
        { text: "Transaction ID", dataField: "payment", formatter: (_, d) => <span>{d?.payment?.transaction_id}</span> },
        { text: "Payment Status", dataField: "payment", formatter: (_, d) => <span>{d?.payment?.status}</span> },
        { text: "Amount", dataField: "payment", formatter: (_, d) => <span>{d?.payment?.amount}</span> },
        { text: "Active", dataField: "active", formatter: (_, d) => <span>{d?.active ? <span className='text-green-500'>Active</span> : <span className='text-red-500'>Inactive</span>}</span> },
    ];
    return (
        <div>
            <PageTitle title="Subscription List" />
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                indexed
                pagination
                noActions
                title={i18n.t("Subscription List")}
            />
        </div>
    );
};

export default SubscriptionList;