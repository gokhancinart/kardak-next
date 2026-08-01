import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { products } from '../data/products.mjs';
import { getCategoryByType } from '../data/categories.mjs';

import { SUPPORTED_LOCALES, LOCALE_PREFIX_LOCALES } from '../lib/locales.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function buildProductRedirects() {
  const redirects = [];

  for (const product of products) {
    const category = getCategoryByType(product.type);
    if (!category || !product.variantSlug) continue;

    for (const locale of SUPPORTED_LOCALES) {
      const prefix = LOCALE_PREFIX_LOCALES.includes(locale) ? `/${locale}` : '';
      const slug = product.slug[locale] ?? product.slug.en;
      const categorySlug = category.slug[locale] ?? category.slug.en;
      const variant = product.variantSlug[locale] ?? product.variantSlug.en;

      redirects.push({
        source: `${prefix}/products/${slug}`,
        destination: `${prefix}/${categorySlug}/${variant}`,
        permanent: true,
      });
    }
  }

  return redirects;
}

const legacyRedirects = [
  {
    source: '/products/altigen-desen-karton-bardak',
    destination: '/toptan-7-oz-karton-bardak/petek-desenli',
    permanent: true,
  },
  {
    source: '/en/products/hexagon-pattern-paper-cup',
    destination: '/en/wholesale-7oz-paper-cups/honeycomb-pattern',
    permanent: true,
  },
  {
    source: '/toptan-7-oz-karton-bardak/altigen-desen',
    destination: '/toptan-7-oz-karton-bardak/petek-desenli',
    permanent: true,
  },
  {
    source: '/en/toptan-7-oz-karton-bardak/hexagon-pattern',
    destination: '/en/wholesale-7oz-paper-cups/honeycomb-pattern',
    permanent: true,
  },
  {
    source: '/en/wholesale-7oz-paper-cups/hexagon-pattern',
    destination: '/en/wholesale-7oz-paper-cups/honeycomb-pattern',
    permanent: true,
  },
];

const enToptanToWholesaleRedirects = [
  ['toptan-4-oz-karton-bardak', 'wholesale-4oz-paper-cups'],
  ['toptan-7-oz-karton-bardak', 'wholesale-7oz-paper-cups'],
  ['toptan-8-oz-karton-bardak', 'wholesale-8oz-paper-cups'],
  ['toptan-16-oz-karton-corba-kasesi', 'wholesale-16oz-paper-soup-bowls'],
].flatMap(([routeSlug, enSlug]) => [
  {
    source: `/en/${routeSlug}`,
    destination: `/en/${enSlug}`,
    permanent: true,
    locale: false,
  },
  {
    source: `/en/${routeSlug}/:variant*`,
    destination: `/en/${enSlug}/:variant*`,
    permanent: true,
    locale: false,
  },
]);

const enSlugRewrites = [
  ['wholesale-4oz-paper-cups', 'toptan-4-oz-karton-bardak'],
  ['wholesale-7oz-paper-cups', 'toptan-7-oz-karton-bardak'],
  ['wholesale-8oz-paper-cups', 'toptan-8-oz-karton-bardak'],
  ['wholesale-16oz-paper-soup-bowls', 'toptan-16-oz-karton-corba-kasesi'],
].flatMap(([enSlug, routeSlug]) => [
  { source: `/${enSlug}`, destination: `/${routeSlug}` },
  { source: `/${enSlug}/:variant*`, destination: `/${routeSlug}/:variant*` },
]);

const trPagePathRedirects = [
  {
    source: '/about',
    destination: '/hakkimizda',
    permanent: true,
    locale: false,
  },
  {
    source: '/about/',
    destination: '/hakkimizda/',
    permanent: true,
    locale: false,
  },
  {
    source: '/contact',
    destination: '/iletisim',
    permanent: true,
    locale: false,
  },
  {
    source: '/contact/',
    destination: '/iletisim/',
    permanent: true,
    locale: false,
  },
];

const trPagePathRewrites = [
  { source: '/hakkimizda', destination: '/about' },
  { source: '/hakkimizda/', destination: '/about/' },
  { source: '/iletisim', destination: '/contact' },
  { source: '/iletisim/', destination: '/contact/' },
];

const trProductsPathRedirects = [
  {
    source: '/products',
    destination: '/urunlerimiz',
    permanent: true,
    locale: false,
  },
  {
    source: '/products/',
    destination: '/urunlerimiz/',
    permanent: true,
    locale: false,
  },
];

