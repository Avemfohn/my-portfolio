// app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden text-center px-4">

      {/* Uzay Arka Plan Efektleri */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        {/* Dev 404 Yazısı */}
        <h1 className="text-[120px] md:text-[200px] font-bold text-slate-800/50 leading-none select-none tracking-tighter">
          404
        </h1>

        {/* Üstüne Binen Mesaj */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
           <span className="text-2xl md:text-4xl font-bold text-white drop-shadow-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
             {t.notFound.heading}
           </span>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-400 mt-8 max-w-md text-lg leading-relaxed"
      >
        {t.notFound.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-blue-500 text-white rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {t.notFound.button}
        </Link>
      </motion.div>
    </div>
  );
}