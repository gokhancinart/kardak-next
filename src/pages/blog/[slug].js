import { getAllPosts, getPostByLocalizedSlug } from '../../lib/posts';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Post({ post }) {
  const router = useRouter();
  const locale = router.locale;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const postUrl = `${siteUrl}/${locale}/blog/${post.slug[locale]}`;
  const alternateLocale = locale === 'tr' ? 'en' : 'tr';
  const alternateUrl = `${siteUrl}/${alternateLocale}/blog/${post.slug[alternateLocale]}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title[locale],
    description: post.seoDescription[locale] || post.excerpt[locale],
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
  };

  return (
    <div className="p-6">
      <Head>
        <title>{post.title[locale]}</title>
        <meta name="description" content={post.seoDescription[locale] || post.excerpt[locale]} />
        <meta name="keywords" content={post.keywords[locale]?.join(', ')} />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <link rel="canonical" href={postUrl} />
        <link rel="alternate" hrefLang={locale} href={postUrl} />
        <link rel="alternate" hrefLang={alternateLocale} href={alternateUrl} />
        <link rel="alternate" hrefLang="x-default" href={alternateUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title[locale]} />
        <meta property="og:description" content={post.seoDescription[locale] || post.excerpt[locale]} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={`${siteUrl}${post.image}`} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Kardak" />
        <meta property="og:locale" content={locale === 'tr' ? 'tr_TR' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title[locale]} />
        <meta name="twitter:description" content={post.seoDescription[locale] || post.excerpt[locale]} />
        <meta name="twitter:image" content={`${siteUrl}${post.image}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="container mx-auto max-w-4xl">
        <Link href="/blog" className="inline-flex mb-4 text-kardak font-semibold hover:underline">
          {locale === 'tr' ? '← Bloga Dön' : '← Back to Blog'}
        </Link>
        <Image
          src={post.image}
          alt={post.title[locale]}
          width={800}
          height={400}
          className="w-full h-auto mb-4 rounded-lg contain object-cover max-h-[400px]"
          priority
        />
        <h1 className="text-kardak text-3xl font-bold mb-2">{post.title[locale]}</h1>
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
      paths.push({
        params: { slug: post.slug[locale] },
        locale
      });
    }
  }

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params, locale }) {
  const post = await getPostByLocalizedSlug(params.slug, locale);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post
    }
  };
}