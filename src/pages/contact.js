import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Contact() {
  const { t } = useTranslation('common');

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('contact.seo.title')}</title>
        <meta name="description" content={t('contact.seo.description')} />

        {/* Canonical URL (Dinamik ve Dil Desteğiyle) */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}`}
        />

        {/* Favicon (Absolute Path ile) */}
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`}
        />

        {/* Open Graph Etiketleri */}
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('contact.seo.title')} />
        <meta property="og:description" content={t('contact.seo.description')} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`}
        />
      </Head>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{t('navbar.contact')}</h1>
        <p className="text-lg">Contact content...</p>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}