import { getAllPosts, getPostByLocalizedSlug } from '../../lib/posts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { getPostLocalized, getPostSlug } from '../../../lib/localizedContent';
import { getPageUrl } from '../../../lib/routes';
import { buildJsonLdGraph, getPageAbsoluteUrl } from '../../../lib/seo';
import SeoHead from 'components/SeoHead';

export default function Post({ post }) {
  const router = useRouter();
  const { t } = useTranslation('common');
  const locale = router.locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const slug = getPostSlug(post, locale);
  const title = getPostLocalized(post, 'title', locale);
  const excerpt = getPostLocalized(post, 'excerpt', locale);
  const seoDescription = getPostLocalized(post, 'seoDescription', locale) || excerpt;
  const keywords = post.keywords?.[locale] ?? post.keywords?.ar ?? post.keywords?.en ?? post.keywords?.tr ?? [];
  const postUrl = getPageAbsoluteUrl('/blog/[slug]', { slug }, locale);

  const jsonLd = buildJsonLdGraph({
    '@type': 'BlogPosting',
    headline: title,
    description: seoDescription,
    image: [`${siteUrl}${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: postUrl,
    author: {
      '@type': 'Organization',
      name: 'Kardak',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kardak',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/assets/images/logo.png`,
      },
    },
    inLanguage: locale,
  });

  return (
    <div className="p-6">
      <SeoHead
        pathname="/blog/[slug]"
        query={{ slug }}
        locale={locale}
        title={`${title} | Kardak`}
        description={seoDescription}
        ogImage={post.image}
        ogType="article"
        keywords={keywords.join(', ')}
        jsonLd={jsonLd}
      />
      <div className="container mx-auto max-w-4xl">
        <Link href={getPageUrl('blog', locale)} className="inline-flex mb-4 text-kardak font-semibold hover:underline">
          {t('blog.back_to_blog')}
        </Link>
        <Image
          src={post.image}
          alt={title}
          width={800}
          height={400}
          className="w-full h-auto mb-4 rounded-lg contain object-cover max-h-[400px]"
          priority
        />
        <h1 className="text-kardak text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 text-sm mb-8">{post.date}</p>
        <div className="blog-content text-base leading-8 text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths({ locales }) {
  const posts = getAllPosts();
  const paths = [];

  for (const locale of locales) {
    for (const post of posts) {
      const slug = getPostSlug(post, locale);
      if (!slug) continue;
      paths.push({
        params: { slug },
        locale,
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const post = await getPostByLocalizedSlug(params.slug, locale);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
    },
  };
}
