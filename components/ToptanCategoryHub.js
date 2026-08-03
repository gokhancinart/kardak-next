import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineCursorClick } from 'react-icons/hi';

import { categories, customPrintLanding } from '../data/categories.mjs';
import { getProductUrl, getCustomPrintLandingUrl } from '../lib/productHelpers';
import { getLocalizedText, getProductName, getProductSize } from '../lib/localizedContent';
import { getProductsListingUrl, getPageUrl } from '../lib/routes';
import {
  buildCategoryBreadcrumbs,
  buildJsonLdGraph,
  getPageAbsoluteUrl,
  getToptanCategoryPathname,
} from '../lib/seo';
import SeoHead from './SeoHead';

export default function ToptanCategoryHub({ categoryKey, categoryProducts }) {
  const { t } = useTranslation('common');
  const { locale } = useRouter();
  const category = categories[categoryKey];
  const pathname = getToptanCategoryPathname(categoryKey);
  const pageUrl = getPageAbsoluteUrl(pathname, {}, locale);

  const categoryTitle = getLocalizedText(category.title, locale);
  const categoryDescription = getLocalizedText(category.description, locale);

  const jsonLd = buildJsonLdGraph(
    buildCategoryBreadcrumbs({
      locale,
      homeLabel: t('navbar.home'),
      productsLabel: t('navbar.products'),
      categoryTitle,
      categoryUrl: pageUrl,
    })
  );

  return (
    <>
      <SeoHead
        pathname={pathname}
        locale={locale}
        title={`${categoryTitle} | Kardak`}
        description={categoryDescription}
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href={getPageUrl('home', locale)} className="hover:text-kardak">
            {t('navbar.home')}
          </Link>
          <span className="mx-2">/</span>
          <Link href={getProductsListingUrl(locale)} className="hover:text-kardak">
            {t('navbar.products')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-kardak">{categoryTitle}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-bold text-kardak mb-4">{categoryTitle}</h1>
        <p className="text-gray-600 mb-10 max-w-3xl">{categoryDescription}</p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categoryProducts.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={getProductUrl(product, locale)}>
                <Image
                  alt={getProductName(product, locale)}
                  src={product.imageSrc}
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </Link>
              <div className="mt-4">
                <h2 className="text-sm text-gray-700">
                  <Link href={getProductUrl(product, locale)}>
                    <b>{getProductName(product, locale)}</b>
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-gray-500">{getProductSize(product, locale)}</p>
              </div>
            </div>
          ))}

          {category.hasCustomPrint && (
            <div className="group relative">
              <Link href={getCustomPrintLandingUrl(locale)}>
                <Image
                  alt={getLocalizedText(customPrintLanding.title, locale)}
                  src={customPrintLanding.imageSrc}
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </Link>
              <div className="mt-4">
                <h2 className="text-sm text-gray-700">
                  <Link href={getCustomPrintLandingUrl(locale)}>
                    <b>{getLocalizedText(customPrintLanding.title, locale)}</b>
                  </Link>
                </h2>
                <p className="mt-1 text-xs text-gray-500">{t('products.custom_print_cta')}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={getProductsListingUrl(locale)}
            className="inline-flex items-center rounded-md bg-kardak shadow-md px-8 py-3 font-bold text-white hover:bg-kardak-hover"
          >
            <HiOutlineCursorClick className="h-5 w-5 text-white mr-2" />
            {t('products.all_products')}
          </Link>
        </div>
      </div>
    </>
  );
}
