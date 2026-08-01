import { categories, customPrintLanding } from '../data/categories.mjs';
import { staticPages, getStaticPageByPathname } from '../data/pageRoutes.mjs';
import { getBlogSlugForLocale } from '../data/blogRoutes.mjs';
import { products } from '../data/products.mjs';

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
    (product) =>
      product.variantSlug &&
      (product.variantSlug.tr === variantSlug || product.variantSlug.en === variantSlug)
  );
}

function findProductByAnySlug(slug) {
  return products.find(
    (product) => product.slug.tr === slug || product.slug.en === slug
  );
}

function isCustomPrintSlug(variantSlug) {
  return (
    variantSlug === customPrintLanding.slug.tr ||
    variantSlug === customPrintLanding.slug.en
  );
}

function getCategoryByRouteSlug(routeSlug) {
  return Object.values(categories).find((category) => category.routeSlug === routeSlug);
}

export function buildPublicPath(pathname, query, locale) {
  const staticPage = getStaticPageByPathname(pathname);
  if (staticPage) {
    return staticPage.slug[locale];
  }

  if (pathname === '/products/[slug]') {
    const product = findProductByAnySlug(query.slug);
    const localizedSlug = product?.slug[locale] ?? query.slug;
    return `${getProductsListingUrl(locale)}/${localizedSlug}`;
  }

  if (pathname === '/blog/[slug]') {
    return `/blog/${getBlogSlugForLocale(query.slug, locale)}`;
  }

  const categoryFromIndex = getCategoryByRouteSlug(pathname.slice(1));
  if (categoryFromIndex) {
    return `/${categoryFromIndex.slug[locale]}`;
  }

  for (const category of Object.values(categories)) {
    const variantPathname = `/${category.routeSlug}/[variant]`;
    if (pathname === variantPathname) {
      const { variant } = query;

      if (isCustomPrintSlug(variant)) {
        return staticPages.customPrint.slug[locale];
      }

      const product = findProductByVariantSlug(variant);
      if (product?.variantSlug) {
        return `/${category.slug[locale]}/${product.variantSlug[locale]}`;
      }

      return `/${category.slug[locale]}/${variant}`;
    }
  }

  return pathname;
}

export function getLocaleSwitchHref({ asPath, pathname, query }, targetLocale) {
  const hashIndex = asPath.indexOf('#');
  const hash = hashIndex >= 0 ? asPath.slice(hashIndex) : '';
  const publicPath = buildPublicPath(pathname, query, targetLocale);

  if (targetLocale === 'en') {
    if (publicPath === '/') return `/en${hash}`;
    return `/en${publicPath}${hash}`;
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
