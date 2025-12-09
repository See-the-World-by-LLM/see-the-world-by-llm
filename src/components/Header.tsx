'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition">
            <span className="text-3xl">🌍</span>
            <h1 className="text-2xl font-bold">See the World by LLM</h1>
          </Link>
          <p className="text-sm mt-2 text-blue-100">
            A daily journey to discover cities around the world, powered by AI
          </p>
        </div>

        <div className="flex items-center gap-2" aria-label="Site language selector">
          <button
            onClick={() => setLanguage('en')}
            className={`px-3 py-1 rounded text-sm font-medium transition border ${
              language === 'en'
                ? 'bg-white text-blue-700 border-white shadow'
                : 'bg-transparent text-white border-white/40 hover:border-white'
            }`}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={`px-3 py-1 rounded text-sm font-medium transition border ${
              language === 'zh'
                ? 'bg-white text-blue-700 border-white shadow'
                : 'bg-transparent text-white border-white/40 hover:border-white'
            }`}
            aria-pressed={language === 'zh'}
          >
            中文
          </button>
        </div>
      </nav>
    </header>
  );
}
