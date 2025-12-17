import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

// Mock data
const mockProducts = [
  {
    id: 1,
    name: 'Футболка "Тризуб"',
    slug: 'tshirt-tryzub',
    price: 850,
    images: null,
    category: { name: 'Одяг', slug: 'clothing' },
    inStock: true,
  },
  {
    id: 2,
    name: 'Чашка "Слава Україні"',
    slug: 'mug-slava-ukraini',
    price: 350,
    images: null,
    category: { name: 'Аксесуари', slug: 'accessories' },
    inStock: true,
  },
  {
    id: 3,
    name: 'Худі "Київ"',
    slug: 'hoodie-kyiv',
    price: 1450,
    images: null,
    category: { name: 'Одяг', slug: 'clothing' },
    inStock: true,
  },
  {
    id: 4,
    name: 'Шопер "Вишиванка"',
    slug: 'tote-vyshyvanka',
    price: 450,
    images: null,
    category: { name: 'Аксесуари', slug: 'accessories' },
    inStock: false,
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наш <span className="text-amber-400">магазин</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Брендована продукція з українською символікою
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/30 transition-all"
            >
              {/* Image */}
              <div className="aspect-square bg-slate-700 relative overflow-hidden">
                {product.images ? (
                  <Image
                    src={product.images}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-blue-500/20">
                    <span className="text-6xl">🛍️</span>
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                    <span className="text-white font-medium">Немає в наявності</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs text-amber-400 font-medium">
                  {product.category.name}
                </span>
                <h2 className="text-lg font-semibold text-white mt-1 group-hover:text-amber-400 transition-colors">
                  {product.name}
                </h2>
                <p className="text-xl font-bold text-white mt-2">
                  {product.price} <span className="text-sm text-slate-400">грн</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

