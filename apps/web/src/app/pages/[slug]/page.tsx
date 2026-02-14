import { notFound } from 'next/navigation';
import { getPage } from '@/lib/strapi';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: { type: string; children: { text: string }[] }[];
  excerpt?: string;
  publishedAt: string;
  featuredImage?: {
    data?: {
      attributes: {
        url: string;
        alternativeText?: string;
        width: number;
        height: number;
      };
    };
  };
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

// Convert Strapi blocks to HTML
function blocksToHtml(blocks: Page['content']): string {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      const text = block.children?.map((c) => c.text).join('') || '';
      switch (block.type) {
        case 'heading':
          return `<h2>${text}</h2>`;
        case 'paragraph':
          return `<p>${text}</p>`;
        default:
          return `<p>${text}</p>`;
      }
    })
    .join('');
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let pageData;

  try {
    pageData = await getPage(slug);
  } catch (error) {
    console.error('Failed to fetch page:', error);
    notFound();
  }

  const pages: Page[] = (pageData?.data as Page[]) || [];
  const page = pages[0];

  if (!page) {
    notFound();
  }

  const imageUrl = page.featuredImage?.data?.attributes?.url;
  const imageAlt = page.featuredImage?.data?.attributes?.alternativeText || page.title;
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
    : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <article className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {page.title}
          </h1>
          {page.excerpt && (
            <p className="text-xl text-slate-600">{page.excerpt}</p>
          )}
        </header>

        {/* Featured Image */}
        {fullImageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={fullImageUrl}
              alt={imageAlt}
              width={page.featuredImage?.data?.attributes?.width || 1200}
              height={page.featuredImage?.data?.attributes?.height || 600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        {page.content && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: blocksToHtml(page.content) }}
          />
        )}
      </article>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const pageData = await getPage(slug);
    const pages: Page[] = (pageData?.data as Page[]) || [];
    const page = pages[0];

    if (!page) {
      return {
        title: 'Page Not Found',
      };
    }

    return {
      title: page.seoTitle || page.title,
      description: page.seoDescription || page.excerpt,
      keywords: page.seoKeywords,
    };
  } catch {
    return {
      title: 'Page Not Found',
    };
  }
}


