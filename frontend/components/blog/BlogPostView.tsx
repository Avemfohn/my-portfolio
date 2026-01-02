'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Tag, Check } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';
import ReactMarkdown from 'react-markdown';

interface BlogPostViewProps {
  post: BlogPost;
}

const BlogPostView = ({ post }: BlogPostViewProps) => {
  const { t, language } = useLanguage();
  const targetRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.content || t.blog.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log(t.blog.share_cancelled);
      }
    }
    // 2. METHOD: If not supported, copy the link (Desktop Fallback)
    else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        // Revert back after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(t.blog.copy_failed);
      }
    }
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });


  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 200]);


  const displayTitle = (language === 'tr' && post.title_tr) ? post.title_tr : post.title;
  const displayContent = (language === 'tr' && post.content_tr) ? post.content_tr : post.content;
  const displayLocation = (language === 'tr' && post.location_tr) ? post.location_tr : post.location;
  const displayCategory = (language === 'tr' && post.category_detail?.name_tr) ? post.category_detail.name_tr : post.category_detail?.name;

  const formattedDate = new Date(post.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div ref={targetRef} className="bg-slate-900 min-h-screen relative text-slate-200">



      {/* --- 2. HERO SECTION (PARALAKS) --- */}
      <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
  <motion.div
    style={{ opacity, scale, y }}
    className="absolute inset-0 z-0"
  >
    {post.cover_image && (
      <>
        {/* Uzantı kontrolü yapıyoruz */}
        {post.cover_image.match(/\.(mp4|webm|mov|ogg)$/i) ? (
          <video
            src={getImageUrl(post.cover_image)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={getImageUrl(post.cover_image)}
            alt={displayTitle}
            fill
            className="object-cover"
            priority
          />
        )}
      </>
    )}

         <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/60 to-slate-900" />
    </motion.div>

        <div className="relative z-10 container mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {displayCategory && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-sm font-semibold mb-6 backdrop-blur-md">
                {displayCategory}
              </span>
            )}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              {displayTitle}
            </h1>

            {/* Meta Datas */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{formattedDate}</span>
              </div>
              {displayLocation && (
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute -inset-1 bg-green-500/30 rounded-full animate-ping" />
                    <MapPin className="relative w-5 h-5 text-green-400" />
                  </div>
                  <span>{displayLocation}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- 3. CONTENT --- */}
      <div className="container mx-auto px-6 relative z-20 -mt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* A. LEFT SIDEBAR (Sticky on desktop) */}
          <aside className="hidden lg:block w-1/4 relative">
            <div className="sticky top-32 space-y-8">
              {/* Back Button */}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-slate-800 border border-slate-700 group-hover:border-blue-500 transition-all">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{t.blog.backToBlog}</span>
              </Link>

              {/* Share Button */}
              <button
                onClick={handleShare}
                disabled={copied}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors w-full group"
              >
                <div className={`p-2 rounded-full border transition-all duration-300 ${
                  copied
                    ? 'bg-green-500/20 border-green-500/50 text-green-400'
                    : 'bg-slate-800 border-slate-700 group-hover:border-blue-500/50'
                }`}>

                  {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                </div>

                <span className={`text-sm transition-colors ${copied ? 'text-green-400 font-medium' : ''}`}>
                  {copied
                    ? (t.blog.linkCopied)
                    : t.blog.shareThisPost
                  }
                </span>
              </button>
            </div>
          </aside>

          {/* B. MAIN CONTENT (MARKDOWN) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-3/4"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 md:p-12 shadow-2xl">
              <article className="prose prose-lg prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-blue-200
                prose-code:text-orange-300 prose-code:bg-slate-900/80 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
                prose-img:rounded-2xl prose-img:border prose-img:border-slate-700/50
              ">
                <ReactMarkdown>
                  {displayContent || ""}
                </ReactMarkdown>
              </article>
            </div>

            {/* Gallery Area (Optional - If there are images in the gallery) */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                   <Tag className="w-6 h-6 text-blue-500" />
                   Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.gallery.map((item) => (
                    <div key={item.id} className="relative h-64 rounded-2xl overflow-hidden group">
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.caption || "Gallery image"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 text-xs text-center text-white backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default BlogPostView;