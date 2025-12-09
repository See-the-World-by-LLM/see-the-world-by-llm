import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/BlogPostCard';

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

const PAGE_SIZE = 10;

async function getPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), 'src/data/posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.json'))
    .sort()
    .reverse()
    .map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
      return JSON.parse(content) as BlogPost;
    });
}

export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  return Array.from({ length: totalPages }, (_, i) => ({ pageNumber: String(i + 1) }));
}

export default async function Page({ params }: { params: { pageNumber: string } | Promise<{ pageNumber: string }> }) {
  const resolvedParams = await params;
  const pageNum = Number(resolvedParams.pageNumber);
  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  if (!Number.isInteger(pageNum) || pageNum < 1 || pageNum > totalPages) {
    notFound();
  }

  const page = pageNum;
  const start = (page - 1) * PAGE_SIZE;
  const paginated = posts.slice(start, start + PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-12 flex-grow">
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No posts yet.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {paginated.map((post) => (
                <BlogPostCard key={post.date} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex flex-wrap items-center gap-2" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
                  const href = num === 1 ? '/' : `/page/${num}`;
                  const isCurrent = num === page;
                  return (
                    <a
                      key={num}
                      href={href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`px-4 py-2 rounded border text-sm font-medium ${
                        isCurrent
                          ? 'text-white bg-blue-600 border-blue-600'
                          : 'text-blue-600 border-blue-200 hover:bg-blue-50'
                      }`}
                    >
                      {num}
                    </a>
                  );
                })}
                <span className="ml-2 text-sm text-gray-500">Page {page} of {totalPages}</span>
              </nav>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
