// app/blog/[slug]/page.tsx

import React from 'react';
import { getBlogPostBySlug } from '@/lib/api';
import BlogPostView from '@/components/blog/BlogPostView';
import { Metadata } from 'next';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { notFound } from 'next/navigation';

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
    notFound();
  }
  return <BlogPostView post={post} />;
}