'use client';
import React, { useEffect, useState } from 'react';
import { useFetch } from '../../../../../helpers/hooks';
import { fetchUserDetails } from '../../../../../helpers/backend';
import { useI18n } from '../../../../../providers/i18n';
import { DetailTable } from '../../../../../../components/common/table';

const UserDetails = ({ params }) => {
    const [data, getData] = useFetch(fetchUserDetails, {}, false)
    const [document, setDocument] = useState(0)
    const i18n = useI18n()
    useEffect(() => {
        getData({ _id: params._id })
    }, [data?._id])

    return (
        <div>
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <DetailTable
                            title="User Details"
                            const columns={[
                                { text: "Name", dataIndex: "name" },
                                { text: "Email", dataIndex: "email" },
                                { text: "Phone", dataIndex: "phone" },
                                { text: "Role", dataIndex: "role", formatter: (d) => <span className="capitalize">{d}</span> },
                                { text: "Address", dataIndex: "address" },
                                { text: "About", dataIndex: "about" },

                            ]}

                            data={data} />

                    </div>
                    <div>
                        <div className="border rounded-md p-4 bg-white shadow-md">
                            <h6 className="title">{i18n.t("Image")}</h6>
                            <div className="body mt-2">
                                <div className="text-center mb-3" style={{ height: 200 }}>
                                    <img src={data?.image} style={{ height: '100%' }} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;