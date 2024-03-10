"use client"
import Link from 'next/link'
import React from 'react'
import { useI18n } from '../../../app/providers/i18n'

const Error = () => {
  const i18n = useI18n();
  return (
    <section className="bg-[url('/fd.png')] bg-[length:100%_100%] bg-no-repeat h-full  ">
    <div className="bg-black flex justify-center items-center py-20 bg-opacity-70">
      <div className="text-center px-20 p-32 bg-white bg-opacity-70">
        <h1 className="text-red-500 header_1 !text-center">404</h1>
        <p className="header_3 py-6">{i18n?.t('Oops... Page Not Found!')}</p>
        <p className="text-secondary_text paragraph_1 mb-5">{i18n?.t('The page you are looking for does not exist. It might have been moved or deleted.')}</p>
        <br />
        <Link href="/" className="text-white py-6 px-10 mt-10 bg-primary paragraph_1 ">{i18n?.t('Back To Homepage')}</Link>
      </div>
    </div>
  </section>
  )
}

export default Error