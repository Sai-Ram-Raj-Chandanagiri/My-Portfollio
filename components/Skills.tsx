import React from 'react';
import { SKILL_CATEGORIES } from '../constants';
import { motion, HTMLMotionProps } from 'framer-motion';

const MotionDiv = motion.div as React.FC<HTMLMotionProps<'div'> & React.HTMLAttributes<HTMLDivElement>>;

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-[#050510] relative overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-purple-600 rounded-full"></div>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category, idx) => (
            <MotionDiv
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-400 group-hover:text-white transition-colors shadow-inner shadow-purple-500/10">
                  <category.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:text-white hover:border-purple-500/30 hover:bg-purple-500/10 transition-all cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;