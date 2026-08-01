export const staticPages = {
  home: { pathname: '/', slug: { tr: '/', en: '/', ar: '/' } },
  about: { pathname: '/about', slug: { tr: '/hakkimizda', en: '/about', ar: '/about' } },
  contact: { pathname: '/contact', slug: { tr: '/iletisim', en: '/contact', ar: '/contact' } },
  blog: { pathname: '/blog', slug: { tr: '/blog', en: '/blog', ar: '/blog' } },
  products: { pathname: '/products', slug: { tr: '/urunlerimiz', en: '/products', ar: '/products' } },
  customPrint: {
    pathname: '/custom-printed-paper-cups',
    slug: {
      tr: '/ozel-baskili-karton-bardak',
      en: '/custom-printed-paper-cups',
      ar: '/custom-printed-paper-cups',
    },
  },
};

export function getStaticPageByPathname(pathname) {
  return Object.values(staticPages).find((page) => page.pathname === pathname);
}

export function getStaticPageBySlug(slug, locale) {
  return Object.values(staticPages).find((page) => page.slug[locale] === slug);
}
