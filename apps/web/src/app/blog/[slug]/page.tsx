import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: { type: string; children: { text: string }[] }[];
  excerpt: string;
  publishedAt: string;
  author?: { name: string; bio?: string };
  categories?: { name: string; slug: string }[];
}

// Convert Strapi blocks to HTML
function blocksToHtml(blocks: BlogPost['content']): string {
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let postData;
  let relatedPostsData;

  try {
    [postData, relatedPostsData] = await Promise.all([
      getBlogPost(slug),
      getBlogPosts({ pagination: { pageSize: 3 } }),
    ]);
  } catch {
    notFound();
  }

  const posts = (postData?.data || []) as BlogPost[];
  const post = posts[0];

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current)
  const relatedPosts = ((relatedPostsData?.data || []) as BlogPost[])
    .filter((p) => p.documentId !== post.documentId)
    .slice(0, 2);

  const contentHtml = blocksToHtml(post.content);

  return (
    <div className="min-h-screen py-16 bg-slate-50">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад до блогу
        </Link>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog?category=${cat.slug}`}
                className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-slate-500 mb-12 pb-8 border-b border-slate-200">
          <span className="font-medium text-slate-800">{post.author?.name || 'Автор'}</span>
          <span>•</span>
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('uk-UA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>

        {/* Content */}
        {contentHtml ? (
          <div
            className="prose prose-slate max-w-none
              prose-headings:text-slate-800 prose-headings:font-semibold
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-800
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className="text-slate-600">{post.excerpt}</p>
        )}

        {/* Author box */}
        {post.author && (
          <div className="mt-16 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Про автора</h3>
            <p className="text-blue-600 font-medium">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-slate-600 text-sm mt-1">{post.author.bio}</p>
            )}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Схожі статті</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.documentId}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-colors"
                >
                  <h4 className="text-lg font-semibold text-slate-800 hover:text-blue-600">
                    {relatedPost.title}
                  </h4>
                  <p className="text-slate-500 text-sm mt-2 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
