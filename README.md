# 🌍 See the World by LLM

Static bilingual travel blog built with Next.js.

## Features

- 🌐 Bilingual posts (English + 中文) with language-specific URLs `/posts/[city-slug]/en` and `/posts/[city-slug]/zh`
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
├── app/
│   ├── page.tsx          # Homepage with post feed
│   ├── layout.tsx        # Root layout
│   ├── posts/[city]/     # Dynamic routes for individual posts
│     └── [lang]/         # Language segment (en/zh)
├── components/           # Reusable components
├── data/
│   ├── posts/            # Blog posts
│   │   └── [slug]/       # Directory per city (e.g., tokyo/)
│   │       ├── en.md     # English content with frontmatter
│   │       └── zh.md     # Chinese content with frontmatter
│   └── lib/              # Shared utilities (e.g., language context)
└── public/
    └── images/cities/    # Local city images
```

## Content Management (Manual)

Posts are stored as Markdown files with Frontmatter in `src/data/posts/[slug]/`. Each city has its own directory containing `en.md` and `zh.md`.

### Directory Structure
```
src/data/posts/
└── tokyo/
    ├── en.md
    └── zh.md
```

### File Format (Frontmatter)

**`en.md` Example:**
```markdown
---
title: Tokyo
date: 2025-12-08
createdAt: 1733875200000
city: Tokyo
city_zh: 东京
country: Japan
slug: tokyo
photoUrl: /images/cities/tokyo.jpg
model: deepseek-ai/DeepSeek-V3
summary: "Tokyo is a mesmerizing blend of neon-lit skyscrapers and historic temples. From the bustling crossing of Shibuya to the serene Meiji Shrine, it offers an unforgettable experience."
---

## A Playful Welcome
Welcome to Tokyo, where the future meets the past...

## Fun Facts
- Tokyo has the most Michelin-starred restaurants in the world.
...
```

**`zh.md` Example:**
```markdown
---
title: 东京
date: 2025-12-08
createdAt: 1733875200000
city: Tokyo
city_zh: 东京
country: Japan
country_zh: 日本
slug: tokyo
photoUrl: /images/cities/tokyo.jpg
model: deepseek-ai/DeepSeek-V3
summary: "东京是霓虹闪烁的摩天大楼与历史悠久的寺庙的迷人融合。从涩谷繁忙的十字路口到宁静的明治神宫，它提供令人难忘的体验。"
---

## 俏皮的欢迎语
欢迎来到东京，这里是未来与过去的交汇点...

## 有趣冷知识
- 东京拥有世界上最多的米其林星级餐厅。
...
```

- **Images**: Place referenced images in `public/images/cities/`.
- **Generation**: Use the `generate_post.py` script in the parent directory to automatically generate content and images.

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
