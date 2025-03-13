import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';


export default function About() {
  const { t } = useTranslation('common');

  const aboutContent = t("about.content", { returnObjects: true });
  const router = useRouter();

  // ✅ DOMPurify'ı sadece client-side'da yükle
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{t('home.seo.title')}</title>
        <meta name="description" content={t('home.seo.description')} />

        {/* Canonical URL (Dinamik ve Dil Desteğiyle) */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}${router.asPath}`.replace(/([^:]\/)\/+/g, "$1")}
        />

        {/* Favicon (Absolute Path ile) */}
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/favicon.ico`}
        />

        {/* Open Graph Etiketleri */}
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/${router.locale}${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('about.seo.title')} />
        <meta property="og:description" content={t('about.seo.description')} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/logo.png`}
        />
      </Head>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-kardak">{t('about.title')}</h1>
            {isClient && aboutContent.map((text, index) => (
              <div key={index}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: require('dompurify').sanitize(text)
                  }}
                />
                <br />
              </div>
            ))}
          </div>

          {/* Right Side - Image */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Link href="/products">
              <Image
                src="/assets/images/printandcut/karton-bardak-baski-ve-kesim.webp"
                alt="Karton bardak baskı ve kesim renkli"
                width={300}
                height={300}
                className="rounded-xl object-cover w-full h-48"
              />
            </Link>
            <Link href="/products">
              <Image
                src="/assets/images/cups/yildiz-desen-karton-bardak.webp"
                alt="Yıldız desen karton bardak 7oz"
                width={300}
                height={300}
                className="rounded-xl object-cover object-bottom  w-full h-48"
              />
            </Link>
            <Link href="/products">
              <Image
                src="/assets/images/paper-roll/paper-roll.webp"
                alt="PE kaplamalı kağıt satış"
                width={300}
                height={300}
                className="rounded-xl object-cover w-full h-48"
              />
            </Link>
            <Link href="/products">
              <Image
                src="/assets/images/paper-roll/base-paper.webp"
                alt="About image 4"
                width={300}
                height={300}
                className="rounded-xl object-cover w-full h-48"
              />
            </Link>
          </div>
        </div>
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