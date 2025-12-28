export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

// Portfolio Related Types
export interface Skill extends BaseEntity {
    name: string;
    icon_name?: string;
    is_active: boolean;
    }

export interface Project extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  description_tr?: string;
  image?: string;
  github_link?: string;
  live_link?: string;
  priority: number;
  skills: Skill[];
}


// Experience Related Types
// frontend/types/index.ts
export interface Experience {
  id: number;
  category: 'work' | 'education' | 'certificate'; // Added category field
  company: string;
  title: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  description_tr?: string;
  skills: Skill[];
}


//BLOG Types

export interface Category {
  id: number;
  name: string;
  name_tr?: string;
  slug: string;
}

export interface PostImage {
  id: number;
  image: string;
  caption: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  title_tr?: string;
  slug: string;
  content: string;
  content_tr?: string;
  cover_image: string | null;
  location: string | null;
  location_tr?: string;
  created_at: string;
  category: number | null;
  category_detail: Category | null;
  gallery: PostImage[];
}