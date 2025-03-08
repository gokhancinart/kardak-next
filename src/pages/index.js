import ProductList from 'components/ProductList';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Promo from 'components/Promo';
import HomeAbout from 'components/HomeAbout';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>
      <Promo
        title={t('promo.title')}
        description={t('promo.description')}
        btn={t('promo.button')}
        btnLink="btnLink"
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