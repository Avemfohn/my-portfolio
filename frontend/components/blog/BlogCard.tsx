'use client';

import React, { useState,useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, MapPin } from 'lucide-react';
import { BlogPost } from '@/types';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';


interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const { t, language } = useLanguage();


  const displayTitle = (language === 'tr' && post.title_tr)
    ? post.title_tr
    : post.title;

  const rawContent = (language === 'tr' && post.content_tr)
    ? post.content_tr
    : post.content;
  const displayContent = rawContent ? rawContent.slice(0, 150) + "..." : "";

  const displayLocation = (language === 'tr' && post.location_tr)
    ? post.location_tr
    : post.location;

  const displayCategory = (language === 'tr' && post.category_detail?.name_tr)
    ? post.category_detail.name_tr
    : post.category_detail?.name;


  const formattedDate = new Date(post.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const coverImageRaw = post.cover_image || "";
  const isVideo = Boolean(coverImageRaw.toLowerCase().match(/\.(mp4|webm|mov|ogg)$/i));
  const videoUrl = getImageUrl(coverImageRaw);


  const staticImageSource = post.preview_image || post.cover_image || "";
  const staticImageUrl = getImageUrl(staticImageSource);


  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideo) {
      if (isHovered) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isHovered, isVideo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/10 h-full"
    >
      {/* --- Media Area --- */}
      <Link href={`/blog/${post.slug}`} className="relative w-full aspect-[16/9] overflow-hidden block bg-slate-900">

        {/* --- YENİ YAPI BAŞLIYOR --- */}

        {/* KATMAN 1: SABİT RESİM (ZEMİN)
            Bu her zaman render edilir. Kullanıcı siteye girdiği an bunu görür.
            404 Hatası almazsın çünkü buraya 'preview_image' gelecek.
        */}
        {(post.preview_image || post.cover_image) ? (
            <Image
              src={staticImageUrl}
              alt={displayTitle}
              fill
              priority={index < 3}
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

        {/* --- YENİ YAPI BİTİYOR --- */}

        {/* Category Badge */}
        {displayCategory && (
          <div className="absolute top-4 left-4 z-30 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {displayCategory}
          </div>
        )}
      </Link>

      {/* --- Content Area --- (Aynı kalıyor) */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
          <div className="flex items-center gap-1">
            <span suppressHydrationWarning><Calendar className="w-3.5 h-3.5" /></span>
            <span suppressHydrationWarning>{formattedDate}</span>
          </div>
          {displayLocation && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{displayLocation}</span>
            </div>
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
            {displayTitle}
          </h3>
        </Link>

        <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
          {displayContent}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group/link"
            >
              {t.blog?.readMore || "Read Article"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;