import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { HeroScene } from './ThreeScene';

// Properly typed motion components
const MotionLink = motion.a as React.FC<HTMLMotionProps<'a'> & React.AnchorHTMLAttributes<HTMLAnchorElement>>;
const MotionDiv = motion.div as React.FC<HTMLMotionProps<'div'> & React.HTMLAttributes<HTMLDivElement>>;

const Hero: React.FC = () => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Text Content */}
        <MotionDiv
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-purple-400 font-medium tracking-wider mb-4">HELLO, I AM</h2>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            {PERSONAL_INFO.name}
          </h1>
          <h3 className="text-2xl md:text-3xl text-gray-400 mb-6">
            <span className="text-blue-400 font-semibold">{PERSONAL_INFO.role}</span>
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
            {PERSONAL_INFO.about}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a href="https://github.com/Sai-Ram-Raj-Chandanagiri" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/50 transition-all text-gray-300 hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/sai-ram-raj-chandanagiri/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/50 transition-all text-gray-300 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/50 transition-all text-gray-300 hover:text-white">
              <Mail size={20} />
            </a>
          </div>

          <div className="flex gap-4">
            <MotionLink
              href="https://github.com/Sai-Ram-Raj-Chandanagiri"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-white flex items-center gap-2 shadow-lg shadow-purple-500/25"
            >
              View Work <ArrowRight size={18} />
            </MotionLink>
            <MotionLink
              href="#contact"
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Contact Me
            </MotionLink>
          </div>
        </MotionDiv>

        {/* 3D Interactive Element (Replaced old card) */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[500px] w-full flex items-center justify-center relative"
        >
          {/* Glowing backdrop for the 3D model */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

          {/* The 3D Canvas */}
          <div className="w-full h-full relative z-10 cursor-move">
            <HeroScene />
          </div>

          {/* Floating Badge */}
          <MotionDiv
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl pointer-events-none z-20"
          >
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-1">Interactive 3D</p>
            <p className="text-white font-medium text-sm">Drag to rotate • Scroll to zoom</p>
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;