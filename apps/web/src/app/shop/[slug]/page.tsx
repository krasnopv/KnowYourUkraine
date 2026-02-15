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
    <div className="min-h-screen py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад до магазину
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
            {product.images ? (
              <img
                src={product.images}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <span className="text-9xl">🛍️</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-blue-600 font-medium">{product.category.name}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-2 mb-4">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-slate-800 mb-6">
              {product.price} <span className="text-lg text-slate-500">грн</span>
            </p>

            {/* Description */}
            <div
              className="prose prose-slate mb-8 prose-p:text-slate-600 prose-li:text-slate-600"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-slate-600">Кількість:</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-slate-800 font-medium border-x border-slate-200">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            {product.inStock ? (
              <button
                className="w-full py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm snipcart-add-item"
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
                className="w-full py-4 bg-slate-200 text-slate-500 font-semibold rounded-xl cursor-not-allowed"
              >
                Немає в наявності
              </button>
            )}

            {/* Payment info */}
            <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-slate-800 font-medium mb-2">Способи оплати</h3>
              <div className="flex gap-4 text-slate-500 text-sm">
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

