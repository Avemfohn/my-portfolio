'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionary } from '@/lib/dictionary';
import { PageTransition } from '@/components/PageTransition';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof dictionary.en;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && savedLang !== 'en') {
      setTimeout(() => {
        setLanguage(savedLang);
      }, 0);
    }
  }, []);

  const toggleLanguage = async () => {
    if (isTransitioning) return;
    const newLang = language === 'en' ? 'tr' : 'en';
    // A. Close the curtain
    setIsTransitioning(true);
    // B. Wait for the curtain to close (300ms - in sync with CSS transition duration)
    await new Promise((resolve) => setTimeout(resolve, 300));
    // C. Change the language (User sees a black screen during this)
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // D. Scroll to the top to give the feeling that the page has changed
    window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise((resolve) => setTimeout(resolve, 400));
    // E. Remove the curtain
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