import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import {
  getProductsByCategoryKey,
  findProductByVariant,
  getCategoryStaticPaths,
} from './productHelpers';
import { SUPPORTED_LOCALES } from './locales.mjs';

export function createCategoryIndexStaticProps(categoryKey) {
  return async function getStaticProps({ locale }) {
    const categoryProducts = getProductsByCategoryKey(categoryKey, {
      featuredOnly: false,
      excludeBrandedCustomPrint: categoryKey === '7oz',
    });

    return {
      props: {
        categoryKey,
        categoryProducts,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  };
}

export function createCategoryIndexStaticPaths() {
  return async function getStaticPaths() {
    return {
      paths: SUPPORTED_LOCALES.map((locale) => ({ params: {}, locale })),
      fallback: false,
    };
  };
}

export function createVariantStaticProps(categoryKey) {
  return async function getStaticProps({ locale, params }) {
    const { variant } = params;
    const product = findProductByVariant(categoryKey, variant, locale);

    if (!product) {
      return { notFound: true };
    }

    return {
      props: {
        categoryKey,
        product,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  };
}

export function createVariantStaticPaths(categoryKey) {
  return async function getStaticPaths() {
    return {
      paths: getCategoryStaticPaths(categoryKey),
      fallback: false,
    };
  };
}
