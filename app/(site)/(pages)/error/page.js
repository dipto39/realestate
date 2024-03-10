"use client"
import Error from '../../../../components/theme2/common/404'
import React from 'react'
import Banner from '../../../../components/theme2/common/banner'
import { useI18n } from '../../../providers/i18n';
function page() {
  const i18n = useI18n();
  return (
    <>
      <Banner title={i18n?.t('404 Error')} />
      <Error />
    </>

  )
}

export default page