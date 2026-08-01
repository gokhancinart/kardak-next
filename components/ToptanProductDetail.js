import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineCursorClick } from 'react-icons/hi';
import { LiaWhatsapp } from 'react-icons/lia';

import { categories } from '../data/categories.mjs';
import { getCategoryUrl } from '../lib/productHelpers';
import { getPageUrl } from '../lib/routes';
import {
  buildJsonLdGraph,
  buildProductBreadcrumbs,
  buildProductSchema,
  getPageAbsoluteUrl,
  getToptanVariantPathname,
} from '../lib/seo';
import SeoHead from './SeoHead';

export default function ToptanProductDetail({ categoryKey, product }) {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language;
  const category = categories[categoryKey];

  const title = product.name[locale];
  const description = product.description[locale];
  const categoryPath = getCategoryUrl(categoryKey, locale);
  const pathname = getToptanVariantPathname(categoryKey);
  const query = { variant: product.variantSlug[locale] };
  const pageUrl = getPageAbsoluteUrl(pathname, query, locale);

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodeURIComponent(
    `${t('whatsapp_message')}:\n\n*${title}*\n${pageUrl}`
  )}`;

  const jsonLd = buildJsonLdGraph(
    buildProductSchema({
      name: product.name[locale],
      description: product.description[locale],
      imageSrc: product.imageSrc,
      pageUrl,
      categoryName: category.title[locale],
    }),
    buildProductBreadcrumbs({
      locale,
      homeLabel: t('navbar.home'),
      productsLabel: t('navbar.products'),
      categoryTitle: category.title[locale],
      categoryPath,
      productName: product.name[locale],
      productUrl: pageUrl,
    })
  );

  return (
    <>
      <SeoHead
        pathname={pathname}
        query={query}
        locale={locale}
        title={`${title} | Kardak`}
        description={description}
        ogImage={product.imageSrc}
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href={getPageUrl('home', locale)} className="hover:text-kardak">
            {t('navbar.home')}
          </Link>
          <span className="mx-2">/</span>
          <Link href={categoryPath} className="hover:text-kardak">
            {category.title[locale]}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-kardak">{product.name[locale]}</span>
        </nav>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.imageSrc}
              alt={product.name[locale]}
              width={400}
              height={400}
              className="rounded-lg shadow-md w-full"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-kardak">{title}</h1>
            <p className="text-md mb-6">{description}</p>

            {product.technicalDetails && (
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4 text-kardak">
                  {t('products.technical_specs')}
                </h2>
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(product.technicalDetails).map(([key, value]) => (
                      <tr
                        key={key}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-semibold text-gray-700">
                          {t(`products.technicalDetails.${key}`)}
                        </td>
                        <td className="py-3 px-4 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-10 flex flex-col md:flex-row w-full gap-4">
              <Link
                href={whatsappLink}
                target="_blank"
                className="relative inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 shadow-md px-8 py-3 text-center font-bold text-white hover:bg-green-600"
              >
                <LiaWhatsapp className="h-6 w-6 text-white mr-2" />
                {t('home.promo.whatsapp')}
              </Link>

              <Link
                href={categoryPath}
                className="relative inline-flex items-center justify-center rounded-md border border-transparent bg-kardak shadow-md px-8 py-3 text-center font-bold text-white hover:bg-kardak-hover"
              >
                <HiOutlineCursorClick className="h-5 w-5 text-white mr-2" />
                {category.title[locale]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
