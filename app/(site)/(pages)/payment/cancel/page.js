"use client"
import React from 'react'
import { useI18n } from '../../../../providers/i18n';
import SingelBtn from '../../../../../components/common/btn/singelBtn';
import Link from 'next/link';
import Banner from '../../../../../components/theme2/common/banner';

const CancelPage = () => {
  const i18n = useI18n();
  return (
    <>
    <Banner title={i18n?.t('Payment Cancelled')}></Banner>
    <div className='py-20 md:py-32'>
      <img className='mx-auto' src="/icons/Layer_1.png" alt="" />

      <h1 className='mt-12 header_4_bold text-center text-dark_text'>{i18n?.t('Payment Cancelled')}</h1>
      <div className='mt-12 flex items-center justify-center'>

      <SingelBtn className={""}>
        <Link href='/'>{i18n?.t('Back To Homepage')}</Link>
      </SingelBtn>
      </div>
    </div>
    </>
  )
}

export default CancelPage