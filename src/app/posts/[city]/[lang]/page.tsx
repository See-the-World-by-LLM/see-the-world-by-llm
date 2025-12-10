import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import SyncPostLanguage from '@/components/SyncPostLanguage';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getAllPosts, getPostBySlug } from '@/lib/posts';

interface PageProps {
  params: Promise<{
    city: string;
    lang: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const params = [];
  for (const post of posts) {
    params.push({ city: post.slug, lang: 'en' });
    params.push({ city: post.slug, lang: 'zh' });
  }
  return params;
}

export default async function PostPage({ params }: PageProps) {
  const { city, lang } = await params;
  
  if (lang !== 'en' && lang !== 'zh') {
    notFound();
  }

  const post = getPostBySlug(city);

  if (!post) {
    notFound();
  }

  const content = lang === 'en' ? post.contentEn : post.contentZh;
  const cityName = lang === 'en' ? post.city.en : post.city.zh;
  const countryName = (lang === 'zh' && post.city.countryZh) ? post.city.countryZh : post.city.country;
  const modelLabel = lang === 'en' ? post.modelEn : post.modelZh;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <SyncPostLanguage currentLang={lang} city={city} />

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
                <p className="text-xl text-gray-600">{countryName}</p>
              </div>
              <time className="text-gray-500">
                {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {modelLabel && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Model:</span>
                <a
                  href={`https://huggingface.co/${modelLabel}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  {modelLabel}
                </a>
              </div>
            )}
          </div>

          {/* Content */}
          <section className="mb-12">
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({node, ...props}) => (
                    <span className="block my-8">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img {...props} className="rounded-lg shadow-md max-w-full h-auto mx-auto" alt={props.alt || ''} />
                    </span>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
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
