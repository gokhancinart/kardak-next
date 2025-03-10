import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';
import NavLink from './NavLink';
import Image from 'next/image';
import Logo from '../public/assets/images/logo.svg';
import LogoNegative from '../public/assets/images/logo-negative.svg';

import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }) {

  const { t } = useTranslation('common');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col ${nunito.className}`} style={{ paddingTop: '108px' }}>

      <nav className="navbar bg-white_transparent fixed top-0 z-50 bg-white w-full py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Sol Kısım */}
          <div className="flex items-center">
            <Link href="/" className="-ml-7">
              <Image src={Logo} alt="Kardak Logo" width={220} height={100} />
            </Link>
          </div>
          {/* Menü */}
          <div className="hidden text-lg md:flex space-x-8 font-bold [&>a]:py-2 [&>a]:mx-4 [&>a:hover]:text-blue [&>a:hover]:border-blue [&>a]:transition-all [&>a]:duration-300">
            <NavLink href="/">{t('navbar.home')}</NavLink>
            <NavLink href="/about">{t('navbar.about')}</NavLink>
            <NavLink href="/products">{t('navbar.products')}</NavLink>
            <NavLink href="/contact">{t('navbar.contact')}</NavLink>
          </div>
          {/* Sağ Kısım */}
          <div className="flex items-center">
            <div className="md:flex mr-3 font-bold [&>a]:mx-2">
              <Link href="/" locale="tr">TR</Link>
              <span>|</span>
              <Link href="/" locale="en">EN</Link>
            </div>
            <div className="md:hidden flex">
              <button onClick={toggleMenu} className="text-black">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobil Menü - Push Menü */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black opacity-15 z-40" onClick={toggleMenu}></div>
        )}
        <div className={`fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <button onClick={toggleMenu} className="absolute top-4 right-4 bg-black_transparent rounded-full p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="flex flex-col p-6">
            <h4 className="text-xl font-bold text-white">KARDAK</h4>
          </div>
          <div className="flex flex-col space-y-4 p-6 text-white">
            <NavLink href="/">{t('navbar.home')}</NavLink>
            <NavLink href="/about">{t('navbar.about')}</NavLink>
            <NavLink href="/products">{t('navbar.products')}</NavLink>
            <NavLink href="/contact">{t('navbar.contact')}</NavLink>
          </div>
          {/* Alt Kısım - İletişim Bilgileri ve Dil Seçimi */}
          <div className="absolute bottom-4 left-4 text-left space-y-2">
            <p className="text-sm">📞 +90 555 555 5555</p>
            <p className="text-sm">✉️ info@kardak.com</p>
            {/* Dil Seçici */}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="bg-gray-900 py-12">
        <div className="container max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between">
          {/* Logo and Description */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <Link href="/">
              <Image src={LogoNegative} alt="Kardak Logo" width={220} height={100} className="-ml-7" />
            </Link>
            <p className="text-gray-300 mt-4 mr-4">{t('footer.sub_title')}</p>
          </div>

          {/* Links Section */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Menu */}
            <div>
              <h3 className="text-white font-semibold mb-4">Menü</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Hizmetlerimiz</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-white font-semibold mb-4">Ürünlerimiz</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-gray-500">-</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">İletişim</h3>
              <span className="text-gray-400">Adres</span>
            </div>
          </div>
        </div>

        {/* Social Icons and Copyright */}
        <div className="container max-w-7xl mx-auto mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row md:justify-between">
          <div className="text-gray-300 flex space-x-4 mb-4 md:mb-0">
            <span>Social Icons</span>
          </div>
          <p className="text-gray-300 text-sm">{t('footer.reserved')}</p>
        </div>
      </footer>

    </div>
  );
}