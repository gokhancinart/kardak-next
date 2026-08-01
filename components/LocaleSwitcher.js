import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { getLocaleSwitchHref } from '../lib/routes';

export default function LocaleSwitcher({ className }) {
  const router = useRouter();
  const currentLocale = router.locale || 'tr';

  const switchContext = {
    asPath: router.asPath,
    pathname: router.pathname,
    query: router.query,
  };

  return (
    <div className={clsx('font-bold [&>a]:mx-2', className)}>
      <Link
        href={getLocaleSwitchHref(switchContext, 'tr')}
        locale={false}
        className={clsx(currentLocale === 'tr' && 'text-kardak')}
        aria-current={currentLocale === 'tr' ? 'true' : undefined}
      >
        TR
      </Link>
      <span>|</span>
      <Link
        href={getLocaleSwitchHref(switchContext, 'en')}
        locale={false}
        className={clsx(currentLocale === 'en' && 'text-kardak')}
        aria-current={currentLocale === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
    </div>
  );
}
