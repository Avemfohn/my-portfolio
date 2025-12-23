import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Hero />
      <ProjectsSection />
    </main>
  );
}