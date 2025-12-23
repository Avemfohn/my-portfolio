'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import Image from 'next/image';

const Hero = () => {
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
            Hello, I&apos;m Mertcan 👋
          </h2>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight h-24 md:h-auto">

            I&apos;m

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">

               <Typewriter
                  texts={[
                    ' an ERP Developer',      // an ERP
                    ' a Full Stack Developer', // a Full Stack
                    ' a Traveler 🌍',          // a Traveler
                    ' a Horse Rider 🐎'        // a Horse Rider
                  ]}
               />
            </span>
          </h1>

          <p className="text-slate-300 text-lg max-w-lg">
            I optimize business processes using technology, travel the world in my free time, and collect new stories.
          </p>

          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all cursor-pointer"
            >
              My Projects
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-slate-600 rounded-full font-semibold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Contact Me
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
          <div className="absolute w-[350px] h-[350px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20 animate-pulse" />

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative w-80 h-80 rounded-3xl overflow-hidden border-4 border-slate-800/50 shadow-2xl bg-slate-800"
          >
             <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">
                Image Area
             </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;