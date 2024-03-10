'use client';
import React from 'react';
import dayjs from 'dayjs';
import { useFetch } from '../../../helpers/hooks';
import { delNewsLetter, fetchNewsletter } from '../../../helpers/backend';
import PageTitle from '../../../../components/common/title';
import Table from '../../../../components/common/table';


const Newsletter = () => {
    const [data, getData, { loading }] = useFetch(fetchNewsletter);

    const columns = [
        { text: "Created At", dataField: "createdAt", formatter: (d) => dayjs(d).format('DD MMM YYYY') },
        { text: "Email", dataField: "email" },
    ]

    return (
        <div>
            <PageTitle title={'Newsletter List'} />
            <Table
                columns={columns}
                data={data}
                loading={loading}
                onReload={getData}
                indexed
                pagination
                onDelete={delNewsLetter}
            />
        </div>
    );
};

export default Newsletter;