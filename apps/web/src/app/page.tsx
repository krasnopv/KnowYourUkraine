import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="block text-white">Пізнай свою</span>
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Україну
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-300">
            Освітня платформа, що відкриває багатство української культури, 
            історії та традицій для світу.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-semibold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/25"
            >
              Дізнатися більше
            </Link>
            <Link
              href="/shop"
              className="px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/10 transition-all"
            >
              Наш магазин
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Що ми <span className="text-amber-400">пропонуємо</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Освітні програми',
                description: 'Курси та матеріали про українську історію, культуру та мову.',
                icon: '📚',
              },
              {
                title: 'Брендований мерч',
                description: 'Унікальна продукція з українською символікою та дизайном.',
                icon: '🛍️',
              },
              {
                title: 'Партнерські проєкти',
                description: 'Співпраця з організаціями для популяризації України у світі.',
                icon: '🤝',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Приєднуйтесь до нашої спільноти
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Підпишіться на наші новини та будьте в курсі останніх подій.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
            >
              Підписатися
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
