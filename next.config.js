/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Alias ayarı ekleyin
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname + '/src';
    return config;
  },
  // Eğer i18n kullanıyorsanız (next-i18next ile)
  i18n: {
    locales: ['tr', 'en'],
    defaultLocale: 'tr',
  }
};

module.exports = nextConfig;