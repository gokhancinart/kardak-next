import { productArCopy } from '../data/ar/productCopy.mjs';
import { getCapacityForType, localizeForLocale } from './productMeasurements';

export { getProductTechnicalDetails } from './productMeasurements';

/**
 * Read a { tr, en, ar? } map with fallback.
 * Arabic falls back to Turkish before English for untranslated content.
 */
export function getLocalized(map, locale, fallback = 'en') {
  if (!map) return '';
  let value;
  if (map[locale]) value = map[locale];
  else if (locale === 'ar' && map.tr) value = map.tr;
  else value = map[fallback] ?? map.tr ?? map.en ?? '';
  return localizeForLocale(value, locale);
}

export function getProductName(product, locale) {
  if (locale === 'ar' && productArCopy[product.id]?.name) {
    return localizeForLocale(productArCopy[product.id].name, locale);
  }
  return getLocalized(product.name, locale);
}

export function getProductDescription(product, locale) {
  if (locale === 'ar' && productArCopy[product.id]?.description) {
    return localizeForLocale(productArCopy[product.id].description, locale);
  }
  return getLocalized(product.description, locale);
}

export function getProductSlug(product, locale) {
  return getLocalized(product.slug, locale, 'en');
}

export function getProductSize(product, locale) {
  if (product.type) {
    const byType = getCapacityForType(product.type, locale);
    if (byType) return byType;
  }
  return getLocalized(product.size, locale);
}

export function getPostLocalized(post, field, locale) {
  if (!post?.[field]) return '';
  return getLocalized(post[field], locale, 'tr');
}

export function getPostSlug(post, locale) {
  return post.slug?.[locale] ?? post.slug?.tr ?? post.slug?.en ?? '';
}

export function getVariantSlug(product, locale) {
  if (!product.variantSlug) return null;
  return getLocalized(product.variantSlug, locale, 'en');
}

export function matchesVariantSlug(product, slug) {
  if (!product.variantSlug) return false;
  return Object.values(product.variantSlug).includes(slug);
}

export function matchesProductSlug(product, slug) {
  return Object.values(product.slug).includes(slug);
}
