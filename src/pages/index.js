import ProductList from 'components/ProductList';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Promo from 'components/Promo';
import HomeAbout from 'components/HomeAbout';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        {/* Mevcut etiketler */}
        <title>{t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.locale}`} />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}favicon.ico`} />

        {/* WhatsApp için Open Graph etiketleri */}
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('home.seo.title')} />
        <meta property="og:description" content={t('home.seo.description')} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}assets/images/logo.png`}/>
      </Head>
      
      <Promo
        title={t('home.promo.title')}
        description={t('home.promo.description')}
        btn={t('home.promo.button')}
        btnLink="home.promo.btnLink"
      />
      <div className="flex-grow container mx-auto p-4">
        <HomeAbout />
        <ProductList />
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