import ProductList from 'components/ProductList';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Promo from 'components/Promo';
import HomeAbout from 'components/HomeAbout';
import Head from 'next/head';

import { products } from 'data/products';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />

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
        <meta property="og:title" content={t('home.seo.title')} />
        <meta property="og:description" content={t('home.seo.description')} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`}
        />
      </Head>


      <Promo
        title={t('home.promo.title')}
        description={t('home.promo.description')}
        button={t('home.promo.button')}
        buttonLink="/products"
        whatsapp={t('home.promo.whatsapp')}
        whatsappUrl={`https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
      />
      <div className="flex-grow container mx-auto p-4">
        <HomeAbout />
        <ProductList 
          title={t('products.title_papercup')} 
          products={products} 
          locale={router.locale} 
        />
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}