import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRef } from 'react';

export default function About() {
  const { t } = useTranslation('common');

  const aboutContent = t("about.content", { returnObjects: true });
  const router = useRouter();

  // ✅ DOMPurify'ı sadece client-side'da yükle
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.log('iOS oynatma hatası:', err);
        }
      }
    };

    playVideo();
  }, []);

  return (
    <>
      <Head>
        <title>{t('about.seo.title')}</title>
        <meta name="description" content={t('about.seo.description')} />

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
          <div className="grid grid-cols-1 gap-4 w-full rounded-lg overflow-hidden">
            <div className="relative w-full">
              <div className="aspect-w-4 aspect-h-3">
                <video
                  ref={videoRef}
                  controls={false}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}/assets/videos/world.mp4`}
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
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