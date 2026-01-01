// app/sitemap.ts

import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mertcanercan.com';


  const posts = await getBlogPosts();


  const blogUrls = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastModified: new Date((post as any).date || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));


  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...blogUrls,
  ];
}