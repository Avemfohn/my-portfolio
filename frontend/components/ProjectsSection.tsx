import React from 'react';
import { getProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectsList from './ProjectsList'; // <-- Oğlu çağırdık

// Bu bir SERVER COMPONENT (async olduğu için)
// useLanguage burada KULLANILAMAZ.
const ProjectsSection = async () => {

  let projects: Project[] = [];
  let error = null;

  try {
    // Veriyi sunucuda çekiyoruz (Hızlı ve SEO dostu)
    projects = await getProjects();
  } catch (err) {
    console.error("Error fetching projects:", err);
    error = "An error occurred while loading projects.";
  }

  // Veriyi Client Component'e teslim ediyoruz
  return <ProjectsList projects={projects} error={error} />;
};

export default ProjectsSection;