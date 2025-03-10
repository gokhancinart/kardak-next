import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { products } from '../../../data/products';
import Image from 'next/image';
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';

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
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
        {/* Sol kısım: Ürün fotoğrafı */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image 
            src={product.imageSrc} 
            alt={product.name[currentLocale]} 
            width={400} 
            height={400} 
            className="rounded-lg shadow-md w-full"
          />
        </div>
        {/* Sağ kısım: Ürün başlığı, açıklaması ve geri butonu */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4 text-kardak">
            {product.name[currentLocale]}
          </h1>
          <p className="text-lg mb-6">
            {product.description[currentLocale]}
          </p>
          <Link href="/products">
            <button
              className="bg-kardak bg-kardak-hover text-white px-6 py-2 rounded transition-colors cursor-pointer"
            >
              <IoIosArrowBack className="inline-block mr-2" />
              {t('navbar.products')}
            </button>
          </Link>
        </div>
      </div>
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
