"use client"
import React, { useEffect, useState } from 'react'
import FrontTable from '../../common/fronTable'
import { useFetch } from '../../../app/helpers/hooks'
import { agentContactDelete, agentContactDetail, agentContactList } from '../../../app/helpers/backend'
import { Modal } from 'antd'
import { useI18n } from '../../../app/providers/i18n'

const AgentContact = () => {
    const [show, setShow] = useState(false)
    const [contact, getContact, { loading }] = useFetch(agentContactList)
    const [contactDetail, getContactDetail] = useFetch(agentContactDetail)
    const i18n = useI18n()

    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('Name'),
            formatter: (name) => <>{name}</>,
        },
        {
            dataField: 'subject',
            text: i18n?.t('Subject'),
            formatter: (subject) => <>{subject}</>,
        }
    ]

    return (
        <div>
            <FrontTable columns={columns} data={contact?.docs} noActions={false} onView={
                (data) => {
                    setShow(true)
                    return getContactDetail({ _id: data?._id })
                }
            } indexed={true} onDelete={agentContactDelete} onReload={getContact} loading={loading}

            ></FrontTable>
            <Modal open={show} onCancel={() => {
                setShow(false)
                getContact()
            }} footer={null}>
                <div>
                    <h3>{contactDetail?.name}</h3>
                    <h3 className='text-base'>{contactDetail?.email}</h3>
                    <h3 className='font-bold my-3'>{i18n?.t('Subject')}: {contactDetail?.subject}</h3>
                    <p className='text-base '>{contactDetail?.message}</p>
                </div>
            </Modal>
        </div>
    )
}

export default AgentContact