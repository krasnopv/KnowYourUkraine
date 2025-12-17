const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  populate?: string | string[] | object;
  filters?: object;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

async function fetchAPI<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { populate, filters, sort, pagination } = options;
  
  const params = new URLSearchParams();
  
  if (populate) {
    if (typeof populate === 'string') {
      params.append('populate', populate);
    } else if (Array.isArray(populate)) {
      populate.forEach((p) => params.append('populate', p));
    } else {
      params.append('populate', JSON.stringify(populate));
    }
  }
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params.append(`filters${key}`, String(value));
    });
  }
  
  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((s) => params.append('sort', s));
    } else {
      params.append('sort', sort);
    }
  }
  
  if (pagination) {
    if (pagination.page) params.append('pagination[page]', String(pagination.page));
    if (pagination.pageSize) params.append('pagination[pageSize]', String(pagination.pageSize));
  }

  const url = `${STRAPI_URL}/api${endpoint}?${params.toString()}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(url, {
    headers,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}

// Strapi response type
interface StrapiResponse<T> {
  data: T[];
  meta?: { pagination?: { page: number; pageSize: number; total: number } };
}

// Blog Posts
export async function getBlogPosts(options?: FetchOptions): Promise<StrapiResponse<unknown>> {
  return fetchAPI('/blog-posts', {
    populate: ['coverImage', 'author', 'categories'],
    sort: 'publishedAt:desc',
    ...options,
  });
}

export async function getBlogPost(slug: string): Promise<StrapiResponse<unknown>> {
  return fetchAPI(`/blog-posts`, {
    populate: ['coverImage', 'author', 'categories'],
    filters: { '[slug][$eq]': slug },
  });
}

// Products
export async function getProducts(options?: FetchOptions) {
  return fetchAPI('/products', {
    populate: ['images', 'category'],
    ...options,
  });
}

export async function getProduct(slug: string) {
  return fetchAPI(`/products`, {
    populate: ['images', 'category'],
    filters: { '[slug][$eq]': slug },
  });
}

// Partners
export async function getPartners() {
  return fetchAPI('/partners', {
    populate: ['logo'],
  });
}

// Categories
export async function getCategories(): Promise<StrapiResponse<unknown>> {
  return fetchAPI('/categories');
}

export async function getProductCategories() {
  return fetchAPI('/product-categories');
}

// Pages
export async function getPages(options?: FetchOptions): Promise<StrapiResponse<unknown>> {
  return fetchAPI('/pages', {
    populate: ['featuredImage'],
    sort: 'publishedAt:desc',
    ...options,
  });
}

export async function getPage(slug: string): Promise<StrapiResponse<unknown>> {
  return fetchAPI('/pages', {
    populate: ['featuredImage'],
    filters: { '[slug][$eq]': slug },
  });
}

