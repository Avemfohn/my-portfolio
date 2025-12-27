import React from 'react';
import { getExperiences } from '@/lib/api';
import ExperienceTimeline from './ExperienceTimeLine';

// Bu bileşen "async" olduğu için Server Component'tir.
// Veriyi çeker ve Client Component'e (ExperienceTimeline) verir.
const Experience = async () => {
  const experiences = await getExperiences();

  return <ExperienceTimeline data={experiences} />;
};

export default Experience;