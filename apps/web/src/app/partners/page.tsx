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
    <div className="min-h-screen py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Наші <span className="text-blue-600">партнери</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Організації, з якими ми співпрацюємо для популяризації України
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
            >
              {/* Logo */}
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-contain" />
                ) : (
                  <span className="text-3xl">🤝</span>
                )}
              </div>

              {/* Info */}
              <h2 className="text-xl font-semibold text-slate-800 mb-2">{partner.name}</h2>
              <p className="text-slate-600 text-sm mb-4">{partner.description}</p>

              {/* Website */}
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Відвідати сайт →
              </a>

              {/* Project Links */}
              {partner.projectLinks && partner.projectLinks.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h3 className="text-xs uppercase text-slate-500 font-medium mb-2">Спільні проєкти</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.projectLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
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
        <div className="mt-16 text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Хочете стати партнером?</h2>
          <p className="text-slate-600 mb-6">
            Ми відкриті до співпраці з організаціями, які поділяють наші цінності
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          >
            Зв'язатися з нами
          </Link>
        </div>
      </div>
    </div>
  );
}

