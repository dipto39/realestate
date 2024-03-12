"use client"
import React from 'react';
import PageTitle from '../../../../components/common/title';
import { Tabs } from 'antd';
import { useI18n } from '../../../providers/i18n';
import SendGridManageEmail from '../../../../components/email-setting/sendGrid';
import GmailEmailProvider from '../../../../components/email-setting/gmail';
import OtherProviderManageEmail from '../../../../components/email-setting/otherService';

const EmailSettings = () => {
    const i18n = useI18n()

    return (
        <>
            <PageTitle title={!!i18n && i18n?.t("Email Settings")} />
            <div className={'bg-white p-4 rounded'}>

                <Tabs defaultActiveKey="1" centered type="card">
                    SendGrid
                    <Tabs.TabPane tab={!!i18n && i18n?.t("SendGrid SMTP")} key="1">
                        <SendGridManageEmail />
                    </Tabs.TabPane>

                    Other's Provider
                    <Tabs.TabPane tab={!!i18n && i18n?.t("Gmail Provider")} key="2">
                        <GmailEmailProvider />
                    </Tabs.TabPane>

                    Other's Provider
                    <Tabs.TabPane tab={!!i18n && i18n?.t("Other's Provider")} key="3">
                        <OtherProviderManageEmail />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </>

    )
}

export default EmailSettings;