'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useLanguage } from '@/lib/language-context';

interface BlogPost {
  date: string;
  city: {
    en: string;
    zh: string;
    country: string;
    countryZh?: string;
  };
  slug?: string;
  photoUrl: string;
  model?: string;
  modelEn?: string;
  modelZh?: string;
  summaryEn: string;
  summaryZh: string;
  contentEn: string;
  contentZh: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const { language } = useLanguage();
  const summary = language === 'en' ? post.summaryEn : post.summaryZh;
  const cityName = language === 'en' ? post.city.en : post.city.zh;
  const countryName = (language === 'zh' && post.city.countryZh) ? post.city.countryZh : post.city.country;
  const slug = post.slug || post.city.en.toLowerCase().replace(/,/g, '').replace(/ /g, '-');
  const postUrl = `/posts/${slug}/${language}`;
  const modelLabel = language === 'en' ? post.modelEn : post.modelZh;

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group">
      <Link href={postUrl}>
        <div className="w-full overflow-hidden bg-gray-100 aspect-[16/9]">
          <Image
            src={post.photoUrl}
            alt={`${post.city.en}, ${post.city.country}`}
            width={1600}
            height={900}
            unoptimized
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <div className="p-6">
        <Link href={postUrl}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
            {cityName}
          </h2>
          <p className="text-gray-600">{countryName}</p>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="text-gray-700 leading-relaxed line-clamp-3 mb-2">{summary}</p>
          <div className="mt-4">
            <span className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center gap-1">
              {language === 'en' ? 'Read more' : '阅读更多'} →
            </span>
          </div>
        </Link>

        {modelLabel && (
          <p className="text-xs text-gray-500 mt-3">
            Model: <a href={`https://huggingface.co/${modelLabel}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700">{modelLabel}</a>
          </p>
        )}
      </div>
    </article>
  );
}
