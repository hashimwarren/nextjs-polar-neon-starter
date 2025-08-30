# Next.js Polar Neon Starter

A modern, full-stack starter for building blogs with paid newsletter functionality. Built with Next.js 15, featuring authentication, subscription management, and a complete content management system.

## 🚀 Features

### Framework & Styling
- **Next.js 15** with App Router and React 19
- **Tailwind CSS v4** for modern styling
- **shadcn/ui** components for consistent UI
- **TypeScript** for type safety

### Content Management
- **MDX** support for rich blog posts and newsletters
- Nested routing (`/blog/[year]/[slug]`)
- Frontmatter metadata support
- Draft/publish workflow with Tiptap editor
- Tag system for content organization

### Authentication & Monetization
- **Better Auth** for secure user authentication
- **Polar.sh** integration for subscription management
- User roles: `admin`, `subscriber`, `paidSubscriber`
- Paywall gating for premium content

### Newsletter & Email
- **Resend** for transactional emails and newsletters
- Newsletter signup/unsubscribe API endpoints
- Separate newsletter content management

### SEO & Performance
- Next.js Metadata API for SEO optimization
- **@vercel/og** for dynamic OG image generation
- Automatic sitemap and RSS feed generation
- Security headers configuration
- Static generation for optimal performance

### Developer Experience
- **Biome** for linting and formatting
- **Vitest** for unit testing
- **Playwright** for end-to-end testing
- **Drizzle ORM** with Neon PostgreSQL
- GitHub Actions CI/CD pipeline

## 📁 Project Structure

```
├── content/
│   ├── posts/           # Blog posts (.mdx files)
│   └── newsletter/      # Newsletter issues (.mdx files)
├── src/
│   ├── app/            # Next.js App Router pages
│   │   ├── blog/[year]/[slug]/
│   │   ├── newsletter/
│   │   ├── dashboard/
│   │   ├── admin/
│   │   └── api/
│   ├── components/     # React components
│   │   └── ui/        # shadcn/ui components
│   ├── lib/           # Utility functions
│   ├── db/            # Database schema and connection
│   └── test/          # Test files
├── public/            # Static assets
└── tests/             # E2E tests
```

## 🛠 Getting Started

### Prerequisites

- Node.js 20+ 
- PostgreSQL database (we recommend [Neon](https://neon.tech))
- [Polar.sh](https://polar.sh) account for subscriptions
- [Resend](https://resend.com) account for emails

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-polar-neon-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="your-neon-database-url"
   BETTER_AUTH_SECRET="your-auth-secret"
   POLAR_API_KEY="your-polar-api-key"
   RESEND_API_KEY="your-resend-api-key"
   SITE_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 Content Management

### Blog Posts

Create new blog posts in the `content/posts/` directory:

```mdx
---
title: "Your Post Title"
date: "2024-08-30"
description: "Post description for SEO"
tags: ["next.js", "blog"]
published: true
---

# Your Post Content

Write your content in MDX format...
```

### Newsletter Issues

Create newsletter content in `content/newsletter/`:

```mdx
---
title: "Newsletter Issue #1"
date: "2024-08-30"
description: "Newsletter description"
isPaid: false
published: true
---

# Newsletter Content

Your newsletter content here...
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Biome
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

### Testing

The project includes comprehensive testing setup:

- **Unit tests** with Vitest and Testing Library
- **E2E tests** with Playwright
- **Type checking** with TypeScript
- **Linting** with Biome

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
BETTER_AUTH_SECRET="your-production-auth-secret"
POLAR_API_KEY="your-polar-api-key"
RESEND_API_KEY="your-resend-api-key"
SITE_URL="https://yourdomain.com"
```

## 📚 Documentation

### Key Technologies

- [Next.js 15](https://nextjs.org/docs) - React framework
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/docs) - Component library
- [Better Auth](https://better-auth.com/docs) - Authentication
- [Polar.sh](https://polar.sh/docs) - Subscription management
- [Resend](https://resend.com/docs) - Email delivery
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Biome](https://biomejs.dev) - Linting and formatting

### Architecture Decisions

- **App Router**: Using Next.js 15 App Router for better performance and DX
- **Static Generation**: Most pages are statically generated for optimal performance
- **TypeScript**: Full type safety across the application
- **Component Library**: shadcn/ui for consistent, accessible components
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run `npm run lint` and `npm run test`
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) team for the amazing framework
- [Vercel](https://vercel.com) for hosting and deployment platform
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Polar.sh](https://polar.sh) for subscription management
- [Neon](https://neon.tech) for the serverless PostgreSQL

---

Built with ❤️ for the developer community.
