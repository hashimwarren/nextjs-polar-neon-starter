## 🏗 Architecture Overview

### Framework
- **Next.js 15** (App Router, React 19, Turbopack dev server, PPR support)
- **Tailwind CSS v4** for styling
- **shadcn/ui** for prebuilt, accessible UI components
- Deployment target: **Vercel**

### Content
- **@next/mdx** for MDX-based blog and newsletter content
- Supports nested routes (`/blog/[year]/[slug]`)
- Tagging system (`/tags/[tag]`)
- Draft/publish workflow:
  - Writers draft in **Tiptap**
  - Drafts stored in Neon DB
  - On publish, drafts export as `.mdx` → committed to repo → Vercel rebuild

### Authentication & Monetization
- **Better Auth** for user authentication (email/password + OAuth)
- Roles: `admin`, `subscriber`, `paidSubscriber`
- **Polar.sh** for subscription management and paywall gating
- Neon DB stores user and subscription state (updated via Polar webhook)

### Newsletter & Email
- **Resend** for transactional emails + newsletter send-outs
- `/api/newsletter` endpoint for subscribe/unsubscribe
- Newsletter issues are `.mdx` posts in `content/newsletter/`

### SEO & Distribution
- Next.js **Metadata API** for SEO meta tags
- Static **RSS** and **sitemap.xml** generated at build
- Dynamic **OG images** via `@vercel/og`
- Preconfigured **security headers** in `next.config.js`

### Theming
- Light/Dark theme toggle
- Fonts via `next/font`
- Images via `next/image` with static imports for optimization

### Developer Experience
- **Biome** for linting/formatting
- **Vitest + Playwright** for testing
- **GitHub Actions** for CI/CD: lint → test → build → deploy to Vercel
- **Neon Launchpad** used for one-click DB setup
- Most routes are **SSG** (cheap on Vercel), with **ISR** only for indexes

---

## ✅ Route Overview
- `/` → Blog index + newsletter signup
- `/blog/[year]/[slug]` → MDX blog posts
- `/tags/[tag]` → Tag pages
- `/newsletter` → Newsletter archive (mix free + paid)
- `/dashboard` → Subscriber dashboard (subscription status)
- `/admin` → Admin-only Tiptap editor

---
