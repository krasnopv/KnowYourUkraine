import { StrapiImage } from './strapi';

// Blog Post
export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: StrapiImage;
  author?: Author;
  categories?: Category[];
  publishedAt: string;
}

// Product (Merchandise)
export interface Product {
  name: string;
  slug: string;
  description: string;
  price: number;
  images?: StrapiImage[];
  category?: ProductCategory;
  inStock: boolean;
  snipcartId?: string;
}

// Partner
export interface Partner {
  name: string;
  logo?: StrapiImage;
  description: string;
  websiteUrl: string;
  projectLinks?: ProjectLink[];
}

export interface ProjectLink {
  title: string;
  url: string;
  description?: string;
}

// Author
export interface Author {
  name: string;
  avatar?: StrapiImage;
  bio?: string;
}

// Categories
export interface Category {
  name: string;
  slug: string;
}

export interface ProductCategory {
  name: string;
  slug: string;
}

