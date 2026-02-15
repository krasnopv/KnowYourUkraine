import Link from 'next/link';
import Image from 'next/image';
import { getHomepage, getPage } from '@/lib/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

type HomepageData = {
  heroImage?: { data?: { attributes?: { url?: string; alternativeText?: string } } };
  heroTitle?: string;
  heroSubtitleLines?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  aboutTitle?: string;
  aboutHeading?: string;
  aboutItems?: string[];
  aboutPromise?: string;
  statsTitle?: string;
  stats?: { num: string; label: string }[];
  cyclesTitle?: string;
  cycles?: { name: string; href: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
};

const defaults: HomepageData = {
  heroTitle: 'ЗНАЙ СВОЮ УКРАЇНУ',
  heroSubtitleLines: 'онлайн-курс\nпро українську\nтрадиційну\nкультуру',
  heroCtaText: 'ПЕРЕЙТИ ДО КУРСУ',
  heroCtaLink: '/blog',
  aboutTitle: 'Про курс',
  aboutHeading: 'Цей онлайн-курс для тебе, якщо ти:',
  aboutItems: [
    'цікавишся усім навколо і хочеш дізнаватися більше про себе, своїх предків та Україну',
    'хочеш вивчати українські традиції та культуру без нудних підручників',
    'хочеш дізнатися, як знання про український фольклор допоможуть вразити друзів та іноземців',
    'сумніваєшся, що українська культура може бути цікавою й сучасною',
  ],
  aboutPromise:
    'Обіцяємо: ти точно відкриєш для себе багато нового, а потім ще захочеш поділитися посиланням на курс із друзями.',
  statsTitle: 'Що тебе очікує в курсі?',
  stats: [
    { num: '4', label: 'святкові цикли (Різдвяний, Великодній, Купальський та Покровський)' },
    { num: '20', label: 'майстер-класів' },
    { num: '32', label: 'основні відеолекції' },
    { num: '∞', label: 'натхнення' },
  ],
  cyclesTitle: 'Всі цикли',
  cycles: [
    { name: 'Різдво', href: '/blog' },
    { name: 'Великдень', href: '/blog' },
    { name: 'Купала', href: '/blog' },
    { name: 'Покрова', href: '/blog' },
  ],
  ctaTitle: "Зв'яжіться з нами!",
  ctaSubtitle: 'Пишіть нам або перейдіть до курсу.',
  ctaPrimaryText: 'Написати',
  ctaPrimaryLink: '/contact',
  ctaSecondaryText: 'Перейти до курсу',
  ctaSecondaryLink: '/blog',
};

export async function generateMetadata() {
  try {
    const res = await getPage('homepage');
    const page = Array.isArray(res?.data) ? res.data[0] : res?.data;
    const p = page as { seoTitle?: string; seoDescription?: string; title?: string } | undefined;
    if (p?.seoTitle || p?.seoDescription) {
      return {
        title: p.seoTitle ?? p.title,
        description: p.seoDescription ?? undefined,
      };
    }
  } catch {
    // ignore
  }
  return {
    title: 'Know Your Ukraine | Освітня організація',
    description: 'Освітня організація, що популяризує українську культуру, історію та традиції.',
  };
}

export default async function HomePage() {
  let raw: { data?: HomepageData | null } | null = null;
  try {
    raw = await getHomepage();
  } catch (e) {
    // use defaults if CMS unavailable
  }
  const d = { ...defaults, ...(raw?.data ?? {}) } as HomepageData;

  const subtitleLines = (d.heroSubtitleLines ?? defaults.heroSubtitleLines!)
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const heroImageUrl = d.heroImage?.data?.attributes?.url;
  const fullHeroImageUrl = heroImageUrl
    ? heroImageUrl.startsWith('http')
      ? heroImageUrl
      : `${STRAPI_URL}${heroImageUrl}`
    : null;
  const aboutItems = Array.isArray(d.aboutItems) ? d.aboutItems : defaults.aboutItems!;
  const stats = Array.isArray(d.stats) ? d.stats : defaults.stats!;
  const cycles = Array.isArray(d.cycles) ? d.cycles : defaults.cycles!;

  return (
    <>
      {/* Hero – EdEra-style: image left, title + subtitle + CTA right; light theme */}
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-stretch overflow-hidden bg-white">
        <div className="relative z-10 flex-1 flex flex-col md:flex-row min-h-0 border-b border-slate-200">
          {/* Left: image or gradient placeholder */}
          <div className="w-full md:w-2/5 min-h-[40vh] md:min-h-0 bg-slate-100 flex items-center justify-center">
            {fullHeroImageUrl ? (
              <div className="relative w-full h-full min-h-[300px] md:min-h-0 md:absolute inset-0">
                <Image
                  src={fullHeroImageUrl}
                  alt={d.heroImage?.data?.attributes?.alternativeText || d.heroTitle || 'Hero'}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            ) : (
              <div className="text-6xl md:text-8xl opacity-30 select-none">🇺🇦</div>
            )}
          </div>
          {/* Right: title, subtitle, CTA */}
          <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-16 md:pl-12 lg:pl-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 uppercase">
              {d.heroTitle ?? defaults.heroTitle}
            </h1>
            <div className="mt-6 space-y-1 text-xl md:text-2xl text-slate-600">
              {subtitleLines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href={d.heroCtaLink ?? defaults.heroCtaLink!}
                className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
              >
                {d.heroCtaText ?? defaults.heroCtaText}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About course */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{d.aboutTitle}</h2>
          <h3 className="text-xl text-blue-600 font-medium mb-8">{d.aboutHeading}</h3>
          <ul className="text-left space-y-4 text-slate-600 mb-8">
            {aboutItems.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-500 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-500 italic">{d.aboutPromise}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">{d.statsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600">{s.num}</div>
                <div className="mt-2 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cycles */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-10">{d.cyclesTitle}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {cycles.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                className="px-6 py-3 rounded-xl border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">{d.ctaTitle}</h2>
          <p className="text-slate-500 mb-8">{d.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={d.ctaPrimaryLink ?? defaults.ctaPrimaryLink!}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              {d.ctaPrimaryText}
            </Link>
            <Link
              href={d.ctaSecondaryLink ?? defaults.ctaSecondaryLink!}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
            >
              {d.ctaSecondaryText}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
