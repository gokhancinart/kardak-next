const AR_NUM = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

export function toArabicNumerals(value) {
  return String(value).replace(/\d/g, (d) => AR_NUM[Number(d)]);
}

export const CAPACITY_BY_TYPE = {
  '4oz': {
    tr: '4oz (120ml)',
    en: '4oz (120ml)',
    ar: '٤ أونصة (١٢٠ مل)',
  },
  '7oz': {
    tr: '7oz (180ml)',
    en: '7oz (180ml)',
    ar: '٧ أونصة (١٨٠ مل)',
  },
  '8oz': {
    tr: '8oz (240ml)',
    en: '8oz (240ml)',
    ar: '٨ أونصة (٢٤٠ مل)',
  },
  soup: {
    tr: '16oz (470ml)',
    en: '16oz (470ml)',
    ar: '١٦ أونصة (٤٧٠ مل)',
  },
};

const CAPACITY_VALUE_AR = {
  '4oz (120ml)': '٤ أونصة (١٢٠ مل)',
  '7oz (180ml)': '٧ أونصة (١٨٠ مل)',
  '8oz (240ml)': '٨ أونصة (٢٤٠ مل)',
  '16oz (470ml)': '١٦ أونصة (٤٧٠ مل)',
};

export const TYPE_CAPACITY_AR = {
  '4oz': { volumeLabel: '٤ أونصة', volume: '١٢٠ مل', keyword: 'أكواب ورقية ٤ أونصة' },
  '7oz': { volumeLabel: '٧ أونصة', volume: '١٨٠ مل', keyword: 'أكواب ورقية ٧ أونصة' },
  '8oz': { volumeLabel: '٨ أونصة', volume: '٢٤٠ مل', keyword: 'أكواب ورقية ٨ أونصة' },
  soup: { volumeLabel: '١٦ أونصة', volume: '٤٧٠ مل', keyword: 'أوعية شوربة ورقية ١٦ أونصة' },
};

export function formatCapacityAr(value) {
  return CAPACITY_VALUE_AR[value] ?? value;
}

export function formatMillimetersAr(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)\s*mm$/i);
  if (!match) return value;
  return `${toArabicNumerals(match[1])} مم`;
}

export function getCapacityForType(type, locale) {
  return CAPACITY_BY_TYPE[type]?.[locale] ?? CAPACITY_BY_TYPE[type]?.en ?? '';
}

export function getProductTechnicalDetails(product, locale) {
  if (!product?.technicalDetails) return null;
  if (locale !== 'ar') return product.technicalDetails;

  return Object.fromEntries(
    Object.entries(product.technicalDetails).map(([key, value]) => {
      if (key === 'capacity') {
        return [key, formatCapacityAr(value) || getCapacityForType(product.type, 'ar')];
      }
      return [key, formatMillimetersAr(value)];
    })
  );
}

const AR_OZ_PATTERNS = [
  [/16\s*oz\s*\(\s*470\s*ml\s*\)/gi, '١٦ أونصة (٤٧٠ مل)'],
  [/8\s*oz\s*\(\s*240\s*ml\s*\)/gi, '٨ أونصة (٢٤٠ مل)'],
  [/7\s*oz\s*\(\s*180\s*ml\s*\)/gi, '٧ أونصة (١٨٠ مل)'],
  [/4\s*oz\s*\(\s*120\s*ml\s*\)/gi, '٤ أونصة (١٢٠ مل)'],
  [/16oz\s*\(\s*470ml\s*\)/gi, '١٦ أونصة (٤٧٠ مل)'],
  [/8oz\s*\(\s*240ml\s*\)/gi, '٨ أونصة (٢٤٠ مل)'],
  [/7oz\s*\(\s*180ml\s*\)/gi, '٧ أونصة (١٨٠ مل)'],
  [/4oz\s*\(\s*120ml\s*\)/gi, '٤ أونصة (١٢٠ مل)'],
  [/16\s*oz/gi, '١٦ أونصة'],
  [/8\s*oz/gi, '٨ أونصة'],
  [/7\s*oz/gi, '٧ أونصة'],
  [/4\s*oz/gi, '٤ أونصة'],
  [/16oz/gi, '١٦ أونصة'],
  [/8oz/gi, '٨ أونصة'],
  [/7oz/gi, '٧ أونصة'],
  [/4oz/gi, '٤ أونصة'],
];

/** Convert Latin oz/ml/mm in Arabic UI strings (RTL-safe). Idempotent on already-Arabic text. */
export function localizeArabicMeasurements(text) {
  if (!text) return text;
  let result = text;
  for (const [pattern, replacement] of AR_OZ_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  result = result.replace(/(\d+(?:\.\d+)?)\s*mm/gi, (_, n) => `${toArabicNumerals(n)} مم`);
  result = result.replace(/(\d+(?:\.\d+)?)\s*ml/gi, (_, n) => `${toArabicNumerals(n)} مل`);
  return result;
}

export function localizeForLocale(text, locale) {
  return locale === 'ar' ? localizeArabicMeasurements(text) : text;
}
