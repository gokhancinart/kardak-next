export const categories = {
  '4oz': {
    type: '4oz',
    routeSlug: 'toptan-4-oz-karton-bardak',
    slug: {
      tr: 'toptan-4-oz-karton-bardak',
      en: 'wholesale-4oz-paper-cups',
    },
    title: {
      tr: 'Toptan 4 oz Karton Bardak',
      en: 'Wholesale 4 oz Paper Cups',
    },
    description: {
      tr: '4 oz (120ml) toptan karton bardak modellerimiz. Espresso, kahve ve sıcak içecek servisi için ideal boyut. Beyaz, Mevlana ve desenli seçenekler.',
      en: 'Our wholesale 4 oz (120ml) paper cups. Ideal size for espresso and hot beverages. White, Mevlana and patterned options available.',
    },
    customOrder: [13, 10, 12, 9, 11],
    hasCustomPrint: true,
  },
  '7oz': {
    type: '7oz',
    routeSlug: 'toptan-7-oz-karton-bardak',
    slug: {
      tr: 'toptan-7-oz-karton-bardak',
      en: 'wholesale-7oz-paper-cups',
    },
    title: {
      tr: 'Toptan 7 oz Karton Bardak',
      en: 'Wholesale 7 oz Paper Cups',
    },
    description: {
      tr: '7 oz (180ml) toptan karton bardak modellerimiz. Kahve dükkanları, pastaneler ve paket servis için en çok tercih edilen boyut. Kraft, beyaz ve desenli seçenekler.',
      en: 'Our wholesale 7 oz (180ml) paper cups. The most popular size for coffee shops and takeaway. Kraft, white and patterned options.',
    },
    hasCustomPrint: true,
    customOrder: [1, 7, 26, 3, 28, 29, 2, 30, 8, 32, 33, 27],
    brandedCustomPrintOrder: [4, 5, 6, 34],
  },
  '8oz': {
    type: '8oz',
    routeSlug: 'toptan-8-oz-karton-bardak',
    slug: {
      tr: 'toptan-8-oz-karton-bardak',
      en: 'wholesale-8oz-paper-cups',
    },
    title: {
      tr: 'Toptan 8 oz Karton Bardak',
      en: 'Wholesale 8 oz Paper Cups',
    },
    description: {
      tr: '8 oz (240ml) toptan karton bardak modellerimiz. Orta boy içecek servisi için ideal. Beyaz, coffee desenli ve özel tasarım seçenekler.',
      en: 'Our wholesale 8 oz (240ml) paper cups. Ideal for medium-size beverage service. White, coffee pattern and custom design options.',
    },
    hasCustomPrint: true,
  },
  soup: {
    type: 'soup',
    routeSlug: 'toptan-16-oz-karton-corba-kasesi',
    slug: {
      tr: 'toptan-16-oz-karton-corba-kasesi',
      en: 'wholesale-16oz-paper-soup-bowls',
    },
    title: {
      tr: 'Toptan 16 oz Karton Çorba Kasesi',
      en: 'Wholesale 16 oz Paper Soup Bowls',
    },
    description: {
      tr: '16 oz (470ml) toptan karton çorba kaselerimiz. Restoran, paket servis ve sıcak gıda sunumu için dayanıklı ve hijyenik çözümler.',
      en: 'Our wholesale 16 oz (470ml) paper soup bowls. Durable and hygienic solutions for restaurants and hot food service.',
    },
    hasCustomPrint: false,
  },
};

export const customPrintLanding = {
  slug: { tr: 'ozel-baskili', en: 'custom-printed' },
  title: {
    tr: 'Özel Baskılı Karton Bardak',
    en: 'Custom Printed Paper Cup',
  },
  description: {
    tr: 'Markanıza özel logo ve tasarımla baskılı karton bardak üretimi. Minimum sipariş miktarı ve fiyat teklifi için bizimle iletişime geçin.',
    en: 'Custom printed paper cups with your brand logo and design. Contact us for minimum order quantity and pricing.',
  },
  imageSrc: '/assets/images/cups/ozel-baskili-karton-bardak.webp',
};

export function getCategoryByKey(key) {
  return categories[key];
}

export function getCategoryByType(type) {
  return Object.values(categories).find((c) => c.type === type);
}

export function getCategoryBySlug(slug, locale) {
  return Object.entries(categories).find(([, c]) => c.slug[locale] === slug)?.[1];
}
