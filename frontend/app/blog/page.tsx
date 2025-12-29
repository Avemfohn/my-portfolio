import React from 'react';
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/types';
import BlogContent from '@/components/BlogContent';
import BlogHero from '@/components/BlogHero'; // <--- EKLENDİ

export const metadata = {
  title: 'Blog | Mertcan Ercan',
  description: 'Sharing my experiences in ERP, Full Stack Development, and travel stories.',
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

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
       <BlogContent posts={posts} serverError={error} />
    </div>
  </main>
);
}