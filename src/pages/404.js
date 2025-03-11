// pages/404.tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Custom404() {
  const { t } = useTranslation('common');
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <Head>
        <title>{t('404.title')}</title>
      </Head>
      
      <h1 className="text-6xl font-bold text-kardak mb-4">404</h1>
      <p className="text-xl mb-8">{t('404.description')}</p>
      
      <Link 
        href="/" 
        locale={router.locale}
        className="bg-kardak text-white px-6 py-3 rounded hover:bg-kardak/90 transition-colors"
      >
        {t('404.back_to_home')}
      </Link>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}