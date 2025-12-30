// components/BlogContent.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost } from '@/types';
import BlogCard from '@/components/blog/BlogCard';
import { LayoutGrid, ListFilter } from 'lucide-react'; // İkonlar ekledik

interface BlogContentProps {
  posts: BlogPost[];
  serverError: string | null;
}

const BlogContent = ({ posts, serverError }: BlogContentProps) => {
  const { t, language } = useLanguage();

  const errorMessage = serverError
    ? (t.blog?.noPostsFound || "While loading posts an error occurred.")
    : null;

  return (

    <div className="relative z-20 bg-slate-900 min-h-screen pt-12 pb-20 px-6 rounded-t-[2.5rem] border-t border-slate-700/50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

      <div className="container mx-auto max-w-6xl">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="w-6 h-6 text-blue-500" />
              {language === 'en' ? "All Articles" : "Tüm Yazılar"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {language === 'en'
                ? t.blog.exploreLatest
                : t.blog.exploreLatest}
            </p>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
            <ListFilter className="w-4 h-4" />
            <span>{posts.length} {language === 'en' ? t.blog.postsFound : t.blog.postsFound}</span>
          </div>
        </div>
        {errorMessage ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-red-500/20">
            <p className="text-red-400">{errorMessage}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">
            <p className="text-slate-500 text-xl">{t.blog?.noPostsFound}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default BlogContent;