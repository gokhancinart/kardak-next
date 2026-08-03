import Link from 'next/link';
import Image from 'next/image';

import { LiaWhatsapp } from 'react-icons/lia';
import { HiOutlineCursorClick } from 'react-icons/hi';

const MOBILE_CUPS = [
  { src: '/assets/images/cups/7oz/7oz-cizgi-karton-bardak.webp', alt: '7oz-cizgi-karton-bardak' },
  { src: '/assets/images/cups/7oz/7oz-yildiz-karton-bardak.webp', alt: '7oz-yildiz-karton-bardak' },
  { src: '/assets/images/cups/7oz/7oz-togo-karton-bardak.webp', alt: '7oz-togo-karton-bardak' },
];

const DESKTOP_CUP_COLUMNS = [
  [
    { src: '/assets/images/cups/7oz/7oz-coffee-karton-bardak.webp', alt: '7oz-coffee-karton-bardak' },
    { src: '/assets/images/cups/7oz/7oz-yildiz-karton-bardak.webp', alt: '7oz-yildiz-karton-bardak' },
  ],
  [
    { src: '/assets/images/cups/7oz/7oz-cizgi-karton-bardak.webp', alt: '7oz-cizgi-karton-bardak' },
    { src: '/assets/images/cups/7oz/7oz-togo-karton-bardak.webp', alt: '7oz-togo-karton-bardak' },
    { src: '/assets/images/cups/7oz/7oz-petek-karton-bardak.webp', alt: '7oz-petek-karton-bardak' },
  ],
  [
    { src: '/assets/images/cups/7oz/7oz-coffee-renkli-karton-bardak.webp', alt: '7oz-coffee-renkli-karton-bardak' },
    { src: '/assets/images/cups/7oz/7oz-kraft-karton-bardak.webp', alt: '7oz-kraft-karton-bardak' },
  ],
];

function MobileCupGallery() {
  return (
    <div className="flex items-end justify-center gap-x-3 lg:hidden">
      {MOBILE_CUPS.map((cup) => (
        <div key={cup.alt} className="h-44 w-28 shrink-0 overflow-hidden rounded-lg sm:h-48 sm:w-32">
          <Image width={176} height={256} alt={cup.alt} src={cup.src} className="size-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function DesktopCupGallery() {
  return (
    <div className="hidden items-center gap-x-6 lg:flex lg:gap-x-8">
      {DESKTOP_CUP_COLUMNS.map((column, columnIndex) => (
        <div key={columnIndex} className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
          {column.map((cup) => (
            <div key={cup.alt} className="h-64 w-44 overflow-hidden rounded-lg">
              <Image width={176} height={256} alt={cup.alt} src={cup.src} className="size-full object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Promo({ title, description, button, buttonLink, whatsapp, whatsappUrl }) {
  return (
    <div className="relative overflow-hidden bg-kardak lg:h-[720]">
      <div className="absolute z-0 inset-0 bg-black opacity-50">
        <div
          className="absolute inset-0"
          style={{
            background: `
            radial-gradient(circle, rgba(44, 94, 169, 0.2) 1px, transparent 1px) 0 0,
            radial-gradient(circle, rgba(44, 94, 169, 0.2) 1px, transparent 1px) 6px 6px
          `,
            backgroundSize: '10px 10px',
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-12 sm:px-6 sm:py-16 md:flex md:min-h-[560px] md:items-center md:justify-center lg:block lg:min-h-0 lg:px-8 lg:py-40">
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:justify-center lg:block lg:min-h-[520px] lg:items-stretch lg:gap-10">
          <div className="relative z-10 w-full max-w-lg md:mx-auto md:text-center lg:absolute lg:inset-y-0 lg:mx-0 lg:start-0 lg:flex lg:flex-col lg:justify-center lg:text-start">
            <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl">{title}</h1>
            <p className="mt-4 text-xl text-gray-400">{description}</p>

            <div className="mt-8 flex flex-row flex-wrap justify-center gap-3 md:justify-center lg:mt-10 lg:justify-start">
              <Link
                href={whatsappUrl}
                className="inline-flex flex-1 min-w-[9.5rem] items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-green-600 sm:flex-none sm:px-8 sm:text-base"
              >
                <LiaWhatsapp className="me-2 h-5 w-5 shrink-0 text-white sm:h-6 sm:w-6" />
                {whatsapp}
              </Link>
              <Link
                href={buttonLink}
                className="inline-flex flex-1 min-w-[9.5rem] items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-center text-sm font-bold text-kardak shadow-md hover:bg-gray-200 sm:flex-none sm:px-8 sm:text-base"
              >
                <HiOutlineCursorClick className="me-2 h-5 w-5 shrink-0 text-kardak" />
                {button}
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none flex w-full justify-center lg:absolute lg:inset-y-0 lg:end-0 lg:start-auto lg:w-auto lg:items-center"
          >
            <MobileCupGallery />
            <DesktopCupGallery />
          </div>
        </div>
      </div>
    </div>
  );
}
