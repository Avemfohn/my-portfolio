'use client';

import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const BlogHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t, language } = useLanguage();

  const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleScroll = () => {

    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let phi = 4.7;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200 * 2, // Çözünürlük
      height: 1200 * 2,
      phi: 0,
      theta: 0.25, // Hafif eğiklik
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.1, 0.1, 0.2],
      markerColor: [0.2, 0.5, 1],
      glowColor: [0.3, 0.3, 0.5],
      opacity: 0.9,
      offset: [0, 0],
      markers: [
        { location: [41.0082, 28.9784], size: 0.1 },  // Istanbul (Home Base)
        { location: [49.4521, 11.0767], size: 0.03 }, // Nuremberg
        { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
        { location: [50.0755, 14.4378], size: 0.05 }, // Prag
        { location: [41.9028, 12.4964], size: 0.05 }, // Roma
        { location: [47.3769, 8.5417], size: 0.03 },  // Zurich
        { location: [48.5734, 7.7521], size: 0.03 },  // Alsace (Strasbourg)
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [55.6761, 12.5683], size: 0.05 }, // Copenhagen
        { location: [56.9496, 24.1052], size: 0.03 }, // Riga
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.002; // Slower rotation
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-slate-900">

      {/* Background Lights (Soft light behind the text on the left) */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 h-full items-center relative z-20">

        {/* --- 1. LEFT SIDE: TEXT --- */}
            <div className="text-left z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="pointer-events-auto"
          >
            <h1 className="text-4xl md:text-8xl font-bold text-white tracking-tighter leading-tight">
              {language === 'en' ? "My Journey" : "Yolculuğum"}
              <span className="text-blue-500">.</span>
            </h1>
            <p className="text-slate-400 mt-4 text-sm md:text-xl max-w-[180px] md:max-w-lg leading-relaxed">
              {language === 'en' ? t.blog.description : t.blog.description}
            </p>
          </motion.div>
        </div>

        {/* --- 2. RIGHT SIDE: GLOBE (CANVAS) --- */}
        {/* Desktop: right-[-25%] -> Stuck to the right and half outside
            Mobile: bottom-[-10%] -> At the bottom
        */}
              <div className="relative h-full flex items-center">
          {/* Mobilde: Sola doğru taşması için left-[-20%] verdik,
              bu sayede metnin hafifçe arkasına/üstüne girer.
          */}
          <div className="absolute left-[-20%] md:left-0 md:relative w-[150vw] md:w-[65vw] aspect-square z-10">
            <canvas
              ref={canvasRef}
              className="w-full h-full opacity-80 md:opacity-100"
            />
          </div>
        </div>

      </div>

      {/* --- SCROLL BUTTON (NOW WORKING) --- */}
      {isVisible && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-slate-500/80 cursor-pointer hover:text-blue-400 transition-colors"
        onClick={handleScroll}
      >
        <span className="text-xs uppercase tracking-widest">
          {language === 'en' ? t.blog.scrollText : t.blog.scrollText}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
      )}
    </div>
  );
};

export default BlogHero;