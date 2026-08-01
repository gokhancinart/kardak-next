import { createVariantPage } from '../../../lib/toptanPages';
import {
  createVariantStaticPaths,
  createVariantStaticProps,
} from '../../../lib/toptanStaticProps';

const CATEGORY_KEY = '4oz';

export default createVariantPage(CATEGORY_KEY);
export const getStaticPaths = createVariantStaticPaths(CATEGORY_KEY);
export const getStaticProps = createVariantStaticProps(CATEGORY_KEY);
