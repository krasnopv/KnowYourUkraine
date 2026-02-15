# Homepage and “Homepage” Page Entry

## Two places to manage the homepage

1. **Content-Manager → Homepage (single type)**  
   This is where the main **content** of the homepage is edited (hero title, subtitle, about text, stats, cycles, CTA). The frontend uses this for the EdEra-style layout.

2. **Content-Manager → Page → “Homepage” entry**  
   Create **one** Page entry for the site’s main page so it appears in the Page catalog and can hold **SEO** and optional excerpt for the homepage.

## Create the “Homepage” entry in the Page catalog

1. Open **Content-Manager** in the Strapi admin.
2. Go to **Page** (collection).
3. Click **Create new entry**.
4. Set:
   - **Title:** `Homepage`
   - **Slug:** `homepage` (required; must be exactly `homepage` so the frontend can load it for SEO).
5. Optionally set **SEO Title**, **SEO Description**, **Excerpt** for the main page.
6. **Save** and **Publish**.

The frontend uses this Page entry for homepage metadata (e.g. `<title>`, meta description). The hero, about, stats, cycles, and CTA content stay in **Homepage (single type)**.
