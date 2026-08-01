import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { products } from '../data/products.mjs';
import { categories } from '../data/categories.mjs';
import { staticPages } from '../data/pageRoutes.mjs';
import { blogPosts } from '../data/blogRoutes.mjs';
import { SUPPORTED_LOCALES } from '../lib/locales.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kardakcup.com').replace(
  /\/$/,
  ''
);

function buildLocalizedUrls(trPath, enPath, arPath = enPath) {
  const trUrl = trPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${trPath}/`;
  const enUrl = enPath === '/' ? `${SITE_URL}/en/` : `${SITE_URL}/en${enPath}/`;
  const arUrl = arPath === '/' ? `${SITE_URL}/ar/` : `${SITE_URL}/ar${arPath}/`;
  return { tr: trUrl, en: enUrl, ar: arUrl };
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function createEntry({ tr, en, ar, priority = '0.7', changefreq = 'weekly' }) {
  const lastmod = new Date().toISOString().split('T')[0];
  const hreflangLinks = SUPPORTED_LOCALES.map(
    (locale) =>
      `<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml({ tr, en, ar }[locale])}"/>`
  ).join('\n    ');

  return `
  <url>
    <loc>${escapeXml(tr)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    ${hreflangLinks}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(tr)}"/>
  </url>`;
}

const entries = [];

for (const [key, page] of Object.entries(staticPages)) {
  const urls = buildLocalizedUrls(page.slug.tr, page.slug.en, page.slug.ar);
  entries.push(
    createEntry({
      ...urls,
      priority: key === 'home' ? '1.0' : key === 'products' ? '0.9' : key === 'customPrint' ? '0.88' : '0.8',
      changefreq: key === 'home' ? 'daily' : 'weekly',
    })
  );
}

for (const category of Object.values(categories)) {
  const urls = buildLocalizedUrls(
    `/${category.slug.tr}`,
    `/${category.slug.en}`,
    `/${category.slug.ar ?? category.slug.en}`
  );
  entries.push(createEntry({ ...urls, priority: '0.85' }));

  const categoryProducts = products.filter((product) => product.type === category.type);

  for (const product of categoryProducts) {
    if (!product.variantSlug) continue;

    const arVariant = product.variantSlug.ar ?? product.variantSlug.en;
    const productUrls = buildLocalizedUrls(
      `/${category.slug.tr}/${product.variantSlug.tr}`,
      `/${category.slug.en}/${product.variantSlug.en}`,
      `/${category.slug.ar ?? category.slug.en}/${arVariant}`
    );
    entries.push(createEntry({ ...productUrls, priority: '0.75' }));
  }
}

for (const product of products.filter((item) => !item.variantSlug)) {
  const urls = buildLocalizedUrls(
    `/urunlerimiz/${product.slug.tr}`,
    `/products/${product.slug.en}`,
    `/products/${product.slug.ar ?? product.slug.en}`
  );
  entries.push(createEntry({ ...urls, priority: '0.75' }));
}

const blogUrls = buildLocalizedUrls('/blog', '/blog', '/blog');
entries.push(createEntry({ ...blogUrls, priority: '0.8' }));

for (const post of blogPosts) {
  const urls = buildLocalizedUrls(`/blog/${post.slug.tr}`, `/blog/${post.slug.en}`, `/blog/${post.slug.en}`);
  entries.push(createEntry({ ...urls, priority: '0.7', changefreq: 'monthly' }));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
writeFileSync(path.join(__dirname, '../public/robots.txt'), robots);

console.log(`Generated sitemap with ${entries.length} URLs and robots.txt.`);
