# Copilot Instructions

This is a Next.js project for the "See the World by LLM" blog website.

## Project Overview

- Personal website that features daily AI-generated blog posts about cities worldwide
- Posts are generated in both English and Chinese
- Deployed to GitHub Pages with automated daily updates via GitHub Actions

## Key Features

- Next.js 16 with TypeScript and App Router
- Tailwind CSS for styling
- OpenAI API integration for content generation
- Static site generation for GitHub Pages deployment
- Bilingual content (English/Chinese) with toggle
- Language-specific URLs for each post (e.g., /posts/2025-12-08/en and /posts/2025-12-08/zh)
- Local image storage in public/images/cities/

## File Structure

- `/src/app/` - Next.js pages and layouts
  - `/src/app/posts/[date]/[lang]/` - Language-specific dynamic routes (en/zh)
- `/src/components/` - Reusable React components
  - `Header.tsx` - Site navigation and branding
  - `Footer.tsx` - Site footer
  - `BlogPostCard.tsx` - Homepage blog post cards with photos and summaries
- `/src/data/posts/` - Generated blog posts (JSON format)
- `/src/data/cities.json` - List of cities to feature
- `/scripts/generate-post.ts` - Daily post generation script
- `/.github/workflows/deploy.yml` - GitHub Actions workflow

## Development Guidelines

- Use TypeScript for all new files
- Follow Next.js 16 App Router conventions
- Maintain responsive design with Tailwind CSS
- Keep components simple and reusable
- Ensure posts are bilingual (English and Chinese)

## Blog Post Structure

Each post includes:
- `date`: Publication date (YYYY-MM-DD)
- `city`: Object with English name, Chinese name, and country
- `photoUrl`: Unsplash photo URL for the city
- `summaryEn`: English summary (2 sentences)
- `summaryZh`: Chinese summary (2 sentences)
- `contentEn`: Full English content (300-400 words)
- `contentZh`: Full Chinese content (300-400 words)

## Important Notes

- The build output is configured for static export (`output: 'export'`)
- GitHub Pages deployment requires unoptimized images
- Daily posts are generated at 00:00 UTC via cron schedule
- OpenAI API key is required for post generation
- Homepage displays post cards with photos, titles, dates, and summaries
- Each post has language-specific URLs at `/posts/[date]/en` and `/posts/[date]/zh`
- Images are stored locally in `/public/images/cities/` directory
- Language switcher available on individual post pages
