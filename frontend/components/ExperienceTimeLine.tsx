'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Experience } from '@/types';
import { useLanguage } from '@/context/LanguageContext'; // Hook import edildi
import { Briefcase, Calendar, MapPin, GraduationCap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { dictionary } from '@/lib/dictionary';

const formatDate = (dateString: string | null, locale: 'en' | 'tr', presentText: string) => {
  if (!dateString) return presentText;

  const date = new Date(dateString);
  const localeString = locale === 'tr' ? 'tr-TR' : 'en-US';

  return date.toLocaleDateString(localeString, { year: 'numeric', month: 'long' });
};


const splitTitle = (title: string) => {
  const parts = title.split(' ');
  const lastWord = parts.pop(); // Son kelimeyi al
  const firstPart = parts.join(' '); // Geri kalanları birleştir
  return { firstPart, lastWord };
};

const getCategoryStyles = (category: string) => {
  switch (category) {
    case 'education':
      return {
        icon: <GraduationCap className="w-5 h-5" />,
        color: 'text-blue-400',
        borderColor: 'border-blue-500',
        bgColor: 'bg-blue-500/10'
      };
    case 'certificate':
      return {
        icon: <Award className="w-5 h-5" />,
        color: 'text-yellow-400',
        borderColor: 'border-yellow-500',
        bgColor: 'bg-yellow-500/10'
      };
    default: // 'work'
      return {
        icon: <Briefcase className="w-5 h-5" />,
        color: 'text-purple-400',
        borderColor: 'border-purple-500',
        bgColor: 'bg-purple-500/10'
      };
  }
};

const ExperienceTimeline = ({ data }: { data: Experience[] }) => {
  const { t, language } = useLanguage(); // Context'ten verileri çek
  const containerRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 3;

  const visibleData = isExpanded ? data : data.slice(0, initialCount);
  const showButton = data.length > initialCount;
const presentText = t.experience.present;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const { firstPart, lastWord } = splitTitle(t.experience.title);

  return (
    <section className="py-20 bg-slate-900 text-white overflow-hidden" id="experience">
      <div className="container mx-auto px-6 relative" ref={containerRef}>

        <div className="text-center mb-16">
           <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {/* Dinamik Başlık */}
            {firstPart} <span className="text-purple-500">{lastWord}</span>
          </motion.h2>
          <p className="text-slate-400">
            {t.experience.subtitle} {/* Dinamik Alt Başlık */}
          </p>
        </div>

        {/* TIMELINE LISTESI */}
        <div className="relative max-w-5xl mx-auto">

          {/* ORTA ÇİZGİ */}
          <div className="absolute left-8 lg:left-1/2 w-0.5 h-full bg-slate-800 transform -translate-x-1/2" />

          <div className="space-y-12">

            <AnimatePresence>
              {visibleData.map((item: any, index: number) => (
                <motion.div key={item.id} layout>
                <TimelineCard
                  key={item.id}
                  data={item}
                  index={index}
                  language={language}
                  presentText={presentText}
                />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* --- FADE EFEKTİ VE BUTON --- */}
          {showButton && (
            <div className="relative mt-12 z-20">

              {/* 1. FADE OUT EFEKTİ (Sadece kapalıyken görünür) */}
              {!isExpanded && (
                <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent pointer-events-none" />
              )}

              {/* 2. BUTON */}
              <div className="text-center relative">
                 {/* Çizgiyi kapatan minik bir kutu (Estetik) */}
                 <div className="absolute left-8 lg:left-1/2 top-0 w-4 h-4 bg-slate-900 transform -translate-x-1/2 -translate-y-1/2" />

                 <motion.button
                   onClick={() => setIsExpanded(!isExpanded)}
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-full text-slate-300 hover:text-white transition-all shadow-lg text-sm font-medium group"
                 >
                   {isExpanded ? (
                     <>
                       {t.experience.showLess} <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                     </>
                   ) : (
                     <>
                       {t.experience.showMore} <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                     </>
                   )}
                 </motion.button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};

// --- TIMELINE CARD ---
// Props'a language ve presentText eklendi
const TimelineCard = ({
  data,
  index,
  language,
  presentText
}: {
  data: Experience,
  index: number,
  language: 'en' | 'tr',
  presentText: string
}) => {
  const isEven = index % 2 === 0;
  const { t } = useLanguage();
  const styles = getCategoryStyles(data.category);
  const categoryLabel = t.experience.category[data.category as 'work' | 'education' | 'certificate'];
  const descriptionToShow = (language === 'tr' && data.description_tr)
    ? data.description_tr
    : data.description;
  return (
    <div className={`relative flex items-center justify-between ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      <div className="hidden lg:block w-5/12" />
      <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 z-20">
        <div className={`w-10 h-10 bg-slate-900 border-4 ${styles.borderColor} rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20`}>
          <div className={`${styles.color}`}>
             {styles.icon}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full pl-20 lg:pl-0 lg:w-5/12"
      >
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-500/20 group">
          <div className={`absolute top-0 right-0 w-24 h-24 ${styles.bgColor} blur-[40px] rounded-full -mr-10 -mt-10 pointer-events-none`} />

          {/* Tarih ve Kategori Adı */}
          <div className={`flex items-center gap-2 ${styles.color} text-sm font-bold mb-2`}>
            <Calendar className="w-4 h-4" />
            {formatDate(data.start_date, language, presentText)} - {formatDate(data.end_date, language, presentText)}
            <span className="ml-auto text-xs opacity-70 border border-current px-2 py-0.5 rounded-full uppercase tracking-wider">
               {categoryLabel}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {data.title}
          </h3>

          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <Briefcase className="w-4 h-4" />
            <span>{data.company}</span>
            <span className="mx-1">•</span>
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>

          <div className="text-sm mb-4 leading-relaxed">
            <ul className="list-none space-y-1">
              {formatDescription(descriptionToShow)}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-slate-700/50 text-xs text-blue-200 rounded-full border border-slate-600/50">
                #{skill.name}
              </span>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
};

// Bu fonksiyon aynı kalıyor, metin formatlama yaptığı için çeviriye ihtiyacı yok.
const formatDescription = (description: string) => {
  return description.split('\n').map((line, index) => {
    if (!line.trim()) return null;

    if (line.trim().startsWith('-')) {
      return (
        <li key={index} className="flex items-start gap-2 mb-1">
          <span className="mt-1.5 w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
          <span className="text-slate-300">{line.replace('-', '').trim()}</span>
        </li>
      );
    }

    return (
      <p key={index} className="mb-2 text-slate-300">
        {line}
      </p>
    );
  });
};

export default ExperienceTimeline;