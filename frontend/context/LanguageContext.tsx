'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { dictionary } from '@/lib/dictionary';
import { PageTransition } from '@/components/ui/PageTransition';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof dictionary.en;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 1. İÇ BİLEŞEN: Tüm mantık burada döner
const LanguageProviderContent = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // -- Başlangıç State'i (Lazy Init) --
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';

    // 1. URL'e bak
    const urlLang = searchParams.get('lang');
    if (urlLang === 'tr' || urlLang === 'en') {
      return urlLang;
    }

    // 2. LocalStorage'a bak
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) return savedLang;

    // 3. Tarayıcıya bak
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'tr' ? 'tr' : 'en';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // -- URL Güncelleme Efekti --
  useEffect(() => {
    // Sadece pathname mevcutsa çalıştır (Next.js bazen null dönebilir)
    if (pathname) {
      const currentUrlLang = searchParams.get('lang');

      // Eğer URL'deki dil zaten bizim state ile aynıysa boşuna değiştirme (Loop engelleme)
      if (currentUrlLang !== language) {
        document.documentElement.lang = language;
        localStorage.setItem('language', language);

        const params = new URLSearchParams(searchParams.toString());
        params.set('lang', language);

        // URL'i sessizce güncelle
        window.history.replaceState(null, '', `${pathname}?${params.toString()}`);
      }
    }
  }, [language, pathname, searchParams]);

  const toggleLanguage = async () => {
    if (isTransitioning) return;
    const newLang = language === 'en' ? 'tr' : 'en';

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    setLanguage(newLang);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsTransitioning(false);
  };

  const t = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isTransitioning }}>
      <PageTransition isVisible={isTransitioning} />
      {children}
    </LanguageContext.Provider>
  );
};

// 2. DIŞ BİLEŞEN: Suspense Sarmalayıcı (Layout içinde hatayı önler)
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <LanguageProviderContent>
        {children}
      </LanguageProviderContent>
    </Suspense>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};