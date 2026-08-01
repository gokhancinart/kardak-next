import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

import { getPageUrl, isPageActive } from '../lib/routes';

export default function NavLink({ href, page, children }) {
  const router = useRouter();
  const locale = router.locale || 'tr';
  const linkHref = page ? getPageUrl(page, locale) : href;
  const isActive = page ? isPageActive(page, router.pathname) : router.pathname === href;

  return (
    <Link
      href={linkHref}
      className={clsx(
        'border-b-2 transition-colors duration-200',
        {
          'text-white md:text-blue-950 border-primary pointer-events-none': isActive,
          'text-white md:text-gray-900 hover:text-secondary border-transparent hover:border-secondary': !isActive,
        }
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}
