'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed top-6 right-6 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-full shadow-xl hover:bg-white/20 transition-all text-2xl"
      title="Dili Değiştir / Change Language"
    >
      {language === 'en' ? '🇹🇷' : '🇬🇧'}
    </motion.button>
  );
};

export default LanguageToggle;