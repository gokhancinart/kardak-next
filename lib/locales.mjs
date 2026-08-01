export const DEFAULT_LOCALE = 'tr';

export const SUPPORTED_LOCALES = ['tr', 'en', 'ar'];

/** Locales served under /{locale}/ prefix (not default TR at root) */
export const LOCALE_PREFIX_LOCALES = ['en', 'ar'];

export const RTL_LOCALES = ['ar'];

export const OG_LOCALE_MAP = {
  tr: 'tr_TR',
  en: 'en_US',
  ar: 'ar_SA',
};

export function isRtlLocale(locale) {
  return RTL_LOCALES.includes(locale);
}

export function getLocalePrefix(locale) {
  return LOCALE_PREFIX_LOCALES.includes(locale) ? `/${locale}` : '';
}
