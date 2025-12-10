'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';

export default function SyncPostLanguage({ currentLang, city }: { currentLang: 'en' | 'zh'; city: string }) {
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (language !== currentLang) {
      router.replace(`/posts/${city}/${language}`);
    }
  }, [language, currentLang, city, router]);

  return null;
}
