'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import Image from 'next/image';
import heroImage from '@/public/pp.jpeg';
import { useLanguage } from '@/context/LanguageContext';


const Hero = () => {
  const {t, language} = useLanguage();
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">

      {/* --- ARKA PLAN EFEKTLERİ (Tailwind v4 ile güncel) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob [animation-delay:4s]" />

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* --- SOL TARAF --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-xl md:text-2xl text-blue-400 font-medium tracking-wide">
            {t.hero.greeting}
          </h2>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight h-24 md:h-auto">

            {t.hero.iam}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">

               <Typewriter
                  texts={[
                    t.hero.typewriter[0],      // an ERP
                    t.hero.typewriter[1], // a Full Stack
                    t.hero.typewriter[2],          // a Traveler
                    t.hero.typewriter[3]        // a Horse Rider
                  ]}
               />
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-lg">
            {t.hero.desc}
          </p>

            <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer"
            >
              {t.hero.btnProject}
            </motion.button>


            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-slate-600 rounded-full font-semibold hover:bg-slate-800 transition-all cursor-pointer"
            >
              {t.hero.btnContact}
            </motion.button>
          </div>
        </motion.div>

        {/* --- SAĞ TARAF --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute w-[360px] h-[360px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
          <motion.div
            animate={{ y: [0, -20, 0] }} // Yüzen efekt
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-72 md:w-96 aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-slate-800/50 shadow-2xl bg-slate-800 z-10"
          >
             {/* NOTE:
                1. fill: It makes the image cover the entire parent container.
                2. object-cover: It crops the image to fill the container without distortion.
                3. priority: This image should load immediately as it is critical for the LCP score.
             */}
             <Image
               src={heroImage}
               alt="Mertcan Profile"
               fill
               className="object-cover object-center hover:scale-110 transition-transform duration-500"
               priority={true}
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             />

             {/* İsteğe bağlı: Resmin üzerine hafif bir gradient atarak yazılarla bütünleşmesini sağlar */}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;