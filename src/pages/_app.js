import { appWithTranslation } from 'next-i18next';
import Layout from '../../components/Layout';
import Script from 'next/script';
import '../styles/globals.css';

import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-TL7JRTV9EM"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TL7JRTV9EM', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <Component {...pageProps} />
      <SpeedInsights/>
    </Layout>
  );
}

export default appWithTranslation(MyApp);