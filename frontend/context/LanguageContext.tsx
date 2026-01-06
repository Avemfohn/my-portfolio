'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary } from '@/lib/dictionary';
import { PageTransition } from '@/components/ui/PageTransition';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof dictionary.en;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';

    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) return savedLang;

    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'tr' ? 'tr' : 'en';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);


  useEffect(() => {
    document.documentElement.lang = language;

    localStorage.setItem('language', language);

  }, [language]);

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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};