import ToptanCategoryHub from '../components/ToptanCategoryHub';
import ToptanProductDetail from '../components/ToptanProductDetail';

export function createCategoryIndexPage(categoryKey) {
  return function CategoryIndexPage({ categoryProducts }) {
    return (
      <ToptanCategoryHub categoryKey={categoryKey} categoryProducts={categoryProducts} />
    );
  };
}

export function createVariantPage(categoryKey) {
  return function VariantPage({ product }) {
    return <ToptanProductDetail categoryKey={categoryKey} product={product} />;
  };
}
