import Link from "next/link"
import { LiaWhatsapp } from "react-icons/lia";
import Image from "next/image";


export default function Promo({title, description, btn, btnLink}) {
  return (
    <div className="relative overflow-hidden bg-kardak h-[720]">
      <div className="absolute z-0 inset-0 bg-black opacity-50">
        {/* Noktalar için arka plan */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle, rgba(44, 94, 169, 0.2) 1px, transparent 1px) 0 0,
            radial-gradient(circle, rgba(44, 94, 169, 0.2) 1px, transparent 1px) 6px 6px
          `,
          backgroundSize: '10px 10px' // Noktaların boyutunu ve aralığını
        }} />
      </div>
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40 z-10 relative h-[100%]">
        <div className="relative mx-auto flex flex-col max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-xl text-gray-400">
              {description}
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          width={176}
                          height={256}
                          alt="coffee-yazili-karton-bardak"
                          src="/assets/images/cups/coffee-yazili-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt="yildiz-desen-karton-bardak"
                          src="/assets/images/cups/yildiz-desen-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}  
                          alt="simitci-dunyasi-karton-bardak"
                          src="/assets/images/cups/simitci-dunyasi-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256} 
                          alt="turuncu-siyah-karton-bardak"
                          src="/assets/images/cups/turuncu-siyah.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256} 
                          alt="sehir-hatlari-karton-bardak"
                          src="/assets/images/cups/sehir-hatlari-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256} 
                          alt="lavazza-karton-bardak"
                          src="/assets/images/cups/lavazza-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256} 
                          alt="kraft-karton-bardak"
                          src="/assets/images/cups/kraft-karton-bardak.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href={btnLink}
                className="relative inline-flex rounded-md border border-transparent bg-green-500 shadow-md px-8 py-3 text-center font-bold text-white hover:bg-green-600 hover:text-blue"
              >
                <LiaWhatsapp className="h-6 w-6 text-white mr-2" />
                {btn}
                {/* <HiOutlineCursorClick className="h-5 w-5 text-blue-500 ml-2 absolute right-3 top-4" /> */}
                
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}