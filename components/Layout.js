import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from './Footer';

import Logo from '../public/assets/images/logo.svg';
import LogoNegative from '../public/assets/images/logo-negative.svg';
import NavLink from './NavLink';
import ProductsNavDropdown from './ProductsNavDropdown';
import LocaleSwitcher from './LocaleSwitcher';
import { Nunito } from 'next/font/google';


const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }) {

  const { t } = useTranslation('common');

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Route değişince menüyü kapat
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return (
    <div className={`min-h-screen flex flex-col ${nunito.className}`} style={{ paddingTop: '108px' }}>

      <nav className="navbar bg-white_transparent fixed top-0 z-50 bg-white w-full py-3">
        <div className="container mx-auto flex justify-between items-center">
          {/* Sol Kısım */}
          <div className="flex items-center">
            <Link href="/" className="-ml-7">
              <Image src={Logo} alt="Kardak Logo" width={220} />
            </Link>
          </div>
          {/* Menü */}
          <div className="hidden text-lg md:flex space-x-8 font-bold [&>a]:py-2 [&>a]:mx-4 [&>a:hover]:text-blue [&>a:hover]:border-blue [&>a]:transition-all [&>a]:duration-300 items-center">
            <NavLink page="home">{t('navbar.home')}</NavLink>
            <NavLink page="about">{t('navbar.about')}</NavLink>
            <ProductsNavDropdown />
            <NavLink page="blog">{t('navbar.blog')}</NavLink>
            <NavLink page="contact">{t('navbar.contact')}</NavLink>
          </div>
          {/* Sağ Kısım */}
          <div className="flex items-center">
            <LocaleSwitcher className="md:flex mr-3" />
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
          <div className="fixed inset-0 bg-kardak opacity-15 z-40" onClick={toggleMenu}></div>
        )}
        <div className={`fixed top-0 left-0 h-full w-64 bg-kardak text-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <button onClick={toggleMenu} className="absolute top-4 right-4 bg-black_transparent rounded-full p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="flex flex-col p-6">
            <Link href="/" className="-ml-7">
              <Image src={LogoNegative} alt="Kardak Logo" width={220} height={82} />
            </Link>
          </div>
          <div className="flex flex-col space-y-4 p-6 text-white">
            <NavLink page="home">{t('navbar.home')}</NavLink>
            <NavLink page="about">{t('navbar.about')}</NavLink>
            <ProductsNavDropdown mobile onNavigate={() => setIsMenuOpen(false)} />
            <NavLink page="blog">{t('navbar.blog')}</NavLink>
            <NavLink page="contact">{t('navbar.contact')}</NavLink>
          </div>
          {/* Alt Kısım - İletişim Bilgileri ve Dil Seçimi */}
          <div className="absolute bottom-4 left-4 text-left space-y-2">
            <div>
              <Link href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`} className="text-sm">📞 {process.env.NEXT_PUBLIC_PHONE_NUMBER}</Link>
            </div>
            <div>
              <Link href={`mailto:info@kardak.com`} className="text-sm">✉️ info@kardak.com</Link>
            </div>
            {/* Dil Seçici */}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <Footer/>

    </div>
  );
}