"use client"
import React from 'react'
import { useI18n } from '../../../../providers/i18n'
import SingelBtn from '../../../../../components/common/btn/singelBtn'
import Link from 'next/link'
import Banner from '../../../../../components/theme2/common/banner'

const SuccessPage = () => {
  const i18n = useI18n()
  return (
    <>
    <Banner title={i18n?.t('Payment Success')}></Banner>
    <div className='py-20 md:py-32'>
      <img className='mx-auto' src="/icons/Layer_2.png" alt="" />
      <h1 className='header_4_bold mt-12 text-center text-dark_text'>{i18n?.t('Payment Success')}</h1>
      <div className='mt-12 flex items-center justify-center'>

        <SingelBtn className={""}>
          <Link href='/'>{i18n?.t('Back To Homepage')}</Link>
        </SingelBtn>
      </div>
    </div >
    </>
  )
}

export default SuccessPage