function buildLegacyProductsListingRedirects() {
  const redirects = [];

  for (const product of products) {
    if (product.variantSlug) continue;

    redirects.push({
      source: `/products/${product.slug.tr}`,
      destination: `/urunlerimiz/${product.slug.tr}`,
      permanent: true,
      locale: false,
    });
    redirects.push({
      source: `/products/${product.slug.tr}/`,
      destination: `/urunlerimiz/${product.slug.tr}/`,
      permanent: true,
      locale: false,
    });
  }

  return redirects;
}

const trProductsPathRewrites = [
  { source: '/urunlerimiz', destination: '/products' },
  { source: '/urunlerimiz/', destination: '/products/' },
  { source: '/urunlerimiz/:slug', destination: '/products/:slug' },
  { source: '/urunlerimiz/:slug/', destination: '/products/:slug/' },
];

const trCustomPrintRewrites = [
  { source: '/ozel-baskili-karton-bardak', destination: '/custom-printed-paper-cups' },
  { source: '/ozel-baskili-karton-bardak/', destination: '/custom-printed-paper-cups/' },
];

const removed12ozSlugs = [
  ['12oz-craft-karton-bardak', '12oz-craft-paper-cup'],
  ['12oz-green-karton-bardak', '12oz-green-paper-cup'],
  ['12oz-luxury-karton-bardak', '12oz-luxury-paper-cup'],
  ['12oz-minimal-karton-bardak', '12oz-minimal-paper-cup'],
];

const removed12ozRedirects = removed12ozSlugs.flatMap(([trSlug, enSlug]) => [
  {
    source: `/products/${trSlug}`,
    destination: '/toptan-8-oz-karton-bardak/',
    permanent: true,
    locale: false,
  },
  {
    source: `/products/${trSlug}/`,
    destination: '/toptan-8-oz-karton-bardak/',
    permanent: true,
    locale: false,
  },
  {
    source: `/urunlerimiz/${trSlug}`,
    destination: '/toptan-8-oz-karton-bardak/',
    permanent: true,
    locale: false,
  },
  {
    source: `/urunlerimiz/${trSlug}/`,
    destination: '/toptan-8-oz-karton-bardak/',
    permanent: true,
    locale: false,
  },
  {
    source: `/en/products/${enSlug}`,
    destination: '/en/wholesale-8oz-paper-cups/',
    permanent: true,
    locale: false,
  },
  {
    source: `/en/products/${enSlug}/`,
    destination: '/en/wholesale-8oz-paper-cups/',
    permanent: true,
    locale: false,
  },
]);

const customPrintCategoryPairs = [
  ['toptan-4-oz-karton-bardak', 'wholesale-4oz-paper-cups'],
  ['toptan-7-oz-karton-bardak', 'wholesale-7oz-paper-cups'],
  ['toptan-8-oz-karton-bardak', 'wholesale-8oz-paper-cups'],
];

const customPrintCategoryRedirects = customPrintCategoryPairs.flatMap(([trCategory, enCategory]) => [
  {
    source: `/${trCategory}/ozel-baskili`,
    destination: '/ozel-baskili-karton-bardak',
    permanent: true,
    locale: false,
  },
  {
    source: `/${trCategory}/ozel-baskili/`,
    destination: '/ozel-baskili-karton-bardak/',
    permanent: true,
    locale: false,
  },
  {
    source: `/en/${enCategory}/custom-printed`,
    destination: '/en/custom-printed-paper-cups',
    permanent: true,
    locale: false,
  },
  {
    source: `/en/${enCategory}/custom-printed/`,
    destination: '/en/custom-printed-paper-cups/',
    permanent: true,
    locale: false,
  },
]);

const trLocaleRewrites = [
  ...trPagePathRewrites,
  ...trProductsPathRewrites,
  ...trCustomPrintRewrites,
];

const allRedirects = [
  ...buildProductRedirects(),
  ...buildLegacyProductsListingRedirects(),
  ...legacyRedirects,
  ...enToptanToWholesaleRedirects,
  ...trPagePathRedirects,
  ...trProductsPathRedirects,
  ...removed12ozRedirects,
  ...customPrintCategoryRedirects,
];

const output = `// Auto-generated by scripts/generate-redirects.mjs — do not edit manually
export const toptanRedirects = ${JSON.stringify(allRedirects, null, 2)};

export const enSlugRewrites = ${JSON.stringify(enSlugRewrites, null, 2)};

export const trLocaleRewrites = ${JSON.stringify(trLocaleRewrites, null, 2)};
`;

writeFileSync(path.join(__dirname, '../data/toptan-redirects.mjs'), output);
console.log(`Generated ${allRedirects.length} redirects and ${enSlugRewrites.length} rewrites.`);
