import axios from 'axios';

// One instance of axios with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get full image URL
// Django sometimes returns "/media/img.jpg", we need to convert it to "http://localhost:8000/media/img.jpg".
export const getImageUrl = (path?: string) => {
  if (!path) return '/placeholder.png'; // If no image, return placeholder
  if (path.startsWith('http')) return path; // If already a full URL, return as is
  return `${process.env.NEXT_PUBLIC_MEDIA_URL}${path}`;
};

// --- API CALLS ---
// Get Projects
export const getProjects = async () => {
  const response = await api.get('/portfolio/projects/');
  return response.data;
};

// Blog Posts
export const getPosts = async () => {
  const response = await api.get('/blog/posts/');
  return response.data;
};

export default api;