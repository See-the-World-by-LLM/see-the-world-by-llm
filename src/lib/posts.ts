import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  date: string;
  createdAt?: number;
  city: {
    en: string;
    zh: string;
    country: string;
    countryZh?: string;
  };
  slug: string;
  photoUrl: string;
  model?: string;
  imageModel?: string;
  modelEn?: string;
  modelZh?: string;
  summaryEn: string;
  summaryZh: string;
  contentEn: string;
  contentZh: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src/data/posts');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const items = fs.readdirSync(POSTS_DIR);
  const posts: BlogPost[] = [];

  for (const item of items) {
    const itemPath = path.join(POSTS_DIR, item);
    const stat = fs.statSync(itemPath);

    // Handle new directory structure (Markdown)
    if (stat.isDirectory()) {
      const enPath = path.join(itemPath, 'en.md');
      const zhPath = path.join(itemPath, 'zh.md');

      if (fs.existsSync(enPath) && fs.existsSync(zhPath)) {
        const enFile = fs.readFileSync(enPath, 'utf-8');
        const zhFile = fs.readFileSync(zhPath, 'utf-8');
        
        const enMatter = matter(enFile);
        const zhMatter = matter(zhFile);

        posts.push({
          date: enMatter.data.date,
          createdAt: enMatter.data.createdAt || stat.birthtimeMs,
          city: {
            en: enMatter.data.city,
            zh: enMatter.data.city_zh,
            country: enMatter.data.country,
            countryZh: enMatter.data.country_zh,
          },
          slug: enMatter.data.slug,
          photoUrl: enMatter.data.photoUrl,
          model: enMatter.data.model,
          imageModel: enMatter.data.imageModel,
          modelEn: enMatter.data.model,
          modelZh: zhMatter.data.model,
          summaryEn: enMatter.data.summary,
          summaryZh: zhMatter.data.summary,
          contentEn: enMatter.content,
          contentZh: zhMatter.content,
        });
      }
    } 
    // Handle legacy JSON files (backward compatibility)
    else if (item.endsWith('.json')) {
      try {
        const content = fs.readFileSync(itemPath, 'utf-8');
        const post = JSON.parse(content);
        if (!post.slug) post.slug = item.replace('.json', '');
        post.modelEn = post.model;
        post.imageModel = post.imageModel;
        post.modelZh = post.model;
        post.createdAt = stat.birthtimeMs;
        posts.push(post);
      } catch (e) {
        console.error(`Failed to parse ${item}`, e);
      }
    }
  }

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (dateA !== dateB) {
      return dateB - dateA;
    }
    // If dates are equal, sort by creation time (newest first)
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Try Markdown directory first
  const dirPath = path.join(POSTS_DIR, slug);
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    const enPath = path.join(dirPath, 'en.md');
    const zhPath = path.join(dirPath, 'zh.md');

    if (fs.existsSync(enPath) && fs.existsSync(zhPath)) {
      const enFile = fs.readFileSync(enPath, 'utf-8');
      const zhFile = fs.readFileSync(zhPath, 'utf-8');
      
      const enMatter = matter(enFile);
      const zhMatter = matter(zhFile);

      return {
        date: enMatter.data.date,
        city: {
          en: enMatter.data.city,
          zh: enMatter.data.city_zh,
          country: enMatter.data.country,
          countryZh: enMatter.data.country_zh,
        },
        slug: enMatter.data.slug,
        photoUrl: enMatter.data.photoUrl,
        model: enMatter.data.model,
        imageModel: enMatter.data.imageModel,
        modelEn: enMatter.data.model,
        modelZh: zhMatter.data.model,
        summaryEn: enMatter.data.summary,
        summaryZh: zhMatter.data.summary,
        contentEn: enMatter.content,
        contentZh: zhMatter.content,
      };
    }
  }

  // Try legacy JSON
  const jsonPath = path.join(POSTS_DIR, `${slug}.json`);
  if (fs.existsSync(jsonPath)) {
    try {
      const content = fs.readFileSync(jsonPath, 'utf-8');
      const post = JSON.parse(content);
      if (!post.slug) post.slug = slug;
      post.modelEn = post.model;
      post.imageModel = post.imageModel;
      post.modelZh = post.model;
      return post;
    } catch (e) {
      console.error(e);
    }
  }

  return null;
}
