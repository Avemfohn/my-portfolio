'use client';

import React, { useEffect, useState } from 'react';
import { getProjects } from '@/lib/api'; // API fonksiyonumuz
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Sayfa açıldığında veriyi çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Projeler çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 bg-slate-900" id="projects">
      <div className="container mx-auto px-6">

        {/* --- BAŞLIK --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Some of the works I have developed over time, using various technologies and tools.
          </p>
        </div>

        {/* --- LİSTELEME --- */}
        {loading ? (
          // Yükleniyor Durumu (Basit bir yazı, ileride Skeleton yaparız)
          <div className="text-center text-white">Projects Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Veri Yoksa Uyarısı (Development Sırasında Faydalı) */}
        {!loading && projects.length === 0 && (
          <div className="text-center text-slate-500">
            There is no project to display.
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;