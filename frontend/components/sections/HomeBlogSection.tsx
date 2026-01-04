'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BlogPost } from '@/types';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

interface HomeBlogProps {
  posts: BlogPost[];
}

// Ayrı bir component oluşturmak yönetimi kolaylaştırır
const HomeBlogCard = ({ post, i, language, t }: { post: BlogPost, i: number, language: string, t: any }) => {

  const title = (language === 'tr' && post.title_tr) ? post.title_tr : post.title;

  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const coverImageRaw = post.cover_image || "";
  const isVideo = Boolean(coverImageRaw.toLowerCase().match(/\.(mp4|webm|mov|ogg)$/i));
  const videoUrl = getImageUrl(coverImageRaw);

  useEffect(() => {
    if (videoRef.current && isVideo) {
      if (isHovered) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isVideo]);

  const staticImageSource = post.preview_image || post.cover_image || "";
  const staticImageUrl = getImageUrl(staticImageSource);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full w-full">
        {/* --- Media Area --- */}
        <div className="absolute inset-0">
          {(post.preview_image || post.cover_image) ? (
                      <Image
                        src={staticImageUrl}
                        alt={title}
                        fill
                        // Video varsa ve hover yapıldıysa resim görünmez olsun ki video net gözüksün (opsiyonel)
                        // Z-Index: 10 (Altta)
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                              ${isHovered ? 'scale-[1.3]' : 'scale-[1.2]'}
                            `}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                  ) : (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">
                          {t.blog?.noImg || "No Image"}
                      </div>
                  )}

                  {/* KATMAN 2: VİDEO (ÜST KATMAN)
                      Sadece 'isVideo' true ise render edilir.
                      Z-Index: 20 (Üstte)
                      Opacity: Başlangıçta 0 (Görünmez), Hover olunca 100 (Görünür).
                  */}
                  {isVideo && (
                      <video
                        ref={videoRef}
                        src={videoUrl}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                       className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-20
                          ${isHovered
                            ? 'opacity-100 scale-[1.5]'
                            : 'opacity-0 scale-[1.4]'}
                        `}
                        style={{ objectFit: 'cover' }}
                      />
                  )}


          {/* Darkening Gradient: İçeriğin okunması için şart */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500 z-10" />
        </div>

        {/* --- Content Overlay --- */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
          {i === 0 && (
            <div className="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse uppercase">
              {t.blog.new}
            </div>
          )}

          <span className="inline-block text-blue-400 text-sm font-medium mb-3 tracking-wider uppercase">
            {language === 'tr' ? post.category_detail?.name_tr : post.category_detail?.name}
          </span>

          <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>{t.blog.readArticle}</span>
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const HomeBlogSection = ({ posts }: HomeBlogProps) => {
  const { t, language } = useLanguage();
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
              {t.blog.heading} <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-slate-400 max-w-lg text-lg">{t.blog.desc}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link href="/blog" className="group flex items-center gap-2 text-white border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-800 hover:border-blue-500 transition-all">
              {t.blog.readAllArticles} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => (
            <HomeBlogCard key={post.id} post={post} i={i} language={language} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogSection;