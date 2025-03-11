import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { products } from '../../../data/products';
import ProductList from 'components/ProductList';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductsPage() {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('products.seo.title')}</title>
        <meta name="description" content={t('products.seo.description')} />

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
        <meta property="og:title" content={t('products.seo.title')} />
        <meta property="og:description" content={t('products.seo.description')} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`}
        />
      </Head>

      <div className="container">
        <h1 className="text-4xl font-bold mb-8 text-kardak">{t('navbar.products')}</h1>
        <ProductList title={t('products.title_papercup')} products={products} locale={currentLocale} />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: products,
    },
  };
}