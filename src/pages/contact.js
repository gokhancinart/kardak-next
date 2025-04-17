import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { TbClockHour8Filled } from "react-icons/tb";
import { FaLocationPin } from "react-icons/fa6";

export default function Contact() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const googleMaps = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3007.4063371861166!2d28.794522699999998!3d41.0819677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa58a440bf13b%3A0xc4024b3bfa86fdfb!2sTrios%202023!5e0!3m2!1str!2str!4v1732498634926!5m2!1str!2str"

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

      <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sol Taraf: İletişim Bilgileri */}
            <div className="overflow-hidden">
              <iframe
                src={googleMaps}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Sağ Taraf: Google Maps */}
            <div className="p-6">
              <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-kardak pb-4">{t('contact.title')}</h1>
              <h3 className='font-bold mb-4'>{t('contact.description')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3">
                    {/* Telefon İkonu */}
                    <FaPhoneSquareAlt className="text-2xl text-kardak"/>
                  </span>
                  <span>
                    <div>
                      <strong>{t('contact.contact-text.phone-text')}:</strong>{' '}
                      <a href={`tel:+9${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-kardak hover:underline">
                        {process.env.NEXT_PUBLIC_PHONE_NUMBER}
                      </a>
                    </div>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">
                    {/* Konum İkonu */}
                    <IoMail className="text-2xl text-kardak"/>
                  </span>
                  <span>
                    <strong>{t('contact.contact-text.mail-text')}:</strong>{' '}
                    <span className="text-gray-700">
                      <a href="mailto:info@kardakcup.com" className="text-kardak hover:underline">
                        info@kardakcup.com
                      </a>
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">
                    {/* Konum İkonu */}
                    <FaLocationPin className="text-2xl text-kardak" />
                  </span>
                  <span>
                    <strong>{t('contact.contact-text.address-text')}:</strong>{' '}
                    <span className="text-gray-700">
                    { t('contact.contact-detail.address') }
                    </span>
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3">
                    {/* Çalışma Saatleri İkonu */}
                    <TbClockHour8Filled className="text-2xl text-kardak" />
                  </span>
                  <span>
                    <strong>{t('contact.contact-text.working-text')}:</strong>{' '}
                    <span className="text-gray-700">{t('contact.contact-detail.working')}</span>
                  </span>
                </li>
              </ul>
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