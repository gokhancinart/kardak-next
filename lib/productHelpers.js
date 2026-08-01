import { products } from '../data/products.mjs';
import { categories, getCategoryByType } from '../data/categories.mjs';
import { getPageUrl, getProductsListingUrl } from './routes';
import { toptanRedirects } from '../data/toptan-redirects.mjs';

const CATEGORY_KEYS = ['4oz', '7oz', '8oz', 'soup'];

export function getProductUrl(product, locale) {
  const category = getCategoryByType(product.type);
  if (category && product.variantSlug) {
    return `/${category.slug[locale]}/${product.variantSlug[locale]}`;
  }
  return `${getProductsListingUrl(locale)}/${product.slug[locale]}`;
}

export function getCategoryUrl(categoryKey, locale) {
  const category = categories[categoryKey];
  return `/${category.slug[locale]}`;
}

export function getCustomPrintLandingUrl(locale) {
  return getPageUrl('customPrint', locale);
}

export function getCustomPrintUrl(_categoryKey, locale) {
  return getCustomPrintLandingUrl(locale);
}

export function getBrandedCustomPrintProducts() {
  return getProductsByCategoryKey('7oz', { brandedCustomPrintOnly: true });
}

export function getProductsByCategoryKey(
  categoryKey,
  {
    featuredOnly = false,
    excludeBrandedCustomPrint = false,
    brandedCustomPrintOnly = false,
  } = {}
) {
  const category = categories[categoryKey];
  if (!category) return [];

  let items = products.filter((p) => p.type === category.type);
  if (featuredOnly) {
    items = items.filter((p) => p.featured);
  }
  if (excludeBrandedCustomPrint) {
    items = items.filter((p) => !p.brandedCustomPrint);
  }
  if (brandedCustomPrintOnly) {
    items = items.filter((p) => p.brandedCustomPrint);
    if (category.brandedCustomPrintOrder) {
      items = [...items].sort(
        (a, b) =>
          category.brandedCustomPrintOrder.indexOf(a.id) -
          category.brandedCustomPrintOrder.indexOf(b.id)
      );
    }
  } else if (category.customOrder) {
    items = [...items].sort(
      (a, b) => category.customOrder.indexOf(a.id) - category.customOrder.indexOf(b.id)
    );
  }
  return items;
}

export function findProductByVariant(categoryKey, variantSlug, locale) {
  const category = categories[categoryKey];
  if (!category) return null;

  return products.find(
    (p) => p.type === category.type && p.variantSlug?.[locale] === variantSlug
  );
}

export function getCategoryStaticPaths(categoryKey) {
  const category = categories[categoryKey];
  const categoryProducts = products.filter((p) => p.type === category.type);

  const paths = [];

  for (const locale of ['tr', 'en']) {
    for (const product of categoryProducts) {
      if (!product.variantSlug) continue;
      paths.push({
        params: { variant: product.variantSlug[locale] },
        locale,
      });
    }
  }

  return paths;
}

export function getAllToptanRedirects() {
  return toptanRedirects;
}

export { CATEGORY_KEYS, categories };
