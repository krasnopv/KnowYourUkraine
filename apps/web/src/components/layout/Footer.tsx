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
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xl">🇺🇦</span>
              </div>
              <span className="text-xl font-bold text-slate-800">
                Know Your <span className="text-blue-600">Ukraine</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              Освітня організація, що популяризує українську культуру та історію.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Навігація
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Соціальні мережі
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-center text-sm text-slate-400">
            © {new Date().getFullYear()} Know Your Ukraine. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
