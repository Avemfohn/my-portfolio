// components/BlogContent.tsx
'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BlogPost, Category } from '@/types';
import BlogCard from '@/components/blog/BlogCard';
import { LayoutGrid, ListFilter, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogContentProps {
  posts: BlogPost[];
  categories: Category[];
  serverError: string | null;
}

const BlogContent = ({ posts, categories, serverError }: BlogContentProps) => {
  const { t, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = posts.filter((post) => {
    const title = post.title?.toLowerCase() || '';
    const titleTr = post.title_tr?.toLowerCase() || '';
    const content = post.content?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    const matchesSearch = title.includes(query) || titleTr.includes(query) || content.includes(query);

    // 2. Category
    let matchesCategory = true;
    if (selectedCategory !== 'All') {
       const catNameEn = post.category_detail?.name;
       const catNameTr = post.category_detail?.name_tr;
       matchesCategory = catNameEn === selectedCategory || catNameTr === selectedCategory;
    }

    return matchesSearch && matchesCategory;
  });

  const errorMessage = serverError
    ? (t.blog?.noPostsFound || "While loading posts an error occurred.")
    : null;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="relative z-20 bg-slate-900 min-h-screen pt-12 pb-20 px-6 rounded-t-[2.5rem] border-t border-slate-700/50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="container mx-auto max-w-6xl">

        {/* --- (HEADER & FILTERS) --- */}
        <div className="flex flex-col gap-8 mb-10 pb-8 border-b border-slate-800">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            {/* Left: Title */}
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <LayoutGrid className="w-6 h-6 text-blue-500" />
                {language === 'en' ? "All Articles" : "Tüm Yazılar"}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                {t.blog.exploreLatest}
              </p>
            </div>

            {/* Right: Search Box */}
            <div className="relative group w-full md:w-72">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
               </div>
               <input
                 type="text"
                 placeholder={language === 'tr' ? "Yazılarda ara..." : "Search articles..."}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-full py-2.5 pl-9 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all placeholder:text-slate-600"
               />
               {searchQuery && (
                 <button
                   onClick={() => setSearchQuery('')}
                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
                 >
                   <X className="h-3 w-3" />
                 </button>
               )}
            </div>
          </div>

          {/* Bottom: Category Buttons & Results Count */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
               {/* 'All' Button */}
               <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                      selectedCategory === 'All'
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {language === 'en' ? 'All' : 'Tümü'}
                </button>

                {/* Dynamic Categories */}
                {(categories || []).map((cat) => {
                    const catName = (language === 'tr' && cat.name_tr) ? cat.name_tr : (cat.name || '');
                    if (!catName) return null;

                    return (
                      <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(catName)}
                          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
                          selectedCategory === catName
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'
                          }`}
                      >
                          {catName}
                      </button>
                    );
                })}
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-slate-500 text-xs bg-slate-800/30 px-3 py-1.5 rounded-full border border-slate-700/50 whitespace-nowrap ml-auto md:ml-0">
               <ListFilter className="w-3 h-3" />
               <span>{filteredPosts.length} {language === 'en' ? t.blog.postsFound : t.blog.postsFound}</span>
            </div>
          </div>
        </div>

        {/* --- CONTENT (GRID) --- */}
        {errorMessage ? (
          <div className="text-center py-20 bg-slate-800/50 rounded-2xl border border-red-500/20">
            <p className="text-red-400">{errorMessage}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BlogCard post={post} index={index} />
                  </motion.div>
                ))
              ) : (
                /* SONUÇ YOKSA */
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="col-span-full py-20 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700 text-center"
                >
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-3">
                      <Search className="w-6 h-6 text-slate-500" />
                   </div>
                   <p className="text-slate-500 text-lg mb-2">
                     {t.blog?.noPostsFound}
                   </p>
                   <button
                      onClick={clearFilters}
                      className="text-blue-400 hover:underline text-sm"
                   >
                      {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
                   </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogContent;