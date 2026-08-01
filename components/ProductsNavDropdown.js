import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

import {
  getCategoryUrl,
  getCustomPrintLandingUrl,
} from '../lib/productHelpers';
import { getProductsListingUrl, isProductsNavActive } from '../lib/routes';

export default function ProductsNavDropdown({ mobile = false, onNavigate }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const locale = router.locale || 'tr';
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const isActive = isProductsNavActive(router.pathname);
  const productsUrl = getProductsListingUrl(locale);

  useEffect(() => {
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    if (mobile) return undefined;

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobile]);

  const handleLinkClick = () => {
    setOpen(false);
    onNavigate?.();
  };

  const menuItems = [
    {
      key: 'all',
      href: productsUrl,
      label: t('navbar.all_products'),
    },
    {
      key: '4oz',
      href: getCategoryUrl('4oz', locale),
      label: t('navbar.menu_4oz'),
    },
    {
      key: '7oz',
      href: getCategoryUrl('7oz', locale),
      label: t('navbar.menu_7oz'),
    },
    {
      key: '7oz-custom',
      href: getCustomPrintLandingUrl(locale),
      label: t('navbar.menu_custom_print'),
    },
    {
      key: '8oz',
      href: getCategoryUrl('8oz', locale),
      label: t('navbar.menu_8oz'),
    },
    {
      key: 'soup',
      href: getCategoryUrl('soup', locale),
      label: t('navbar.menu_bowl'),
    },
  ];

  const triggerClassName = clsx(
    'inline-flex items-center gap-1 font-bold transition-colors duration-200',
    mobile
      ? isActive
        ? 'text-white'
        : 'text-white/90'
      : isActive
        ? 'text-blue-950'
        : 'text-gray-900 hover:text-secondary'
  );

  if (mobile) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={clsx(triggerClassName, 'flex w-full items-center justify-between py-2 text-left')}
          aria-expanded={open}
        >
          {t('navbar.products')}
          <svg
            className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="mt-2 flex flex-col space-y-2 pl-3">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={handleLinkClick}
                className="text-sm text-white/80 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="group relative mx-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(triggerClassName, 'py-2')}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {t('navbar.products')}
        <svg
          className={clsx('h-4 w-4 transition-transform', open && 'rotate-180', 'group-hover:rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={clsx(
          'absolute left-0 top-full z-50 min-w-[300px] pt-2',
          open ? 'block' : 'hidden group-hover:block'
        )}
      >
        <div className="rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={handleLinkClick}
              className="block px-4 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:text-kardak"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
