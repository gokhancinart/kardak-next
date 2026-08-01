import { createCategoryIndexPage } from '../../../lib/toptanPages';
import { createCategoryIndexStaticProps } from '../../../lib/toptanStaticProps';

const CATEGORY_KEY = '4oz';

export default createCategoryIndexPage(CATEGORY_KEY);
export const getStaticProps = createCategoryIndexStaticProps(CATEGORY_KEY);
