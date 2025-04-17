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

      <nav className="product-menu">
        <ul className="flex gap-4 mb-4 justify-center">
          <li className="bg-gray-200 hover:bg-gray-300 rounded-lg py-2 px-4">
            <a href={`#${t('navbar.paper-cups-slug')}`}>
              {t('products.title_papercup')}
            </a>
          </li>
          <li className="bg-gray-200 hover:bg-gray-300 rounded-lg py-2 px-4">
            <a href={`#${t('navbar.custom-paper-cups-slug')}`}>
              {t('products.title_custom_papercup')}
            </a>
          </li>
        </ul>
      </nav>
        <div id={t('navbar.paper-cups-slug')} className="relative scroll-mt-[110px]">
          <ProductList 
            title={t('products.title_papercup')} 
            products={products.filter(product => product.type === "base")} 
            locale={currentLocale} 
          />
        </div>
        <div id={t('navbar.custom-paper-cups-slug')} className="relative scroll-mt-[110px]">
          <ProductList 
            title={t('products.title_custom_papercup')} 
            products={products.filter(product => product.type === "special")} 
            locale={currentLocale} 
          />
        </div>
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