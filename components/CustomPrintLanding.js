import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { LiaWhatsapp } from 'react-icons/lia';

import { categories, customPrintLanding } from '../data/categories.mjs';
import { getCategoryUrl, getProductUrl } from '../lib/productHelpers';
import { getPageUrl } from '../lib/routes';
import {
  buildBreadcrumbSchema,
  buildJsonLdGraph,
  getPageAbsoluteUrl,
} from '../lib/seo';
import SeoHead from './SeoHead';

const SIZE_KEYS = ['4oz', '7oz', '8oz'];

const SIZE_IMAGES = {
  '4oz': '/assets/images/cups/ozel-baskili-4oz-karton-bardak.webp',
  '7oz': '/assets/images/cups/ozel-baskili-7oz-karton-bardak.webp',
  '8oz': '/assets/images/cups/ozel-baskili-8oz-karton-bardak.webp',
};

function buildFaqSchema(faqItems) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default function CustomPrintLanding({ portfolioProducts }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const pathname = '/custom-printed-paper-cups';
  const pageUrl = getPageAbsoluteUrl(pathname, {}, locale);

  const faqItems = t('custom_print.faq_items', { returnObjects: true });
  const processSteps = t('custom_print.process_steps', { returnObjects: true });
  const industries = t('custom_print.industries', { returnObjects: true });

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodeURIComponent(
    `${t('custom_print.whatsapp_prefill')}\n${pageUrl}`
  )}`;

  const jsonLd = buildJsonLdGraph(
    buildBreadcrumbSchema([
      { name: t('navbar.home'), url: getPageAbsoluteUrl('/', {}, locale) },
      { name: t('custom_print.title'), url: pageUrl },
    ]),
    {
      '@type': 'Service',
      name: t('custom_print.title'),
      description: t('custom_print.seo.description'),
      url: pageUrl,
      provider: {
        '@type': 'Organization',
        name: 'Kardak',
        url: getPageAbsoluteUrl('/', {}, locale),
      },
      areaServed: 'TR',
    },
    buildFaqSchema(faqItems)
  );

  return (
    <>
      <SeoHead
        pathname={pathname}
        locale={locale}
        title={t('custom_print.seo.title')}
        description={t('custom_print.seo.description')}
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <section className="relative mb-16 overflow-hidden rounded-3xl bg-kardak-dark shadow-2xl">
          {/* Background — dark left for text, decorative right only */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-kardak-dark via-kardak to-[#2a5298]" />
            <div className="absolute inset-0 bg-gradient-to-r from-kardak-dark/90 via-kardak/70 to-transparent md:from-kardak-dark/80 md:via-kardak/50" />
            <div
              className="absolute inset-y-0 right-0 w-2/3 md:w-1/2 opacity-25"
              style={{
                background: `
                  radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px) 0 0,
                  radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px) 6px 6px
                `,
                backgroundSize: '12px 12px',
              }}
            />
            <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-[#3d6cb5]/30 blur-3xl" />
            <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-[#2a5298]/40 blur-3xl" />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 lg:gap-12 items-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
            <div className="relative text-center md:text-left">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-kardak-dark/60 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm mb-5">
                {t('custom_print.hero_badge')}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-4 drop-shadow-sm">
                {t('custom_print.hero_title')}
              </h1>
              <p className="text-sm md:text-base font-medium text-white/75 mb-3 tracking-wide uppercase">
                {t('custom_print.hero_highlight')}
              </p>
              <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl mx-auto md:mx-0">
                {t('custom_print.hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-xl bg-green-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-green-900/20 hover:bg-green-600 transition-colors"
                >
                  <LiaWhatsapp className="h-6 w-6 mr-2" />
                  {t('custom_print.cta_quote')}
                </Link>
                <Link
                  href="#sizes"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 bg-kardak-dark/50 px-8 py-3.5 font-bold text-white hover:bg-kardak-dark/70 transition-colors"
                >
                  <HiOutlineCursorClick className="h-5 w-5 mr-2" />
                  {t('custom_print.cta_sizes')}
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <div className="relative isolate min-w-[260px] sm:min-w-[280px] md:min-w-[320px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-4 rounded-full bg-[#3d6cb5]/25 blur-2xl"
                />
                <div className="relative z-10 rounded-2xl bg-white/5 p-3 ring-1 ring-white/15 shadow-2xl">
                  <Image
                    src={customPrintLanding.imageSrc}
                    alt={t('custom_print.hero_title')}
                    width={543}
                    height={724}
                    priority
                    className="w-full max-w-[260px] sm:max-w-xs md:max-w-sm rounded-xl object-contain drop-shadow-2xl"
                  />
                </div>
                {SIZE_KEYS.map((sizeKey, index) => (
                  <span
                    key={sizeKey}
                    aria-hidden="true"
                    className={`absolute z-20 hidden sm:inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-kardak shadow-lg ${
                      index === 0
                        ? '-left-6 top-6 rotate-[-8deg]'
                        : index === 1
                          ? '-right-4 top-1/2 -translate-y-1/2 rotate-[6deg]'
                          : '-left-4 bottom-4 rotate-[4deg]'
                    }`}
                  >
                    {t(`custom_print.size_${sizeKey}_title`)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Size cards */}
        <section id="sizes" className="mb-16 scroll-mt-[110px]">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-kardak mb-3">
              {t('custom_print.sizes_title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('custom_print.sizes_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {SIZE_KEYS.map((sizeKey) => (
              <article
                key={sizeKey}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative w-full aspect-[3/4] min-h-[320px] overflow-hidden bg-gradient-to-b from-gray-50 to-white">
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-kardak px-3 py-1 text-xs font-bold text-white shadow-md">
                    {t(`custom_print.size_${sizeKey}_volume`)}
                  </span>
                  <Image
                    src={SIZE_IMAGES[sizeKey]}
                    alt={t(`custom_print.size_${sizeKey}_title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 pt-4">
                  <h3 className="text-xl font-bold text-kardak mb-2">
                    {t(`custom_print.size_${sizeKey}_title`)}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-gray-800">{t('custom_print.ideal_for')}:</span>{' '}
                    {t(`custom_print.size_${sizeKey}_use`)}
                  </p>
                  <p className="text-sm text-gray-500 mb-6 flex-1">
                    {t(`custom_print.size_${sizeKey}_desc`)}
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      href={whatsappLink}
                      target="_blank"
                      className="text-center rounded-xl bg-green-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-green-600 transition-colors"
                    >
                      {t('custom_print.cta_quote')}
                    </Link>
                    <Link
                      href={getCategoryUrl(sizeKey, locale)}
                      className="text-center rounded-xl border border-kardak/20 bg-kardak/5 px-4 py-2.5 text-sm font-semibold text-kardak hover:bg-kardak/10 transition-colors"
                    >
                      {categories[sizeKey].title[locale]}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-kardak mb-8 text-center">
            {t('custom_print.process_title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-kardak text-white font-bold flex items-center justify-center mx-auto mb-3">
                  {index + 1}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        {portfolioProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-kardak mb-4 text-center">
              {t('custom_print.portfolio_title')}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('custom_print.portfolio_description')}
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 xl:gap-x-8">
              {portfolioProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <Link href={getProductUrl(product, locale)}>
                    <Image
                      alt={product.name[locale]}
                      src={product.imageSrc}
                      width={300}
                      height={300}
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 md:aspect-auto md:h-64 lg:h-72"
                    />
                  </Link>
                  <div className="mt-4">
                    <h3 className="text-sm text-gray-700">
                      <Link href={getProductUrl(product, locale)}>
                        <b>{product.name[locale]}</b>
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{product.size[locale]}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Industries */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-kardak mb-8 text-center">
            {t('custom_print.industries_title')}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-kardak mb-8 text-center">
            {t('custom_print.faq_title')}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-gray-200 p-4 group"
              >
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {item.question}
                  <span className="text-kardak ml-4 group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center bg-kardak/10 rounded-xl p-10">
          <h2 className="text-2xl font-bold text-kardak mb-4">{t('custom_print.cta_bottom_title')}</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">{t('custom_print.cta_bottom_description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={whatsappLink}
              target="_blank"
              className="inline-flex items-center justify-center rounded-md bg-green-500 px-8 py-3 font-bold text-white hover:bg-green-600"
            >
              <LiaWhatsapp className="h-6 w-6 mr-2" />
              {t('home.promo.whatsapp')}
            </Link>
            <Link
              href={getPageUrl('contact', locale)}
              className="inline-flex items-center justify-center rounded-md bg-kardak px-8 py-3 font-bold text-white hover:bg-kardak-hover"
            >
              {t('navbar.contact')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
