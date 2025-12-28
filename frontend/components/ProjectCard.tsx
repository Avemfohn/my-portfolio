'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import { getImageUrl } from '@/lib/api';
import { useLanguage } from '@/context/LanguageContext';

// 1. BURAYI GÜNCELLE: openModal tipini tanımla
interface ProjectCardProps {
  project: Project;
  index: number;
  openModal: (project: Project) => void; // <--- BU SATIRI EKLE
}

// 2. BURAYI GÜNCELLE: openModal'ı süslü parantez içine al
const ProjectCard = ({ project, index, openModal }: ProjectCardProps) => {
  const { t, language } = useLanguage();
  const descriptionToShow = (language === 'tr' && project.description_tr)
    ? project.description_tr
    : project.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      // 3. ARTIK HATA VERMEZ:
      onClick={() => openModal(project)}
      className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-colors shadow-lg cursor-pointer"
    >
      {/* ... Resim ve diğer kodların aynı kalsın ... */}

      <div className="relative h-48 w-full overflow-hidden">
        {project.image ? (
          <Image
            src={getImageUrl(project.image)}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-700 flex items-center justify-center text-slate-500">
            {t.projects.noImg}
          </div>
        )}

        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} // Linke basınca modal açılmasın
              className="p-2 bg-white rounded-full hover:scale-110 transition-transform text-black font-bold text-xs"
            >
              GitHub
            </a>
          )}
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} // Linke basınca modal açılmasın
              className="p-2 bg-blue-600 rounded-full hover:scale-110 transition-transform text-white font-bold text-xs"
            >
              {t.projects.live}
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
          {descriptionToShow}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1 text-xs font-medium bg-slate-700 text-blue-300 rounded-full border border-slate-600"
            >
              #{skill.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;