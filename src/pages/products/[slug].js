import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { products } from '../../../data/products';
import { IoIosArrowBack } from "react-icons/io";
import { LiaWhatsapp } from "react-icons/lia";

export default function ProductDetail() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { slug } = router.query;
  const currentLocale = i18n.language;

  const product = products.find(p =>
    p.slug[currentLocale] === slug // Dil bağımsız slug'a göre ürünü bul (Örn: papercup)
  );

  useEffect(() => {
    if (!product && router.isReady) { 
      router.replace(`/${currentLocale}/404`, undefined, { shallow: true });
    }
  }, [product, router, currentLocale]);

  if (!product) {
    return <div className="text-center py-8">Loading...</div>; // Veya null
  }

  const productPath = `/${currentLocale}/products/${product.slug[currentLocale]}`;
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${productPath}`;

  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=${encodeURIComponent(
    `${t('whatsapp_message')}:\n\n*${product.name[currentLocale]}*\n${productUrl}`
  )}`;

  return (
    <>
      <Head>
        <title>{product.name[currentLocale]}</title>
        <meta name="description" content={product.description[currentLocale]} />

        {/* Canonical URL (Dinamik ve Dil Desteğiyle) */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}`}
        />

        {/* Favicon (Absolute Path ile) */}
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`}
        />

        {/* Open Graph Etiketleri */}
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={product.name[currentLocale]} />
        <meta property="og:description" content={product.description[currentLocale]} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`}
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/products">
            <button
              className="bg-gray-200 text-kardak px-6 py-2 rounded transition-colors cursor-pointer"
            >
              <IoIosArrowBack className="inline-block mr-2" />
              {t('navbar.products')}
            </button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          {/* Sol kısım: Ürün fotoğrafı */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.imageSrc}
              alt={product.name[currentLocale]}
              width={400}
              height={400}
              className="rounded-lg shadow-md w-full"
            />
          </div>
          {/* Sağ kısım: Ürün başlığı, açıklaması ve geri butonu */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-kardak">
              {product.name[currentLocale]}
            </h1>
            <p className="text-md mb-6">
              {product.description[currentLocale]}
            </p>
            <div className="mt-12 ">
              {/* Teknik Detaylar */}
              <h3 className="text-xl font-bold mb-4 text-kardak">
                {t('products.technical_specs')}
              </h3>
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
            <Link
              href={whatsappLink}
              target="_blank"
              className="mt-12 relative inline-flex rounded-md border border-transparent bg-green-500 shadow-md px-8 py-3 text-center font-bold text-white hover:bg-green-600 hover:text-blue"
            >
              <LiaWhatsapp className="h-6 w-6 text-white mr-2" />
              {t('home.promo.whatsapp')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale, params }) {
  // Slug'a göre ürünü bul
  const product = products.find(p =>
    p.slug[locale] === params.slug
  );

  // Ürün yoksa 404 döndür
  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export async function getStaticPaths() {
  const paths = products.flatMap(product => [
    { params: { slug: product.slug.tr }, locale: 'tr' },
    { params: { slug: product.slug.en }, locale: 'en' }
  ]);

  return {
    paths,
    fallback: 'blocking', // blocking kullanımı önemli
  };
}
