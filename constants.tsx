import React from 'react';
import {
  Code2,
  Database,
  Cloud,
  Terminal,
  BrainCircuit,
  Scale,
  Book,
} from 'lucide-react';
import { Project, Education, SkillCategory, Achievement, NavItem } from './types';

// --- Custom Icons ---

// Symbolises Code Editor
const EchoIcon = ({ size = 24, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
    <line x1="2" y1="8" x2="22" y2="8" />
    <line x1="6" y1="12" x2="16" y2="12" />
    <line x1="6" y1="16" x2="12" y2="16" />
    <circle cx="5" cy="5.5" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="8" cy="5.5" r="1" fill="currentColor" stroke="none" opacity="0.5" />
    <circle cx="11" cy="5.5" r="1" fill="currentColor" stroke="none" opacity="0.5" />
  </svg>
);

// Symbolises AI-Chatbot / Robot
const QueryVerseIcon = ({ size = 24, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <line x1="12" y1="2" x2="12" y2="8" />
    <circle cx="12" cy="2" r="1.5" />
    <line x1="9" y1="13" x2="9.01" y2="13" strokeWidth="3" />
    <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="3" />
    <path d="M9 17h6" />
  </svg>
);

// Symbolises Computer with Leaf inside + Game Controller
const HerbiverseIcon = ({ size = 24, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Monitor (Shifted slightly up/left to make room for controller) */}
    <rect x="2" y="2" width="17" height="13" rx="2" />

    {/* Leaf Inside Monitor */}
    <path d="M10.5 11c0-1.5 1-2.5 1-2.5s.8 1 1 2c0 1-.5 1.5-2 1.5S8.5 11 9 10c.5-1 1-2.5 1-2.5s1.5 1 1.5 2.5" />
    <path d="M10.5 11v-1.5" />

    {/* Wire connecting monitor to controller */}
    <path d="M10.5 15v3c0 2 2 2 3.5 2" />

    {/* Game Controller */}
    <rect x="14" y="15" width="9" height="6" rx="2" />
    <line x1="16" y1="18" x2="17" y2="18" strokeWidth="2" />
    <circle cx="20.5" cy="18" r="1" />
  </svg>
);

export const PERSONAL_INFO = {
  name: "Sai Ram Raj Chandanagiri",
  role: "Full Stack Developer & AI/ML Engineer",
  phone: "+91 9705447009",
  email: "sairamraj.work@gmail.com",
  location: "Hyderabad, India",
  about: "Passionate about solving real-world problems using AI/ML and system design. Strong communication skills and experience working in team-based hackathons. A professional gamer with a deep passion for gaming culture, strategy, and interactive entertainment."
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Achievements', href: '#achievements' },
];

export const EDUCATION: Education[] = [
  {
    institution: "Chaitanya Bharathi Institute of Technology, Hyderabad",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2022 - 2026",
    score: "8.41/10 CGPA"
  },
  {
    institution: "Shine Junior College",
    degree: "Senior Secondary",
    duration: "2020 - 2022",
    score: "9.56/10 CGPA"
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Echo",
    type: "VS Code Extension",
    description: "Real-time collaboration tool featuring conflict-free editing (Yjs), embedded WebRTC video/audio calls, and persistent line-level voice annotations.",
    techStack: ["TypeScript", "WebRTC", "Ollama", "Yjs"],
    icon: EchoIcon,
    link: "https://github.com/Sai-Ram-Raj-Chandanagiri/Echo",
    color: "#3b82f6" // Blue
  },
  {
    title: "QueryVerse",
    type: "Domain-Specific FAQ Chatbot",
    description: "Chatbot using MeTTa reasoning engine and Redis for rapid access. Integrated a custom-built knowledge graph backend for domain-specific query handling.",
    techStack: ["React.js", "FastAPI", "MeTTa", "Redis", "MongoDB", "Serper API"],
    icon: QueryVerseIcon,
    link: "https://github.com/Sai-Ram-Raj-Chandanagiri/QueryVerse-Athena",
    color: "#a855f7" // Purple
  },
  {
    title: "LegalMind",
    type: "AI-based Legal Case Analysis",
    description: "Platform to analyze Indian legal judgments using NLP. Leveraged SpaCy for named entity recognition and MongoDB for semantic data storage.",
    techStack: ["Flask", "SpaCy", "MongoDB", "Next.js", "NLP"],
    icon: Scale,
    link: "https://github.com/Monica-1107/legalmind",
    color: "#f59e0b" // Amber
  },
  {
    title: "DearDiary",
    type: "AI-Powered Journaling",
    description: "Personal journaling app featuring AI-powered reflections. Implemented secure login, dynamic calendar entries, and OpenAI integration for contextual chatbot assistance.",
    techStack: ["Next.js", "Node.js", "MongoDB", "OpenAI"],
    icon: Book,
    link: "https://github.com/Sai-Ram-Raj-Chandanagiri/Dear_Diary_Final",
    color: "#ec4899" // Pink
  },
  {
    title: "Herbiverse",
    type: "Gamified Web Platform",
    description: "Enables users to experience gardens virtually and know about various types of medicinal plants.",
    techStack: ["Unity", "ReactJS", "NodeJS", "ExpressJS", "Firebase"],
    icon: HerbiverseIcon,
    link: "https://github.com/Taruna-M/Virtual-Herbal-Garden/tree/main",
    color: "#22c55e" // Green
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 95 },
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "C", level: 80 },
      { name: "Kotlin", level: 75 }
    ]
  },
  {
    title: "Frameworks",
    icon: Terminal,
    skills: [
      { name: "ReactJS", level: 95 },
      { name: "NextJS", level: 90 },
      { name: "NodeJS", level: 85 },
      { name: "FastAPI", level: 85 },
      { name: "Three.js", level: 85 },
      { name: "Unity", level: 85 },
      { name: "Flask", level: 80 },
      { name: "React-Native", level: 75 },
      { name: "Django", level: 70 }
    ]
  },
  {
    title: "Cloud & DB",
    icon: Cloud,
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "Firebase", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 80 },
      { name: "Google Cloud", level: 75 },
      { name: "AWS", level: 70 }
    ]
  },
  {
    title: "AI & Tools",
    icon: BrainCircuit,
    skills: [
      { name: "OpenAI API", level: 95 },
      { name: "Git", level: 90 },
      { name: "NLP", level: 85 },
      { name: "System Design", level: 85 },
      { name: "MeTTa", level: 80 },
      { name: "MCP", level: 80 },
      { name: "Android Studio", level: 75 }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Winner - National Level Hackathon",
    description: "Secured 1st place with a cash prize of ₹20,000."
  },
  {
    title: "Winner - State Level Hackathon",
    description: "Secured 1st place with a cash prize of ₹7,000. Qualified for National-level Hackathon."
  },
  {
    title: "JEE Mains (2022)",
    description: "Achieved 97.9 Percentile."
  },
  {
    title: "EAMCET (2022)",
    description: "Secured Rank 1914."
  }
];

export const CERTIFICATIONS = [
  "Google Cloud Platform Essentials – Google",
  "Generative AI Fundamentals – Google",
  "Building with ClaudeAPI - Anthropic",
  "Introduction to Model Context Protocol - Anthropic",
  "Model Context Protocol: Advanced Topics - Anthropic",
  "Cybersecurity Essentials – Inflow Technologies",
  "Java Development Certification – Internshala",
  "Problem Solving and Programming in C - NPTEL"
];