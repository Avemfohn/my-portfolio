// app/loading.tsx
'use client'; // Bu satır en üstte olmalı çünkü framer-motion kullanıyoruz

import { motion } from 'framer-motion';
import Image from 'next/image';

const logoSrc = '/loading-logo.jpg'; // Dosya adını kontrol et

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a192f] flex flex-col items-center justify-center">

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
            duration: 0.3
}}
        className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-[0_0_80px_rgba(59,130,246,0.5)]"
      >
        <Image
          src={logoSrc}
          alt="Loading..."
          fill
          className="object-cover"
          priority
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="absolute inset-0 bg-white mix-blend-overlay"
        />
      </motion.div>

      <motion.p
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="mt-8 text-blue-400/80 text-sm tracking-[0.3em] font-medium animate-pulse"
      >
        LOADING
      </motion.p>
    </div>
  );
}