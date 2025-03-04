import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function About() {
  const { t } = useTranslation('common');
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-4">{t('navbar.about')}</h1>
      <p className="text-lg">About us content...</p>
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