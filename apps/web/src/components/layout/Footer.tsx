import Link from 'next/link';

const footerLinks = {
  navigation: [
    { name: 'Про нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Магазин', href: '/shop' },
    { name: 'Партнери', href: '/partners' },
  ],
  social: [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'YouTube', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-amber-500/20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-xl">🇺🇦</span>
              </div>
              <span className="text-xl font-bold text-white">
                Know Your <span className="text-amber-400">Ukraine</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-400">
              Освітня організація, що популяризує українську культуру та історію.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Навігація
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
              Соціальні мережі
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Know Your Ukraine. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}

