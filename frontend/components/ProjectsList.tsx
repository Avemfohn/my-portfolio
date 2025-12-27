'use client'; // <-- Hook kullanacağımız için şart

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

interface ProjectsListProps {
  projects: Project[];
  error: string | null;
}

const ProjectsList = ({ projects, error }: ProjectsListProps) => {
  const { t } = useLanguage();
  const titleParts = t.projects.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <section className="py-20 bg-slate-900" id="projects">
      <div className="container mx-auto px-6">


        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {firstWord} <span className="text-blue-500">{restOfTitle}</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {error ? (
           <div className="text-center text-red-400">{error}</div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            {t.projects.noProjectsFound}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsList;