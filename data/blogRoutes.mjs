export const blogPosts = [
  {
    postId: '1',
    slug: { tr: 'karton-bardak-faydalari', en: 'paper-cup-benefits' },
  },
  {
    postId: '2',
    slug: { tr: 'baskili-karton-bardaklar', en: 'custom-printed-paper-cups' },
  },
  {
    postId: '3',
    slug: { tr: 'karton-bardak-siparisi', en: 'paper-cup-order-tips' },
  },
];

export function getBlogSlugForLocale(slug, locale) {
  const post = blogPosts.find(
    (entry) => entry.slug.tr === slug || entry.slug.en === slug
  );
  return post?.slug[locale] ?? slug;
}
