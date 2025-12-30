import React from 'react';
import { getProjects } from '@/lib/api';
import { Project } from '@/types';
import ProjectsList from './ProjectsList';


const ProjectsSection = async () => {

  let projects: Project[] = [];
  let error = null;

  try {

    projects = await getProjects();
  } catch (err) {
    console.error("Error fetching projects:", err);
    error = "An error occurred while loading projects.";
  }

  return <ProjectsList projects={projects} error={error} />;
};

export default ProjectsSection;