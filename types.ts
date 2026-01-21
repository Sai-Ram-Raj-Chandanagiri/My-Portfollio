import { LucideIcon } from 'lucide-react';
import React from 'react';

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  type: string;
  icon: React.ElementType;
  link?: string;
  color: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  score: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: LucideIcon;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}