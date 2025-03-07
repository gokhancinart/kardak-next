import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { products } from '../../../data/products';
import Image from 'next/image';

export default function ProductDetail() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { slug } = router.query;
  const currentLocale = i18n.language;

  const product = products.find(p => 
    p.slug[currentLocale] === slug
  );

  if (!product) {
    return <div className="text-center py-8">{t('product_not_found')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Image src={product.imageSrc} alt={product.name[currentLocale]} width={300} height={300} />
      <h1 className="text-4xl font-bold mb-6">{product.name[currentLocale]}</h1>
      <p className="text-lg mb-4">{product.description[currentLocale]}</p>
      <button
        onClick={() => router.back()}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        {t('back')}
      </button>
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


export async function getStaticPaths() {
  const paths = products.flatMap(product => [
    { params: { slug: product.slug.tr }, locale: 'tr' },
    { params: { slug: product.slug.en }, locale: 'en' }
  ]);

  return {
    paths,
    fallback: 'blocking',
  };
}