import ProductList from 'components/ProductList';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Promo from 'components/Promo';
import HomeAbout from 'components/HomeAbout';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineCursorClick } from "react-icons/hi";

// products
import { products } from 'data/products';
// blog
import { getAllPosts } from '../lib/posts';

export default function Home({ blogPosts }) {
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
          title={t('products.title_papercups_7oz')} 
          products={products.filter(product => product.type === "7oz")} 
          locale={router.locale} 
        />

        <div className="flex justify-center mt-4 mb-16">
          <Link
            href="/products"
            className="relative inline-flex rounded-md border border-transparent bg-kardak shadow-md px-8 py-3 text-center font-bold text-white bg-kardak-hover"
          >
            <HiOutlineCursorClick className="h-5 w-5 text-white mr-2" />
            {t('products.all_products')}
          </Link>
        </div>
      </div>
      {/* Blog Bölümü */}
      <div className="container mb-10">
        <h2 className="text-kardak text-2xl font-bold mb-6">{t('blog.title')}</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {blogPosts.map(post => (
            <div key={post.slug.tr}>
              <Link href={`/blog/${post.slug[router.locale]}`}>
                <Image
                  src={post.image}
                  alt={post.title[router.locale]}
                  width={400}
                  height={250}
                  className="w-full h-auto rounded-lg mb-4"
                />
                <h3 className="text-kardak text-md font-semibold hover:underline">
                  {post.title[router.locale]}
                </h3>
                <p className="text-gray-600 text-sm">{post.date}</p>
                <p className="mt-2 text-gray-800">{post.excerpt[router.locale]}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 mb-16">
          <Link
            href="/blog"
            className="relative inline-flex rounded-md border border-transparent bg-kardak shadow-md px-8 py-3 text-center font-bold text-white bg-kardak-hover"
          >
            <HiOutlineCursorClick className="h-5 w-5 text-white mr-2" />
            {t('blog.all_blogs')}
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const blogPosts = getAllPosts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      blogPosts,
    },
  };
}