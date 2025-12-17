import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts, getCategories } from '@/lib/strapi';

export const dynamic = 'force-dynamic';

interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: { url: string };
  publishedAt: string;
  author?: { name: string };
  categories?: { name: string; slug: string }[];
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;

  let postsData;
  let categoriesData;

  try {
    [postsData, categoriesData] = await Promise.all([
      getBlogPosts(),
      getCategories(),
    ]);
  } catch {
    postsData = { data: [] };
    categoriesData = { data: [] };
  }

  const posts: BlogPost[] = postsData.data || [];
  const categories: Category[] = categoriesData.data || [];

  // Filter posts by category if selected
  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.slug === selectedCategory)
      )
    : posts;

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наш <span className="text-amber-400">блог</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Статті про українську культуру, історію та традиції
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-amber-500 text-slate-900'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Всі
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.documentId}
              href={`/blog?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-amber-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.documentId}
                className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-amber-500/30 transition-all group"
              >
                {/* Image */}
                <div className="aspect-video bg-slate-700 relative overflow-hidden">
                  {post.coverImage?.url ? (
                    <Image
                      src={post.coverImage.url}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-500/20 to-blue-500/20">
                      <span className="text-6xl">📖</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {post.categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/blog?category=${cat.slug}`}
                          className="text-xs font-medium px-2 py-1 bg-amber-500/20 text-amber-400 rounded hover:bg-amber-500/30"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{post.author?.name || 'Автор'}</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('uk-UA')}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">
              {selectedCategory
                ? 'Немає статей у цій категорії'
                : 'Поки що немає статей'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
