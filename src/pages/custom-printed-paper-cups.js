import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CustomPrintLanding from 'components/CustomPrintLanding';
import { getBrandedCustomPrintProducts } from '../../lib/productHelpers';

export default function CustomPrintedPaperCupsPage({ portfolioProducts }) {
  return <CustomPrintLanding portfolioProducts={portfolioProducts} />;
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      portfolioProducts: getBrandedCustomPrintProducts(),
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
