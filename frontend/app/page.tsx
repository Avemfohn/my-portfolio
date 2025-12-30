import Hero from '@/components/sections/Hero';
import ProjectsSection from '@/components/projects/ProjectsSection';
import Experience from '@/components/experience/Experience';
import ContactSection from '@/components/sections/ContactSection';
import HomeBlogSection from '@/components/sections/HomeBlogSection';
import {getBlogPosts } from '@/lib/api'; // <--- getBlogPosts EKLENDİ

export default async function Home() {
  const postsData = getBlogPosts();
  const [posts] = await Promise.all([postsData]);
  return (
    <main className="min-h-screen bg-slate-900">
      <Hero />
      <Experience />
      <ProjectsSection />
      {posts && posts.length > 0 && (
        <HomeBlogSection posts={posts} />
      )}
      <ContactSection />
    </main>
  );
}