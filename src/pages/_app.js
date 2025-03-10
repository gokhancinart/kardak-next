import { appWithTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import '../styles/globals.css';

import { Analytics } from "@vercel/analytics/react"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}

export default appWithTranslation(MyApp);