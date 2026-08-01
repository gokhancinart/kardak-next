import path from 'path';
import { fileURLToPath } from 'url';
import { toptanRedirects, enSlugRewrites, trLocaleRewrites } from './data/toptan-redirects.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  i18n: {
    locales: ['tr', 'en', 'ar'],
    defaultLocale: 'tr',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return toptanRedirects;
  },
  async rewrites() {
    return [...enSlugRewrites, ...trLocaleRewrites];
  },
};

export default nextConfig;
