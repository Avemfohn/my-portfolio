// components/BlogContent.tsx
'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost } from '@/types';
import BlogCard from '@/components/BlogCard';

interface BlogContentProps {
  posts: BlogPost[];
  serverError: string | null;
}

const BlogContent = ({ posts, serverError }: BlogContentProps) => {
  const { t } = useLanguage();

  const errorMessage = serverError
    ? (t.blog?.noPostsFound || "While loading posts an error occurred.")
    : null;

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-20 px-6">


      <div className="container mx-auto max-w-6xl mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t.blog?.title || "Latest"} <span className="text-blue-500">{t.blog?.subtitle || "Stories"}</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          {t.blog?.desc || "From my journey."}
        </p>
      </div>

      <div className="container mx-auto max-w-6xl">
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
          <div className="text-center py-20">
            <p className="text-slate-500 text-xl">{t.blog?.noPostsFound}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default BlogContent;