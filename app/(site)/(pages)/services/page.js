"use client"
import React from 'react'
import Banner from '../../../../components/theme2/common/banner'
import Service from '../../../../components/theme2/home/service'
import { useI18n } from '../../../providers/i18n';

const Services = () => {
  const i18n = useI18n();
  return (
    <>
        <Banner title={i18n?.t('Services')} />
        <Service></Service>
    </>
  )
}

export default Services