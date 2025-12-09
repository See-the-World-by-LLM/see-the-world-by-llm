'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/language-context';

export default function SyncPostLanguage({ currentLang, date }: { currentLang: 'en' | 'zh'; date: string }) {
  const { language } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (language !== currentLang) {
      router.replace(`/posts/${date}/${language}`);
    }
  }, [language, currentLang, date, router]);

  return null;
}
