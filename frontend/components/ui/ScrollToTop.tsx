'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
       <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            // GÜNCELLENEN KISIM BURASI:
            className="fixed bottom-8 right-8 p-3
                        bg-slate-800/50 backdrop-blur-md
                        border border-slate-700
                        text-slate-400
                        hover:text-blue-400 hover:border-blue-500/50 hover:bg-slate-800
                        rounded-full
                        shadow-lg shadow-black/20
                        z-40 transition-all cursor-pointer"
            >
            {/* İkonu da bir tık küçülttüm (w-6 yerine w-5) daha kibar dursun diye */}
            <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;