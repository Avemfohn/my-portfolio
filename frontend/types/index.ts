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
  image?: string;
  github_link?: string;
  live_link?: string;
  priority: number;
  skills: Skill[];
}

// Blog Related Types
export interface Category extends BaseEntity {
  name: string;
  slug: string;
}

export interface PostImage {
  id: number;
  image: string;
  caption?: string;
}

export interface Post extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  location?: string;
  category_detail?: Category; // Seralized category details
  gallery?: PostImage[];
}