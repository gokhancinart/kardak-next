import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { products } from '../../../data/products';
import ProductList from 'components/ProductList';

export default function ProductsPage() {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold mb-8">{t('navbar.products')}</h1>
      <ProductList title={t('products.title_papercup')} products={products} locale={currentLocale} />
    </div>
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