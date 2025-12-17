# Know Your Ukraine - Project Plan

## Overview
Educational organization website with CMS-powered content management.

**Tech Stack:**
- **Frontend:** Next.js 15 (App Router)
- **CMS:** Strapi 5
- **Payments:** LiqPay (Ukraine) + Snipcart (international)
- **Styling:** Tailwind CSS
- **Monorepo:** pnpm workspaces + Turborepo
- **Deployment:** Self-hosted (Docker + Nginx)
- **Backend:** Supabase (PostgreSQL, Storage, Auth)

---

## Project Structure

```
knowYourUkraine/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx           # Homepage
│   │   │   │   ├── about/             # About organization
│   │   │   │   └── partners/          # Partner projects
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx           # Blog listing
│   │   │   │   └── [slug]/page.tsx    # Blog post
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx           # Product listing
│   │   │   │   └── [slug]/page.tsx    # Product detail
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── strapi.ts              # Strapi API client
│   │   └── package.json
│   │
│   └── cms/                 # Strapi CMS
│       ├── src/
│       │   ├── api/                   # Content types
│       │   └── admin/
│       ├── config/
│       └── package.json
│
├── packages/
│   └── shared/              # Shared types & utilities
│       ├── types/
│       └── package.json
│
├── .github/
│   └── workflows/
│       ├── deploy-web.yml   # Next.js deployment
│       └── deploy-cms.yml   # Strapi deployment
│
├── docker-compose.yml       # Local development
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Content Types (Strapi)

### 1. Pages (Single Types)
- **Homepage** - hero, features, CTA sections
- **About** - organization info, team, mission

### 2. Collection Types

#### Blog Posts
| Field | Type |
|-------|------|
| title | Text |
| slug | UID |
| content | Rich Text |
| excerpt | Text |
| coverImage | Media |
| author | Relation → Authors |
| categories | Relation → Categories |
| publishedAt | DateTime |

#### Products (Merchandise)
| Field | Type |
|-------|------|
| name | Text |
| slug | UID |
| description | Rich Text |
| price | Decimal |
| images | Media (multiple) |
| category | Relation → Product Categories |
| inStock | Boolean |
| snipcartId | Text |

#### Partners
| Field | Type |
|-------|------|
| name | Text |
| logo | Media |
| description | Text |
| websiteUrl | Text |
| projectLinks | Component (repeatable) |

#### Authors
| Field | Type |
|-------|------|
| name | Text |
| avatar | Media |
| bio | Text |

#### Categories
| Field | Type |
|-------|------|
| name | Text |
| slug | UID |

---

## Pages & Features

### Public Pages
- [ ] **Homepage** - Hero, featured content, CTA
- [ ] **About** - Organization info, mission, team
- [ ] **Blog** - Article listing with pagination
- [ ] **Blog Post** - Individual article view
- [ ] **Shop** - Product grid with filters
- [ ] **Product Detail** - Images, description, add to cart
- [ ] **Partners** - Partner logos and project links
- [ ] **Contact** - Contact form

### Features
- [ ] Responsive design (mobile-first)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Image optimization (Next.js Image)
- [ ] LiqPay integration (Ukrainian payments)
- [ ] Snipcart integration (international checkout)
- [ ] Blog search & filtering
- [ ] Newsletter signup

---

## Development Phases

### Phase 1: Setup (Week 1) ✅
- [x] Initialize monorepo structure
- [x] Setup Strapi with PostgreSQL
- [x] Setup Next.js with Tailwind
- [x] Create shared types package
- [x] Docker compose for local dev
- [x] GitHub Actions CI/CD workflows

### Phase 2: CMS & Content Types (Week 1-2) ✅
- [x] Create all Strapi content types
- [x] Setup media library (via Strapi admin)
- [x] Configure API permissions (via Strapi admin)
- [x] Add seed data for development

### Phase 3: Frontend Core (Week 2-3) ✅
- [x] Layout components (Header, Footer, Navigation)
- [x] Homepage implementation
- [x] About page
- [x] Strapi API integration

### Phase 4: Blog (Week 3) ✅
- [x] Blog listing page
- [x] Blog post page
- [x] Categories & filtering
- [x] Related posts

### Phase 5: Shop (Week 4) ✅
- [x] Product listing page
- [x] Product detail page
- [ ] Snipcart integration
- [ ] Cart & checkout flow

### Phase 6: Partners & Extras (Week 4-5) ✅
- [x] Partners page
- [x] Contact form
- [x] About page
- [ ] Newsletter integration
- [ ] Search functionality

### Phase 7: Deployment (Week 5) ✅
- [x] GitHub Actions CI/CD (created)
- [x] Nginx config created
- [x] Server setup script created
- [ ] Strapi deployment to server (manual)
- [ ] Next.js deployment to server (manual)
- [ ] Domain & SSL setup (manual)

---

## Deployment Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   GitHub Repo   │     │                 │
│   (monorepo)    │────▶│  GitHub Actions │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Your Server         │
                    │  ─────────────────────  │
                    │                         │
                    │  ┌───────┐  ┌────────┐  │
                    │  │Strapi │  │Next.js │  │
                    │  │:1337  │  │:3000   │  │
                    │  └───────┘  └────────┘  │
                    │       │          │      │
                    │  ┌────┴──────────┴───┐  │
                    │  │   PostgreSQL      │  │
                    │  └───────────────────┘  │
                    │                         │
                    │  ┌───────────────────┐  │
                    │  │   Nginx (proxy)   │  │
                    │  │   :80 / :443      │  │
                    │  └───────────────────┘  │
                    └─────────────────────────┘
                                 │
                                 ▼
                        ┌──────────────┐
                        │   Snipcart   │
                        │  (payments)  │
                        └──────────────┘
```

---

## Environment Variables

### Strapi (apps/cms/.env)
```env
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_URL=postgres://user:pass@localhost:5432/strapi
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
APP_KEYS=key1,key2,key3,key4
```

### Next.js (apps/web/.env.local)
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token
NEXT_PUBLIC_SNIPCART_API_KEY=your-snipcart-key
LIQPAY_PUBLIC_KEY=your-liqpay-public-key
LIQPAY_PRIVATE_KEY=your-liqpay-private-key
```

---

## Commands

```bash
# Install dependencies
pnpm install

# Development (runs both apps)
pnpm dev

# Build all
pnpm build

# Run only frontend
pnpm --filter web dev

# Run only CMS
pnpm --filter cms dev
```

---

## Next Steps

1. ~~Review and approve this plan~~ ✅
2. ~~Initialize the monorepo structure~~ ✅
3. ~~Create Strapi content types (Phase 2)~~ ✅
4. ~~Create frontend layout components (Phase 3)~~ ✅
5. ~~Implement Homepage~~ ✅
6. ~~Setup Strapi API integration~~ ✅
7. ~~Create Blog pages (Phase 4)~~ ✅
8. ~~Create Shop pages (Phase 5)~~ ✅
9. ~~Create Partners, About, Contact pages (Phase 6)~~ ✅
10. ~~Finalize deployment setup (Phase 7)~~ ✅

## 🎉 Project scaffold complete! Ready for deployment.

