// components/ProductList.js
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductList({ title, products, locale }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl pb-16 sm:pb-24 lg:max-w-7xl">
        <h2 className="text-2xl font-bold tracking-tight text-kardak">
          {title}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.id} className="group relative">
              <Link href={`/products/${product?.slug[locale]}`}>
                <Image
                  alt={product?.name[locale]}
                  src={product?.imageSrc}
                  width={300}
                  height={300}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </Link>
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">
                  <Link href={`/products/${product?.slug[locale]}`}>
                    <b>{product?.name[locale]}</b>
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {product?.size[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
