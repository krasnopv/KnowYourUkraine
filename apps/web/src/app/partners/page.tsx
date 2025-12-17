import Link from 'next/link';

const mockPartners = [
  {
    id: 1,
    name: 'Український культурний фонд',
    description: 'Державна установа, що підтримує культурні ініціативи',
    websiteUrl: 'https://ucf.in.ua',
    logo: null,
    projectLinks: [
      { title: 'Грантова програма', url: '#' },
      { title: 'Культурні події', url: '#' },
    ],
  },
  {
    id: 2,
    name: 'Prometheus',
    description: 'Освітня платформа з безкоштовними онлайн-курсами',
    websiteUrl: 'https://prometheus.org.ua',
    logo: null,
    projectLinks: [
      { title: 'Курси з історії', url: '#' },
    ],
  },
  {
    id: 3,
    name: 'Ukraїner',
    description: 'Медіа-проєкт про унікальність України',
    websiteUrl: 'https://ukrainer.net',
    logo: null,
    projectLinks: [
      { title: 'Експедиції', url: '#' },
      { title: 'Документальні фільми', url: '#' },
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наші <span className="text-amber-400">партнери</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Організації, з якими ми співпрацюємо для популяризації України
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 hover:border-amber-500/30 transition-all"
            >
              {/* Logo */}
              <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-contain" />
                ) : (
                  <span className="text-3xl">🤝</span>
                )}
              </div>

              {/* Info */}
              <h2 className="text-xl font-semibold text-white mb-2">{partner.name}</h2>
              <p className="text-slate-400 text-sm mb-4">{partner.description}</p>

              {/* Website */}
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
              >
                Відвідати сайт →
              </a>

              {/* Project Links */}
              {partner.projectLinks && partner.projectLinks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h3 className="text-xs uppercase text-slate-500 font-medium mb-2">Спільні проєкти</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.projectLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className="text-xs px-3 py-1 bg-slate-700 text-slate-300 rounded-full hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Хочете стати партнером?</h2>
          <p className="text-slate-400 mb-6">
            Ми відкриті до співпраці з організаціями, які поділяють наші цінності
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Зв'язатися з нами
          </Link>
        </div>
      </div>
    </div>
  );
}

