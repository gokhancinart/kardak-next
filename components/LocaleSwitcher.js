import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { getLocaleSwitchHref } from '../lib/routes';
import { SUPPORTED_LOCALES } from '../lib/locales.mjs';

const LOCALE_LABELS = {
  tr: 'TR',
  en: 'EN',
  ar: 'AR',
};

export default function LocaleSwitcher({ className }) {
  const router = useRouter();
  const currentLocale = router.locale || 'tr';

  const switchContext = {
    asPath: router.asPath,
    pathname: router.pathname,
    query: router.query,
  };

  return (
    <div className={clsx('font-bold flex items-center gap-1', className)}>
      {SUPPORTED_LOCALES.map((locale, index) => (
        <span key={locale} className="inline-flex items-center">
          {index > 0 && <span className="mx-1">|</span>}
          <Link
            href={getLocaleSwitchHref(switchContext, locale)}
            locale={false}
            className={clsx(currentLocale === locale && 'text-kardak')}
            aria-current={currentLocale === locale ? 'true' : undefined}
          >
            {LOCALE_LABELS[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
