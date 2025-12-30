'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const smallLogoSrc = '/loading-logo.jpg';

const HomeLink = () => {
  const pathname = usePathname();

  let navConfig = null;

  if (pathname === '/') {
    navConfig = {
      href: '/blog',
      text: 'Blog',
      icon: <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />,
    };
  } else if (pathname === '/blog') {
    navConfig = {
      href: '/',
      text: 'Ana Sayfa',
      icon: <ArrowLeft className="w-5 h-5 text-blue-400 group-hover:-translate-x-1 transition-transform" />
    };
  }

  if (!navConfig) return null;

  return (
    <AnimatePresence mode="wait">
      <Link href={navConfig.href} key={navConfig.href}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="fixed top-6 left-6 z-50 flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white hover:bg-white/20 transition-all cursor-pointer group"
        >
          {pathname === '/blog' ? (
             <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors">
               <Image
                 src={smallLogoSrc}
                 alt="Home"
                 fill
                 className="object-cover"
               />
             </div>
          ) : (
             <div className="p-1.5 bg-blue-500/20 rounded-full border border-blue-400/30">
                {navConfig.icon}
             </div>
          )}

          <span className="hidden md:block font-medium text-sm tracking-wide">
            {navConfig.text}
          </span>
          {pathname === '/' && (
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          )}

        </motion.div>
      </Link>
    </AnimatePresence>
  );
};

export default HomeLink;