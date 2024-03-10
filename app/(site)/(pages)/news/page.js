"use client";
import React from 'react';
import News from '../../../../components/theme2/news/news';
import Banner from '../../../../components/theme2/common/banner';
import { useI18n } from '../../../providers/i18n';
function news() {
    const i18n = useI18n();
    return (
        <>
            <Banner title={i18n?.t("Latest News")} />
            <News />
        </>
    );
}

export default news;
