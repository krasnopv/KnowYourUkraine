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

  const posts: BlogPost[] = postData?.data || [];
  const post = posts[0];

  if (!post) {
    notFound();
  }

  // Get related posts (excluding current)
  const relatedPosts: BlogPost[] = (relatedPostsData?.data || [])
    .filter((p: BlogPost) => p.documentId !== post.documentId)
    .slice(0, 2);

  const contentHtml = blocksToHtml(post.content);

  return (
    <div className="min-h-screen py-16">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8"
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
                className="text-sm font-medium px-3 py-1 bg-amber-500/20 text-amber-400 rounded hover:bg-amber-500/30"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-slate-400 mb-12 pb-8 border-b border-slate-700">
          <span className="font-medium text-white">{post.author?.name || 'Автор'}</span>
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
            className="prose prose-invert prose-amber max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className="text-slate-300">{post.excerpt}</p>
        )}

        {/* Author box */}
        {post.author && (
          <div className="mt-16 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">Про автора</h3>
            <p className="text-amber-400 font-medium">{post.author.name}</p>
            {post.author.bio && (
              <p className="text-slate-400 text-sm mt-1">{post.author.bio}</p>
            )}
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6">Схожі статті</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.documentId}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-amber-500/30 transition-colors"
                >
                  <h4 className="text-lg font-semibold text-white hover:text-amber-400">
                    {relatedPost.title}
                  </h4>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2">
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
