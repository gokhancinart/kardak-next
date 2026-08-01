import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { products } from '../../../data/products.mjs';
import ProductList from 'components/ProductList';
import SeoHead from 'components/SeoHead';

export default function ProductsPage() {
  const { t, i18n } = useTranslation('common');
  const currentLocale = i18n.language;

  const customOrder4oz = [13, 10, 12, 9];

  return (
    <>
      <SeoHead
        pathname="/products"
        locale={currentLocale}
        title={t('products.seo.title')}
        description={t('products.seo.description')}
      />

      <div className="container">
        <div id={t('navbar.paper-cups-4oz-slug')} className="relative scroll-mt-[110px] pt-8">
          <ProductList
            title={t('products.title_papercups_4oz')}
            products={products
              .filter(product => product.type === "4oz" && product.featured === true)
              .sort((a, b) => customOrder4oz.indexOf(a.id) - customOrder4oz.indexOf(b.id))
            }
            locale={currentLocale}
          />
        </div>
        <div id={t('navbar.paper-cups-7oz-slug')} className="relative scroll-mt-[110px]">
          <ProductList
            title={t('products.title_papercups_7oz')}
            products={products.filter(
              product => product.type === "7oz" && product.featured === true && !product.brandedCustomPrint
            )}
            locale={currentLocale}
          />
        </div>
        <div id={t('navbar.paper-cups-8oz-slug')} className="relative scroll-mt-[110px]">
          <ProductList
            title={t('products.title_papercups_8oz')}
            products={products
              .filter(product => product.type === "8oz" && product.featured === true)
            }
            locale={currentLocale}
          />
        </div>
        <div id={t('navbar.bolw-16oz-slug')} className="relative scroll-mt-[110px]">
          <ProductList
            title={t('products.title_bowl')}
            products={products
              .filter(product => product.type === "soup" && product.featured === true)
            }
            locale={currentLocale}
          />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      products: products,
    },
  };
}
