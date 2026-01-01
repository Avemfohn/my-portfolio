import React from 'react';
import { getBlogPosts, getCategories } from '@/lib/api';
import { BlogPost } from '@/types';
import BlogContent from '@/components/blog/BlogContent';
import BlogHero from '@/components/blog/BlogHero';

export const metadata = {
  title: 'Blog | Mertcan Ercan',
  description: 'Sharing my experiences in ERP, Full Stack Development, and travel stories.',
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;
  const categories = await getCategories();
  try {
    posts = await getBlogPosts();
  } catch (err) {
    console.error("Blog posts fetch error:", err);
    error = "Error fetching posts";
  }

  return (
  <main className="bg-slate-900">
    <BlogHero />

    {/* -mt-20 yaparak paneli dünyanın üzerine bindiriyoruz */}
    <div className="-mt-20 relative z-20">
       <BlogContent posts={posts} categories={categories || []}  serverError={error} />
    </div>
  </main>
);
}