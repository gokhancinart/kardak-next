import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/posts';

export default function BlogPage({ posts }) {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('blog.seo.title')}</title>
        <meta name="description" content={t('blog.seo.description')} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}/blog`} />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('blog.seo.title')} />
        <meta property="og:description" content={t('blog.seo.description')} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`} />
      </Head>

      <div className="container py-10">
        <h1 className="text-kardak text-3xl font-bold mb-6 text-center">{t('blog.title')}</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {posts.map((post) => (
            <div key={post.id}>
              <Image
                src={post.image}
                alt={post.title[currentLocale]}
                width={600}
                height={400}
                className="w-full h-auto mb-4 rounded-lg"/>
              <h2 className="text-kardak text-xl font-semibold mb-2">{post.title[currentLocale]}</h2>
              <p className="text-gray-600 text-sm mb-2">{post.date}</p>
              <p className="text-gray-800">{post.excerpt[currentLocale]}</p>
              <Link
                href={`/blog/${post.slug[currentLocale]}`}
                className="text-kardak font-medium mt-4 inline-block hover:underline"
              >
                {t('blog.read_more')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const allPosts = await import('data/posts.json').then(mod => mod.default);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts: allPosts,
    },
  };
}
