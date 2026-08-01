import Head from 'next/head';

import { getHreflangAlternates, getOgLocale, getPageAbsoluteUrl, getSiteUrl } from '../lib/seo';

const DEFAULT_ROBOTS =
  'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1';

export default function SeoHead({
  pathname,
  query = {},
  locale,
  title,
  description,
  ogImage = '/assets/images/logo.png',
  ogType = 'website',
  jsonLd,
  robots = DEFAULT_ROBOTS,
  keywords,
}) {
  const siteUrl = getSiteUrl();
  const canonical = getPageAbsoluteUrl(pathname, query, locale);
  const alternates = getHreflangAlternates(pathname, query);
  const xDefault =
    alternates.find((alternate) => alternate.hreflang === 'tr')?.href || canonical;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      {alternates.map((alternate) => (
        <link
          key={alternate.hreflang}
          rel="alternate"
          hrefLang={alternate.hreflang}
          href={alternate.href}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefault} />
      <link rel="icon" href={`${siteUrl}/favicon.ico`} />
      <meta property="og:locale" content={getOgLocale(locale)} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
