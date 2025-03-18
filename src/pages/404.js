import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('404.title')}</title>
      </Head>
      <div className="container mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">{t('404.title')}</h1>
        <p className="text-xl mb-8">{t('404.description')}</p>
        <Link href="/" className="text-kardak hover:underline">
          {t('404.backToHome')}
        </Link>
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