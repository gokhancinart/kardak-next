import { categories, customPrintLanding } from '../data/categories.mjs';
import { staticPages, getStaticPageByPathname } from '../data/pageRoutes.mjs';
import { getBlogSlugForLocale } from '../data/blogRoutes.mjs';
import { products } from '../data/products.mjs';
import {
  getLocalized,
  getProductSlug,
  getVariantSlug,
  matchesProductSlug,
  matchesVariantSlug,
} from './localizedContent';
import { LOCALE_PREFIX_LOCALES } from './locales.mjs';

export function getProductsListingUrl(locale) {
  return staticPages.products.slug[locale];
}

export function getPageUrl(pageKey, locale) {
  const page = staticPages[pageKey];
  if (!page) return '/';
  return page.slug[locale] ?? page.slug.tr;
}

export function getPagePathname(pageKey) {
  return staticPages[pageKey]?.pathname ?? '/';
}

function findProductByVariantSlug(variantSlug) {
  return products.find(
    (product) => product.variantSlug && matchesVariantSlug(product, variantSlug)
  );
}

function findProductByAnySlug(slug) {
  return products.find((product) => matchesProductSlug(product, slug));
}

function isCustomPrintSlug(variantSlug) {
  return Object.values(customPrintLanding.slug).includes(variantSlug);
}

function getCategoryByRouteSlug(routeSlug) {
  return Object.values(categories).find((category) => category.routeSlug === routeSlug);
}

export function buildPublicPath(pathname, query, locale) {
  const staticPage = getStaticPageByPathname(pathname);
  if (staticPage) {
    return staticPage.slug[locale] ?? staticPage.slug.tr;
  }

  if (pathname === '/products/[slug]') {
    const product = findProductByAnySlug(query.slug);
    const localizedSlug = product ? getProductSlug(product, locale) : query.slug;
    return `${getProductsListingUrl(locale)}/${localizedSlug}`;
  }

  if (pathname === '/blog/[slug]') {
    return `/blog/${getBlogSlugForLocale(query.slug, locale)}`;
  }

  const categoryFromIndex = getCategoryByRouteSlug(pathname.slice(1));
  if (categoryFromIndex) {
    return `/${getLocalized(categoryFromIndex.slug, locale)}`;
  }

  for (const category of Object.values(categories)) {
    const variantPathname = `/${category.routeSlug}/[variant]`;
    if (pathname === variantPathname) {
      const { variant } = query;

      if (isCustomPrintSlug(variant)) {
        return staticPages.customPrint.slug[locale] ?? staticPages.customPrint.slug.tr;
      }

      const product = findProductByVariantSlug(variant);
      if (product?.variantSlug) {
        return `/${getLocalized(category.slug, locale)}/${getVariantSlug(product, locale)}`;
      }

      return `/${getLocalized(category.slug, locale)}/${variant}`;
    }
  }

  return pathname;
}

export function getLocaleSwitchHref({ asPath, pathname, query }, targetLocale) {
  const hashIndex = asPath.indexOf('#');
  const hash = hashIndex >= 0 ? asPath.slice(hashIndex) : '';
  const publicPath = buildPublicPath(pathname, query, targetLocale);

  if (LOCALE_PREFIX_LOCALES.includes(targetLocale)) {
    if (publicPath === '/') return `/${targetLocale}${hash}`;
    return `/${targetLocale}${publicPath}${hash}`;
  }

  return `${publicPath}${hash}`;
}

export function isProductsRoute(pathname) {
  return (
    pathname === '/products' ||
    pathname === '/products/[slug]' ||
    pathname === staticPages.products.pathname
  );
}

export function isToptanRoute(pathname) {
  if (pathname === '/404') return false;

  const routeSlugs = Object.values(categories).flatMap((category) => [
    category.routeSlug,
    `/${category.routeSlug}`,
    `/${category.routeSlug}/[variant]`,
  ]);

  return routeSlugs.some((slug) => pathname === slug || pathname.startsWith(`${slug}/`));
}

export function isProductsNavActive(pathname) {
  return (
    isProductsRoute(pathname) ||
    isToptanRoute(pathname) ||
    pathname === staticPages.customPrint.pathname
  );
}

export function isPageActive(pageKey, pathname) {
  return pathname === getPagePathname(pageKey);
}
