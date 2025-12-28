'use client';

import React from 'react';
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

const HomeBlogSection = ({ posts }: HomeBlogProps) => {
  const { t, language } = useLanguage();

  // Sadece son 3 yazıyı gösterelim
  const recentPosts = posts.slice(0, 3);

  if (recentPosts.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900">

      {/* Arka Plan Süslemeleri */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-600/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">

        {/* --- BAŞLIK ALANI --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
              {language === 'en' ? "Beyond the Code" : "Kodun Ötesinde"}
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </h2>
            <p className="text-slate-400 max-w-lg text-lg">
              {language === 'en'
                ? "Sharing my journey through technology, travel, and life."
                : "Teknoloji, seyahat ve hayata dair yolculuğumdan notlar."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-white border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-800 hover:border-blue-500 transition-all"
            >
              {language === 'en' ? "Read All Articles" : "Tüm Yazıları Oku"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* --- KARTLAR (GRID) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post, i) => {
             // Dil kontrolü
             const title = (language === 'tr' && post.title_tr) ? post.title_tr : post.title;
             const category = (language === 'tr' && post.category_detail?.name_tr) ? post.category_detail.name_tr : post.category_detail?.name;

             return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full w-full">

                  {/* Resim */}
                  <div className="absolute inset-0">
                    {post.cover_image ? (
                      <Image
                        src={getImageUrl(post.cover_image)}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800" />
                    )}
                    {/* Karartma Gradyanı */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  </div>

                  {/* İçerik (Resmin Üzerine Biniyor) */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">

                    {/* En yeni yazıya "NEW" etiketi */}
                    {i === 0 && (
                      <div className="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg animate-pulse">
                        NEW
                      </div>
                    )}

                    {/* Kategori */}
                    <span className="inline-block text-blue-400 text-sm font-medium mb-3 tracking-wider uppercase">
                      {category}
                    </span>

                    {/* Başlık */}
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                      {title}
                    </h3>

                    {/* Okuma Süresi / Tarih vb. */}
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HomeBlogSection;