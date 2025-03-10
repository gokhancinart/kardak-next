"use strict";
import React from 'react'
import { useTranslation } from 'next-i18next';
import { MdFingerprint } from "react-icons/md";
import { CiCoffeeCup, CiDeliveryTruck } from "react-icons/ci";
import { IoDocumentsOutline } from "react-icons/io5";

function HomeAbout() {
  const { t } = useTranslation('common')
  return (
    <div className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-kardak">Kardak</p>
          <div className="relative">
            <p className="mt-2 pb-6 text-pretty text-3xl font-semibold tracking-tight text-kardak sm:text-5xl lg:text-balance">
              {t('home.home_about.title')}
            </p>
            {/* <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#1c3c6d] to-transparent"></span> */}
            </div>
            <p className="mt-6 text-md leading-6 text-gray-600">
              {t('home.home_about.description')}
            </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-kardak">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-soft-blue">
                  <IoDocumentsOutline aria-hidden="true" className="h-6 w-6 text-kardak" />
                </div>
                {t('home.home_about.phase1.title')}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{t('home.home_about.phase1.description')}</dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-kardak">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-soft-blue">
                  <MdFingerprint aria-hidden="true" className="h-6 w-6 text-kardak" />
                </div>
                {t('home.home_about.phase2.title')}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{t('home.home_about.phase2.description')}</dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-kardak">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-soft-blue">
                  <CiCoffeeCup aria-hidden="true" className="h-6 w-6 text-kardak" />
                </div>
                {t('home.home_about.phase3.title')}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{t('home.home_about.phase3.description')}</dd>
            </div>
            
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-kardak">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-soft-blue">
                  <CiDeliveryTruck aria-hidden="true" className="h-6 w-6 text-kardak" />
                </div>
                {t('home.home_about.phase4.title')}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{t('home.home_about.phase4.description')}</dd>
            </div>
            
          </dl>
        </div>
      </div>
    </div>
  )
}

export default HomeAbout;