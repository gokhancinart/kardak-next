/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.kardakcup.com', // kendi domain adresinizi yazın
  generateRobotsTxt: true, // robots.txt de otomatik oluşur
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [],
  alternateRefs: [
    {
      href: 'https://www.kardakcup.com',
      hreflang: 'tr',
    },
    {
      href: 'https://www.kardakcup.com/en',
      hreflang: 'en',
    },
  ],
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
  },
};

// npx next-sitemap
