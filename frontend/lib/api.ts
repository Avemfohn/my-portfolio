import axios from 'axios';

const isServer = typeof window === 'undefined';

// Bu değişkeni fetch içinde de kullanacağız
const baseURL = isServer
  ? process.env.INTERNAL_API_URL // Serverdaysak: http://backend:8000/api
  : process.env.NEXT_PUBLIC_API_URL; // Clienttaysak: http://localhost:8000/api

const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});

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

// Projects (Burası Axios kalabilir, çok sık değişmiyor)
export const getProjects = async () => {
  const response = await api.get('/portfolio/projects/');
  return response.data;
};

// Blog Posts
export const getPosts = async () => {
  const response = await api.get('/blog/posts/');
  return response.data;
};

// Get Experiences (GÜNCELLEME BURADA 👇)
// Axios yerine native fetch kullanıyoruz ki cache kontrolü bizde olsun.
export const getExperiences = async () => {
  // baseURL değişkenini kullanarak fetch isteği atıyoruz
  const res = await fetch(`${baseURL}/portfolio/experiences/`, {

    cache: 'no-store', // <--- İŞTE BÜTÜN OLAY BU (Cache'i kapatır)

    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    // Hata olursa (Backend çökerse vs.)
    throw new Error('Failed to fetch experiences');
  }

  return res.json();
};

export default api;