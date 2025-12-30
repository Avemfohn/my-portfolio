'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from '@/components/ui/Typewriter';
import Image from 'next/image';
import heroImage from '@/public/pp.jpeg';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white pt-20 md:pt-0">

      <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">


        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 text-center md:text-left"
        >

          <h2 className="text-xl md:text-2xl text-blue-400 font-medium tracking-wide">
            {t.hero.greeting}
          </h2>


          <h1 className="text-4xl md:text-6xl font-bold leading-tight min-h-[160px] md:min-h-auto flex flex-col md:block">
            {t.hero.iam}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">

               <Typewriter
                 texts={[
                   t.hero.typewriter[0], // an ERP
                   t.hero.typewriter[1], // a Full Stack
                   t.hero.typewriter[2], // a Traveler
                   t.hero.typewriter[3]  // a Horse Rider
                 ]}
               />
            </span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
            {t.hero.desc}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all"
            >
              {t.hero.btnProject}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-slate-600 rounded-full font-semibold text-white hover:bg-slate-800 hover:border-white transition-all"
            >
              {t.hero.btnContact}
            </motion.button>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE (IMAGE & EFFECTS) --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center mt-10 md:mt-0"
        >
          {/* Floating Container */}
          <motion.div
            animate={{ y: [0, -20, 0] }} // Slowly float up and down
            transition={{
              repeat: Infinity,
              duration: 6, // One cycle every 6 seconds (Slower and more peaceful)
              ease: "easeInOut"
            }}
            className="relative w-72 md:w-[400px] aspect-[3/4]"
          >
            {/* 1. GLOW EFFECT (Neon light behind the image) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[2rem] blur-2xl opacity-40 -z-10 transform translate-y-4 scale-95" />

            {/* 2. IMAGE FRAME */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-slate-800">
              <Image
                src={heroImage}
                alt="Mertcan Profile"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />


              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 3. BADGE (Bottom right corner) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-5 -right-5 bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl flex items-center gap-2 z-20"
            >
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-slate-300">{t.hero.workStatus}</span>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;