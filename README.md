# 🌍 See the World by LLM

Static bilingual travel blog built with Next.js.

## Features

- 🌐 Bilingual posts (English + 中文) with language-specific URLs `/posts/[date]/en` and `/posts/[date]/zh`
- 🔀 Language toggle across the site with shared preference
- 🧭 Pagination for browsing older posts
- 🖼️ Local city images from `public/images/cities/`
- 🧠 Model attribution displayed on cards and post pages
- ⚡ Static export (`npm run build`) ready for GitHub Pages or any static host

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React and TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Static output (`out/`) deployable to GitHub Pages or any static host

## Project Structure

```
see-the-world-by-llm/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── posts/[date]/ # Dynamic routes for individual posts
│   │   ├── page.tsx      # Homepage with post cards
│   │   └── page/[pageNumber]/ # Paginated listing
│   ├── components/       # Reusable UI components
│   ├── data/
│   │   └── posts/        # Blog posts as JSON
│   └── lib/              # Shared utilities (e.g., language context)
└── public/
    └── images/cities/    # Local city images
```

## Content Management (Manual)

- Add posts as JSON files in `src/data/posts/` named by date, e.g., `2025-12-08.json`.
- Each file includes bilingual fields and the model used. Example schema:

```json
{
  "date": "2025-12-08",
  "city": { "en": "Tokyo", "zh": "东京", "country": "Japan" },
  "photoUrl": "/images/cities/tokyo.jpg",
  "summaryEn": "Two-sentence English summary.",
  "summaryZh": "两句中文摘要。",
  "contentEn": "300-400 words in English...",
  "contentZh": "300-400 字中文正文...",
  "model": "gpt-5.1"
}
```
- Place referenced images in `public/images/cities/`.
- Language-specific routes are generated from the JSON files at build time.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`.

## Deployment (Manual)

1. Build the static site:
   ```bash
   npm run build
   ```
   The export is written to `out/`.
2. Deploy `out/` to GitHub Pages (or any static host). For GitHub Pages, publish the `out/` directory (e.g., via the Pages settings or by pushing it to a `gh-pages` branch). There is no GitHub Actions workflow in this repo.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build and statically export to `out/`
- `npm run start` - Start the production server (non-export scenario)
- `npm run lint` - Run ESLint

## Troubleshooting

- Clear `.next` and `out`: `rm -rf .next out`
- Reinstall deps: `rm -rf node_modules && npm install`
- Check TypeScript: `npx tsc --noEmit`

## Future Enhancements

- [ ] Add categories/tags and search
- [ ] Monthly archive pages
- [ ] Social sharing buttons
- [ ] Dark mode toggle
- [ ] Email newsletter signup

## License

MIT

## Contributing

Pull requests and issues are welcome.

---

**Made with ❤️ and AI** - Explore the world through the lens of language models.
