// app/blog/page.tsx
import React from 'react';
import { getBlogPosts } from '@/lib/api';
import { BlogPost } from '@/types';
import BlogContent from '@/components/BlogContent';

export const metadata = {
  title: 'Blog | Mertcan Ercan',
  description: 'Sharing my experiences in ERP, Full Stack Development, and travel stories.',
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    // Veriyi sunucuda çekiyoruz
    posts = await getBlogPosts();
  } catch (err) {
    console.error("Blog posts fetch error:", err);
    error = "Error fetching posts"; // Hatayı string olarak tutuyoruz
  }

  // Veriyi Client Component'e teslim ediyoruz
  return (
    <main>
      <BlogContent posts={posts} serverError={error} />
    </main>
  );
}