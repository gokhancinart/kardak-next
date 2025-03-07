import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { products } from '../../../data/products';
import Image from 'next/image';

export default function ProductsPage() {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">{t('navbar.products')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.slug[currentLocale]}`}
            className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <Image src={product.imageSrc} alt={product.name[currentLocale]} width={300} height={300} />
            <h2 className="text-2xl font-semibold">{product.name[currentLocale]}</h2>
            <p className="mt-2 text-gray-600">{product.description[currentLocale]}</p>
          </Link>
        ))}
      </div>
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