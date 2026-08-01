import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';

import { products } from '../../../data/products.mjs';
import { getProductsListingUrl } from '../../../lib/routes';
import {
  buildJsonLdGraph,
  buildLegacyProductBreadcrumbs,
  buildProductSchema,
  getPageAbsoluteUrl,
} from '../../../lib/seo';
import SeoHead from 'components/SeoHead';
import { HiOutlineCursorClick } from "react-icons/hi";
import { LiaWhatsapp } from "react-icons/lia";

export default function ProductDetail({ product: initialProduct }) {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;
  const product = initialProduct;

  if (!product) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const productUrl = getPageAbsoluteUrl(
    '/products/[slug]',
    { slug: product.slug[currentLocale] },
    currentLocale
  );

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodeURIComponent(
    `${t('whatsapp_message')}:\n\n*${product.name[currentLocale]}*\n${productUrl}`
  )}`;

  const jsonLd = buildJsonLdGraph(
    buildProductSchema({
      name: product.name[currentLocale],
      description: product.description[currentLocale],
      imageSrc: product.imageSrc,
      pageUrl: productUrl,
      categoryName: product.size[currentLocale],
    }),
    buildLegacyProductBreadcrumbs({
      locale: currentLocale,
      homeLabel: t('navbar.home'),
      productsLabel: t('navbar.products'),
      productName: product.name[currentLocale],
      productUrl,
    })
  );

  return (
    <>
      <SeoHead
        pathname="/products/[slug]"
        query={{ slug: product.slug[currentLocale] }}
        locale={currentLocale}
        title={`${product.name[currentLocale]} | Kardak`}
        description={product.description[currentLocale]}
        ogImage={product.imageSrc}
        jsonLd={jsonLd}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.imageSrc}
              alt={product.name[currentLocale]}
              width={400}
              height={400}
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-kardak">
              {product.name[currentLocale]}
            </h1>
            <p className="text-md mb-6">
              {product.description[currentLocale]}
            </p>
            <div className="mt-12 ">
              <h2 className="text-xl font-bold mb-4 text-kardak">
                {t('products.technical_specs')}
              </h2>
              <table className="w-full border-collapse">
                <tbody>
                  {product.technicalDetails && Object.entries(product.technicalDetails).map(([key, value]) => (
                    <tr
                      key={key}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-gray-700">
                        {t(`products.technicalDetails.${key}`)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-10 flex flex-col md:flex-row w-full gap-4">
              <Link
                href={whatsappLink}
                target="_blank"
                className="relative inline-flex items-center justify-center rounded-md border border-transparent bg-green-500 shadow-md px-8 py-3 text-center font-bold text-white hover:bg-green-600 hover:text-blue"
              >
                <LiaWhatsapp className="h-6 w-6 text-white mr-2" />
                {t('home.promo.whatsapp')}
              </Link>

              <Link
                href={getProductsListingUrl(currentLocale)}
                className="relative inline-flex items-center justify-center rounded-md border border-transparent bg-kardak shadow-md px-8 py-3 text-center font-bold text-white hover:bg-kardak-hover"
              >
                <HiOutlineCursorClick className="h-5 w-5 text-white mr-2" />
                {t('products.all_products')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale, params }) {
  const product = products.find(p => p.slug[locale] === params.slug);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export async function getStaticPaths() {
  const paths = products
    .filter((product) => !product.variantSlug)
    .flatMap((product) => [
      { params: { slug: product.slug.tr }, locale: 'tr' },
      { params: { slug: product.slug.en }, locale: 'en' },
    ]);

  return {
    paths,
    fallback: false,
  };
}
