import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import SyncPostLanguage from '@/components/SyncPostLanguage';

interface BlogPost {
  date: string;
  city: {
    en: string;
    zh: string;
    country: string;
  };
  photoUrl: string;
  model: string;
  summaryEn: string;
  summaryZh: string;
  contentEn: string;
  contentZh: string;
}

interface PageProps {
  params: Promise<{
    date: string;
    lang: string;
  }>;
}

async function getPost(date: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'src/data/posts', `${date}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as BlogPost;
  } catch (error) {
    console.error('Error reading post:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'src/data/posts');
  
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const files = fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.json'));

  const params = [];
  for (const file of files) {
    const date = file.replace('.json', '');
    params.push({ date, lang: 'en' });
    params.push({ date, lang: 'zh' });
  }

  return params;
}

export default async function PostPage({ params }: PageProps) {
  const { date, lang } = await params;
  
  if (lang !== 'en' && lang !== 'zh') {
    notFound();
  }

  const post = await getPost(date);

  if (!post) {
    notFound();
  }

  const content = lang === 'en' ? post.contentEn : post.contentZh;
  const cityName = lang === 'en' ? post.city.en : post.city.zh;
  const modelLabel = post.model || 'deepseek-ai/DeepSeek-V3.2';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <SyncPostLanguage currentLang={lang} date={date} />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="w-full rounded-lg overflow-hidden mb-8 bg-gray-100 aspect-[16/9]">
            <Image
              src={post.photoUrl}
              alt={`${post.city.en}, ${post.city.country}`}
              width={1600}
              height={900}
              unoptimized
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Post Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {cityName}
                </h1>
                <p className="text-xl text-gray-600">{post.city.country}</p>
              </div>
              <time className="text-gray-500">
                {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Model:</span>
              <a
                href="https://huggingface.co/deepseek-ai/DeepSeek-V3.2"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                {modelLabel}
              </a>
            </div>
          </div>

          {/* Content */}
          <section className="mb-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                {content}
              </p>
            </div>
          </section>

          {/* Back to Home */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2"
            >
              ← {lang === 'en' ? 'Back to all posts' : '返回所有文章'}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
