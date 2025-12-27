import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import Experience from '@/components/Experience';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Hero />
      <Experience />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}