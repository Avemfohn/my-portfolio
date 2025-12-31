// app/blog/[slug]/page.tsx

import React from 'react';
import { getBlogPostBySlug } from '@/lib/api';
import BlogPostView from '@/components/blog/BlogPostView';
import { Metadata } from 'next';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';

interface PageProps {
  params: Promise<{ slug: string }>;

}
const t = dictionary.en;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);


  if (!post) {
    return {
      title: t.blog.noPostsFound
    };
  }

  return {
    title: `${post.title} | Mertcan Ercan`,
    description: post.content.substring(0, 160),
    openGraph: {
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
          <p className="text-xl text-slate-400">{t.blog.noPostsFound}</p>
          <Link href="/blog" className="mt-8 inline-block px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition">
              {t.blog.backToBlog}
          </Link>
        </div>
      </div>
    );
  }
  return <BlogPostView post={post} />;
}