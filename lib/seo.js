import { categories } from '../data/categories.mjs';
import { buildPublicPath, getProductsListingUrl } from './routes';

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kardakcup.com').replace(/\/$/, '');
}

function withTrailingSlash(url) {
  if (url.includes('?') || url.includes('#')) return url;
  return url.endsWith('/') ? url : `${url}/`;
}

export function getAbsoluteUrl(publicPath, locale) {
  const base = getSiteUrl();

  if (locale === 'en') {
    if (publicPath === '/') return withTrailingSlash(`${base}/en`);
    return withTrailingSlash(`${base}/en${publicPath}`);
  }

  if (publicPath === '/') return withTrailingSlash(`${base}`);
  return withTrailingSlash(`${base}${publicPath}`);
}

export function getPageAbsoluteUrl(pathname, query, locale) {
  const publicPath = buildPublicPath(pathname, query, locale);
  return getAbsoluteUrl(publicPath, locale);
}

export function getHreflangAlternates(pathname, query) {
  return ['tr', 'en'].map((locale) => ({
    hreflang: locale,
    href: getPageAbsoluteUrl(pathname, query, locale),
  }));
}

export function buildJsonLdGraph(...schemas) {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

export function buildProductSchema({ name, description, imageSrc, pageUrl, categoryName }) {
  const siteUrl = getSiteUrl();
  const image = imageSrc.startsWith('http') ? imageSrc : `${siteUrl}${imageSrc}`;

  return {
    '@type': 'Product',
    name,
    description,
    image,
    url: pageUrl,
    brand: {
      '@type': 'Brand',
      name: 'Kardak',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Kardak',
      url: getAbsoluteUrl('/', 'tr'),
    },
    category: categoryName,
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getToptanCategoryPathname(categoryKey) {
  return `/${categories[categoryKey].routeSlug}`;
}

export function getToptanVariantPathname(categoryKey) {
  return `/${categories[categoryKey].routeSlug}/[variant]`;
}

export function buildProductBreadcrumbs({
  locale,
  homeLabel,
  productsLabel,
  categoryTitle,
  categoryPath,
  productName,
  productUrl,
}) {
  const siteUrl = getSiteUrl();
  const localePrefix = locale === 'en' ? '/en' : '';

  return buildBreadcrumbSchema([
    { name: homeLabel, url: getAbsoluteUrl('/', locale) },
    { name: productsLabel, url: getAbsoluteUrl(getProductsListingUrl(locale), locale) },
    { name: categoryTitle, url: `${siteUrl}${localePrefix}${categoryPath}/` },
    { name: productName, url: productUrl },
  ]);
}

export function buildLegacyProductBreadcrumbs({
  locale,
  homeLabel,
  productsLabel,
  productName,
  productUrl,
}) {
  return buildBreadcrumbSchema([
    { name: homeLabel, url: getAbsoluteUrl('/', locale) },
    { name: productsLabel, url: getAbsoluteUrl(getProductsListingUrl(locale), locale) },
    { name: productName, url: productUrl },
  ]);
}

export function buildCategoryBreadcrumbs({
  locale,
  homeLabel,
  productsLabel,
  categoryTitle,
  categoryUrl,
}) {
  return buildBreadcrumbSchema([
    { name: homeLabel, url: getAbsoluteUrl('/', locale) },
    { name: productsLabel, url: getAbsoluteUrl(getProductsListingUrl(locale), locale) },
    { name: categoryTitle, url: categoryUrl },
  ]);
}
