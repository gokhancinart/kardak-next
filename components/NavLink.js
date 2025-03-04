import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

export default function NavLink({ href, children }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'border-b-2 transition-colors duration-200',
        {
          'text-blue-950 border-primary pointer-events-none': isActive,
          'text-gray-900 hover:text-secondary border-transparent hover:border-secondary': !isActive
        }
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}