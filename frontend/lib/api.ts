import axios from 'axios';
import { BlogPost, Category } from '@/types';

const isServer = typeof window === 'undefined';

// 1. BASE URL AYARI
// Lokaldeysek ve Server tarafındaysak (SSR): Docker içindeki 'django-web'i kullan.
// Diğer her durumda (Canlı veya Tarayıcı): Public URL'i kullan.
const baseURL = isServer
  ? (process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL)
  : process.env.NEXT_PUBLIC_API_URL;

// Fallback: Eğer env gelmezse localhost'a düş (Güvenlik ağı)
const finalBaseURL = baseURL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

if (isServer) {
    console.log("🚀 VERCEL SERVER LOGS:");
    console.log("API URL:", finalBaseURL);
    console.log("ENV Yüklü mü?:", process.env.PORTFOLIO_API_SECRET ? "EVET" : "HAYIR");
    // Şifrenin ilk 3 harfini bas ki doğru mu görelim (tamamını basma güvenlik riski)
    console.log("Şifre İpucu:", process.env.PORTFOLIO_API_SECRET?.substring(0, 3) + "...");
  }

  if (isServer && process.env.PORTFOLIO_API_SECRET) {
    headers['X-Portfolio-Secret'] = process.env.PORTFOLIO_API_SECRET;
  }

  return headers;
};


const api = axios.create({
  baseURL: finalBaseURL,
  headers: getAuthHeaders(),
});

// --- IMAGE HELPER (RESİM URL DÜZELTİCİ) ---
export const getImageUrl = (path?: string) => {
  if (!path) return '/placeholder.png';

  if (path.includes('cloudinary.com')) {
    return path;
  }

  // Public (Tarayıcıda çalışacak) URL kökü
  const publicRoot = process.env.NEXT_PUBLIC_MEDIA_URL || 'http://localhost:8000';

  // Eğer tam link geldiyse (http://...)
  if (path.startsWith('http')) {
    // Docker içindeki container adlarını manuel olarak yakala ve değiştir
    // Bu sayede Server (SSR) da render ederken 'localhost' yazar.
    if (path.includes('django-web:8000')) {
        return path.replace('http://django-web:8000', publicRoot);
    }
    if (path.includes('backend:8000')) {
        return path.replace('http://backend:8000', publicRoot);
    }
    if (path.includes('127.0.0.1:8000')) {
       return path.replace('http://127.0.0.1:8000', publicRoot);
    }

    // Zaten düzgünse dokunma
    return path;
  }

  // 2. Eğer relative link geldiyse (/media/resim.jpg)
  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${mediaUrl}${cleanPath}`;
};

// --- API CALLS ---

// Projects
export const getProjects = async () => {
  const response = await api.get('/portfolio/projects/');
  return response.data;
};

// Experiences
export const getExperiences = async () => {
  const res = await fetch(`${finalBaseURL}/portfolio/experiences/`, {
    cache: 'no-store',
    headers: getAuthHeaders(),
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

// --- BLOG SECTION ---

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // next: { revalidate: 60 } Next.js cache mantığıdır.
  const res = await fetch(`${finalBaseURL}/blog/posts/`, {
    next: { revalidate: 60 },
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    console.error("Failed to fetch posts:", res.status, res.statusText);
    // Hata fırlatmak yerine boş dizi dönmek bazen UI'ı kırmamak için daha iyidir
    // Ama senin yapında Error Boundary varsa throw kalabilir.
    return [];
  }

  return res.json();
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  try {
    const res = await fetch(`${finalBaseURL}/blog/posts/${slug}/`, {
      cache: 'no-store',
      headers: getAuthHeaders(),
    });

    if (!res.ok) return undefined;
    return res.json();
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return undefined;
  }
};


export const getCategories = async (): Promise<Category[]> => {
  try {
      const res = await fetch(`${finalBaseURL}/blog/categories/`, {
        cache: 'force-cache',
        headers: getAuthHeaders(),
      });

      if (!res.ok) return [];
      return res.json();
  } catch (error) {
      console.error("Categories fetch error", error);
      return [];
  }
};

export default api;