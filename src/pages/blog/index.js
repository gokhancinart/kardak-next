import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/posts';
import { getPostLocalized, getPostSlug } from '../../../lib/localizedContent';
import SeoHead from 'components/SeoHead';

export default function BlogPage({ posts }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const currentLocale = router.locale;

  return (
    <>
      <SeoHead
        pathname="/blog"
        locale={router.locale}
        title={t('blog.seo.title')}
        description={t('blog.seo.description')}
      />

      <div className="container py-10">
        <h1 className="text-kardak text-3xl font-bold mb-6 text-center">{t('blog.title')}</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {posts.map((post) => {
            const slug = getPostSlug(post, currentLocale);
            if (!slug) return null;
            return (
            <div key={post.id ?? post.slug.tr}>
              <Link
                href={`/blog/${slug}`}
                locale={currentLocale}
                className="text-kardak font-medium mt-4 inline-block"
              >
                <Image
                  src={post.image}
                  alt={getPostLocalized(post, 'title', currentLocale)}
                  width={600}
                  height={400}
                  className="w-full h-auto mb-4 rounded-lg"/>
                <h2 className="text-kardak text-xl font-semibold mb-2">{getPostLocalized(post, 'title', currentLocale)}</h2>
                <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                <p className="text-gray-800">{getPostLocalized(post, 'excerpt', currentLocale)}</p>
                  {t('blog.read_more')}
              </Link>
            </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      posts: allPosts,
    },
  };
}
