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

  // Scroll visibility logic
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

  // Globe Logic
  useEffect(() => {
    let phi = 4.7;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 0,
      theta: 0.25,
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
        { location: [41.0082, 28.9784], size: 0.1 },  // Istanbul
        { location: [49.4521, 11.0767], size: 0.03 }, // Nuremberg
        { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
        { location: [50.0755, 14.4378], size: 0.05 }, // Prag
        { location: [41.9028, 12.4964], size: 0.05 }, // Roma
        { location: [47.3769, 8.5417], size: 0.03 },  // Zurich
        { location: [48.5734, 7.7521], size: 0.03 },  // Strasbourg
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [55.6761, 12.5683], size: 0.05 }, // Copenhagen
        { location: [56.9496, 24.1052], size: 0.03 }, // Riga
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.002;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden bg-slate-900">

      {/* Arkaplan Işıkları */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* --- GLOBE CONTAINER (BACKGROUND LAYER) --- */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center lg:block">

        {/* Globe Positioning Wrapper */}
        <div className="
            absolute

            /* --- MOBİL & TABLET (iPad Dahil) --- */
            /* Yukarıdan sarkıtıyoruz ama çok yukarı kaçıp kesilmesin diye top-[-5%] yaptık */
            top-[-5%]
            left-1/2
            -translate-x-1/2
            w-[120vw] md:w-[90vw] /* Tablette biraz daha derli toplu olsun */
            opacity-40

            /* --- GENİŞ MASAÜSTÜ (Large Screens - lg: ) --- */
            /* Burası senin eski sevdiğin ayar */
            lg:top-auto
            lg:bottom-auto
            lg:left-auto
            lg:right-[-5%]    /* -30% yerine -5% yaptık ki ekrana geri dönsün */
            lg:translate-x-0
            lg:w-[55vw]       /* Boyutu masaüstü için ideal */
            lg:opacity-100

            aspect-square
            transition-all duration-1000 ease-in-out
        ">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', contain: 'layout paint' }}
          />
        </div>
      </div>

      {/* --- CONTENT CONTAINER (FOREGROUND LAYER) --- */}
      <div className="container mx-auto px-6 h-full flex items-center relative z-20">
        <div className="grid lg:grid-cols-2 w-full items-center">

          {/* --- LEFT SIDE: TEXT --- */}
          <div className="text-left pt-40 md:pt-48 lg:pt-0">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-mono mb-6 backdrop-blur-md"
            >
              {language === 'en' ? t.blog.badge : t.blog.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-tight drop-shadow-2xl"
            >
              {language === 'en' ? "My Journey" : "Yolculuğum"}
              <span className="text-blue-500">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-300 mt-6 text-lg md:text-xl max-w-lg leading-relaxed drop-shadow-md"
            >
              {language === 'en'? t.blog.description : t.blog.description}
            </motion.p>
          </div>

          {/* Sağ taraf masaüstünde boş bırakılıyor ki dünya oraya otursun */}
          <div className="hidden lg:block"></div>
        </div>
      </div>

      {/* --- SCROLL BUTTON --- */}
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