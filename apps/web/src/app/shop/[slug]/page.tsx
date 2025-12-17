'use client';

import Link from 'next/link';
import { useState } from 'react';

// Mock data
const mockProduct = {
  name: 'Футболка "Тризуб"',
  slug: 'tshirt-tryzub',
  description: `
    <p>Стильна футболка з вишитим тризубом — символом української державності.</p>
    <ul>
      <li>100% бавовна</li>
      <li>Якісна вишивка</li>
      <li>Розміри: S, M, L, XL, XXL</li>
      <li>Колір: чорний, білий</li>
    </ul>
  `,
  price: 850,
  images: null,
  category: { name: 'Одяг', slug: 'clothing' },
  inStock: true,
  snipcartId: 'tshirt-tryzub',
};

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const product = mockProduct;

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад до магазину
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-slate-800 rounded-2xl overflow-hidden">
            {product.images ? (
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-blue-500/20">
                <span className="text-9xl">🛍️</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-amber-400 font-medium">{product.category.name}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-white mb-6">
              {product.price} <span className="text-lg text-slate-400">грн</span>
            </p>

            {/* Description */}
            <div
              className="prose prose-invert prose-amber mb-8
                prose-p:text-slate-300 prose-li:text-slate-300"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-400">Кількість:</span>
              <div className="flex items-center border border-slate-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white hover:bg-slate-700 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-white hover:bg-slate-700 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            {product.inStock ? (
              <button
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25
                  snipcart-add-item"
                data-item-id={product.snipcartId}
                data-item-name={product.name}
                data-item-price={product.price}
                data-item-url={`/shop/${product.slug}`}
                data-item-quantity={quantity}
              >
                Додати в кошик — {product.price * quantity} грн
              </button>
            ) : (
              <button
                disabled
                className="w-full py-4 bg-slate-700 text-slate-400 font-semibold rounded-lg cursor-not-allowed"
              >
                Немає в наявності
              </button>
            )}

            {/* Payment info */}
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-white font-medium mb-2">Способи оплати</h3>
              <div className="flex gap-4 text-slate-400 text-sm">
                <span>💳 LiqPay</span>
                <span>🌍 Snipcart</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

