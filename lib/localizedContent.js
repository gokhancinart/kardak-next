import { productArCopy } from '../data/ar/productCopy.mjs';
import { getCapacityForType, localizeForLocale } from './productMeasurements';

export { getProductTechnicalDetails } from './productMeasurements';

/**
 * Read a { tr, en, ar? } map with fallback.
 * Arabic falls back to Turkish before English for untranslated content.
 * Does not transform values — safe for URL slugs.
 */
export function getLocalized(map, locale, fallback = 'en') {
  if (!map) return '';
  if (map[locale]) return map[locale];
  if (locale === 'ar' && map.tr) return map.tr;
  return map[fallback] ?? map.tr ?? map.en ?? '';
}

/** Same as getLocalized but applies Arabic oz/ml formatting for display text only. */
export function getLocalizedText(map, locale, fallback = 'en') {
  return localizeForLocale(getLocalized(map, locale, fallback), locale);
}

export function getProductName(product, locale) {
  if (locale === 'ar' && productArCopy[product.id]?.name) {
    return localizeForLocale(productArCopy[product.id].name, locale);
  }
  return getLocalizedText(product.name, locale);
}

export function getProductDescription(product, locale) {
  if (locale === 'ar' && productArCopy[product.id]?.description) {
    return localizeForLocale(productArCopy[product.id].description, locale);
  }
  return getLocalizedText(product.description, locale);
}

export function getProductSlug(product, locale) {
  if (locale === 'ar') {
    return product.slug?.ar ?? product.slug?.en ?? product.slug?.tr ?? '';
  }
  return getLocalized(product.slug, locale, 'en');
}

export function getProductSize(product, locale) {
  if (product.type) {
    const byType = getCapacityForType(product.type, locale);
    if (byType) return byType;
  }
  return getLocalizedText(product.size, locale);
}

export function getPostLocalized(post, field, locale) {
  if (!post?.[field]) return '';
  return getLocalizedText(post[field], locale, 'tr');
}

export function getPostSlug(post, locale) {
  return post.slug?.[locale] ?? post.slug?.tr ?? post.slug?.en ?? '';
}

export function getVariantSlug(product, locale) {
  if (!product.variantSlug) return null;
  if (locale === 'ar') {
    return product.variantSlug.ar ?? product.variantSlug.en ?? product.variantSlug.tr;
  }
  return getLocalized(product.variantSlug, locale, 'en');
}

export function matchesVariantSlug(product, slug) {
  if (!product.variantSlug) return false;
  return Object.values(product.variantSlug).includes(slug);
}

export function matchesProductSlug(product, slug) {
  return Object.values(product.slug).includes(slug);
}
