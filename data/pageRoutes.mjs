export const staticPages = {
  home: { pathname: '/', slug: { tr: '/', en: '/' } },
  about: { pathname: '/about', slug: { tr: '/hakkimizda', en: '/about' } },
  contact: { pathname: '/contact', slug: { tr: '/iletisim', en: '/contact' } },
  blog: { pathname: '/blog', slug: { tr: '/blog', en: '/blog' } },
  products: { pathname: '/products', slug: { tr: '/urunlerimiz', en: '/products' } },
  customPrint: {
    pathname: '/custom-printed-paper-cups',
    slug: { tr: '/ozel-baskili-karton-bardak', en: '/custom-printed-paper-cups' },
  },
};

export function getStaticPageByPathname(pathname) {
  return Object.values(staticPages).find((page) => page.pathname === pathname);
}

export function getStaticPageBySlug(slug, locale) {
  return Object.values(staticPages).find((page) => page.slug[locale] === slug);
}
