import axios from 'axios';


const isServer = typeof window === 'undefined';

// Base URL for API requests
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

// Projects (This can stay with Axios, it doesn't change often)
export const getProjects = async () => {
  const response = await api.get('/portfolio/projects/');
  return response.data;
};

// Blog Posts
export const getPosts = async () => {
  const response = await api.get('/blog/posts/');
  return response.data;
};

// Get Experiences
// We use native fetch to have control over caching
export const getExperiences = async () => {
  // request fetch
  const res = await fetch(`${baseURL}/portfolio/experiences/`, {

    cache: 'no-store',

    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch experiences');
  }

  return res.json();
};

export const sendContactMessage = async (data: { name: string; email: string; message: string }) => {
  const payload = {
    ...data,
    subject: "Web Sitesi İletişim Formu" // Sabit bir başlık atadık
  };
  const response = await api.post('/portfolio/contact/', payload);
  return response.data;
};

export default api;