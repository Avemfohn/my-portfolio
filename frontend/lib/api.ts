import axios from 'axios';
import { BlogPost, Category } from '@/types';

const isServer = typeof window === 'undefined';


const baseURL = isServer
  ? process.env.INTERNAL_API_URL || 'http://backend:8000/api'
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});

// --- IMAGE HELPER ---
export const getImageUrl = (path?: string) => {
  if (!path) return '/placeholder.png';

  const internalPrefix = 'http://django-web:8000';
  const publicPrefix = 'http://localhost:8000';


  if (path.startsWith(internalPrefix)) {
    return path.replace(internalPrefix, publicPrefix);
  }
  if (path.startsWith('http')) return path;

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || publicPrefix;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${mediaUrl}${cleanPath}`;
};

// --- API CALLS ---

// Projects
export const getProjects = async () => {
  const response = await api.get('/portfolio/projects/');
  return response.data;
};

// Experiences (Native fetch for caching control)
export const getExperiences = async () => {
  const res = await fetch(`${baseURL}/portfolio/experiences/`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) throw new Error('Failed to fetch experiences');
  return res.json();
};

// Contact
export const sendContactMessage = async (data: { name: string; email: string; message: string }) => {
  const payload = {
    ...data,
    subject: "Website Contact Form"
  };
  const response = await api.post('/portfolio/contact/', payload);
  return response.data;
};

// --- BLOG SECTION


export const getBlogPosts = async (): Promise<BlogPost[]> => {

  const res = await fetch(`${baseURL}/blog/posts/`, {
    next: { revalidate: 60 },
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    // It will be changed in production
    throw new Error('Failed to fetch blog posts');
  }

  return res.json();
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const res = await fetch(`${baseURL}/blog/posts/${slug}/`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
      return undefined;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return undefined;
  }
};


export const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${baseURL}/blog/categories/`, {
    cache: 'force-cache',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) return [];
  return res.json();
};

export default api;