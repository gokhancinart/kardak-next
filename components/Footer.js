import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { products } from '../data/products';
import LogoNegative from '../public/assets/images/logo-negative.svg'

// icons

import { FaFacebookSquare, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Footer() {

  const { t } = useTranslation('common');

  const router = useRouter();
  const currentLocale = router.locale || 'tr';

  // Products içerisinde featured değeri true olan ilk 4 ürünü al
  const featuredProducts = products.filter(product => product.featured).slice(0, 4);

  return (
    <div>
      <footer className="bg-kardak-dark py-12">
        <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between">
          {/* Logo and Description */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <Link href="/">
              <Image src={LogoNegative} alt="Kardak Logo" width={220} className="-ml-7" />
            </Link>
            <p className="text-gray-300 mt-4 mr-4">{t('footer.description')}</p>
          </div>

          {/* Links Section */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Menu */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.menu_title.menu')}</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-gray-500">{t('navbar.home')}</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-gray-500">{t('navbar.about')}</Link></li>
                <li><Link href="/products" className="text-gray-400 hover:text-gray-500">{t('navbar.products')}</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-gray-500">{t('navbar.contact')}</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.menu_title.our_service')}</h3>
              <ul className="space-y-2">
                <li><Link href="/paper-sales" className="text-gray-400 hover:text-gray-500">{t('footer.our_service.paper_sales')}</Link></li>
                <li><Link href="/printing-and-cutting-services" className="text-gray-400 hover:text-gray-500">{t('footer.our_service.printing_and_cutting_services')}</Link></li>
                <li><Link href="/cup-production" className="text-gray-400 hover:text-gray-500">{t('footer.our_service.cup_production')}</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.menu_title.our_products')}</h3>
              <ul className="space-y-2">
                {featuredProducts.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug[currentLocale]}`}
                      locale={currentLocale}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {product.name[currentLocale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.menu_title.contact')}</h3>
              <span className="text-gray-400">{ t('contact.contact-detail.address') }</span>
            </div>
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="container max-w-7xl mx-auto mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:justify-between">
          <div className="text-gray-300 flex space-x-4 mb-4 md:mb-0">
            <Link target='_blank' href="https://www.facebook.com/kardakcup">
              <FaFacebookSquare className="text-2xl" />
            </Link>
            <Link target='_blank' href="https://www.linkedin.com/company/kardak/">
              <FaLinkedin className="text-2xl" />
              </Link>
            <Link target='_blank' href="https://www.instagram.com/kardakcup/">
              <FaInstagram className="text-2xl" />
              </Link>
            <Link href="/">
              <FaYoutube className="text-2xl" />
            </Link>
          </div>
          <p className="text-gray-300 text-sm">{t('footer.reserved')}</p>
        </div>
      </footer>
    </div>
  );
}
