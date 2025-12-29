// app/blog/[slug]/page.tsx

import React from 'react';
import { getBlogPostBySlug } from '@/lib/api';
import BlogPostView from '@/components/BlogPostView';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO için Metadata Ayarı
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Mertcan Ercan',
    };
  }

  return {
    title: `${post.title} | Mertcan Ercan`,
    description: post.content.substring(0, 160), // İlk 160 karakter meta description
    openGraph: {
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  // 2. Eğer yazı yoksa hata göster (Basit bir 404 ekranı)
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
          <p className="text-xl text-slate-400">Blog post not found in the archives.</p>
          <a href="/blog" className="mt-8 inline-block px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition">
            Back to Mission Control
          </a>
        </div>
      </div>
    );
  }

  // 3. Veriyi Client Component'e gönder
  return <BlogPostView post={post} />;
}