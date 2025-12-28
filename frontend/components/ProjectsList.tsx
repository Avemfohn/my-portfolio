'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';

interface ProjectsListProps {
  projects: Project[];
  error: string | null;
}

const ProjectsList = ({ projects, error }: ProjectsListProps) => {
  const { t, language } = useLanguage();
  const titleParts = t.projects.title.split(' ');
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');


  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                openModal={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-500">
            {t.projects.noProjectsFound}
          </div>
        )}

      </div>

      {/* --- POPUP MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            closeModal={() => setSelectedProject(null)}
            language={language}
          />
        )}
      </AnimatePresence>

    </section>
  );
};


const ProjectModal = ({ project, closeModal, language }: { project: Project, closeModal: () => void, language: 'tr' | 'en' }) => {
  const description = (language === 'tr' && project.description_tr) ? project.description_tr : project.description;
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image */}
        <div className="relative h-64 md:h-80 w-full shrink-0">
          {project.image ? (
            <Image
              src={getImageUrl(project.image)}
              alt={project.title}
              fill
              className="object-cover"
            />
          ) : (
             <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">Görsel Yok</div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>

          {/* Full Description (No line clamp!) */}
          <div className="text-slate-300 mb-8 leading-relaxed whitespace-pre-line">
            {description}
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3 tracking-wider">{t.projects.tech}</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span key={skill.id} className="px-3 py-1 text-sm bg-slate-900 text-blue-300 rounded-md border border-slate-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex gap-4 pt-4 border-t border-slate-700">
            {project.github_link && (
              <a href={project.github_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-white hover:text-black text-white rounded-lg transition-all font-medium">
                <Github className="w-5 h-5" /> {t.projects.sourceCode}
              </a>
            )}
            {project.live_link && (
              <a href={project.live_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium">
                <ExternalLink className="w-5 h-5" /> {t.projects.liveProject}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsList;