import React from 'react';
import { EDUCATION, ACHIEVEMENTS, CERTIFICATIONS } from '../constants';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Award, GraduationCap, BadgeCheck } from 'lucide-react';

// Properly typed motion component
const MotionDiv = motion.div as React.FC<HTMLMotionProps<'div'> & React.HTMLAttributes<HTMLDivElement>>;

const ResumeSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Column: Education & Achievements */}
          <div className="space-y-16">

            {/* Education */}
            <div id="education" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-purple-500" size={28} />
                <h2 className="text-3xl font-bold text-white">Education</h2>
              </div>
              <div className="space-y-8 pl-4 border-l-2 border-white/10">
                {EDUCATION.map((edu, idx) => (
                  <MotionDiv
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8"
                  >
                    <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-[#030014] border-2 border-purple-500"></div>
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <p className="text-purple-400 font-medium mt-1">{edu.degree}</p>
                    <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
                      <span>{edu.duration}</span>
                      <span className="bg-white/10 px-2 py-0.5 rounded text-white">{edu.score}</span>
                    </div>
                  </MotionDiv>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div id="achievements" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-yellow-500" size={28} />
                <h2 className="text-3xl font-bold text-white">Achievements</h2>
              </div>
              <div className="grid gap-4">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <MotionDiv
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-white/5 to-transparent p-4 rounded-xl border-l-4 border-yellow-500"
                  >
                    <h4 className="text-lg font-bold text-white">{ach.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{ach.description}</p>
                  </MotionDiv>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <BadgeCheck className="text-green-500" size={28} />
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
            </div>

            <div className="grid gap-4">
              {CERTIFICATIONS.map((cert, idx) => (
                <MotionDiv
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-green-500/30 transition-all cursor-default shadow-lg hover:shadow-green-900/10"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-900/20 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <BadgeCheck size={20} />
                  </div>
                  <span className="text-gray-300 font-medium group-hover:text-white">{cert}</span>
                </MotionDiv>
              ))}
            </div>

            {/* Decorative extra card for Gaming/Passion */}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/20 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold text-white mb-2">Beyond Code</h3>
              <p className="text-indigo-200">
                When I'm not deploying AI models, I'm a professional gamer engaged in competitive strategy.
                My passion for interactive entertainment drives my understanding of user engagement and system responsiveness.
              </p>
            </MotionDiv>
          </div >

        </div >
      </div >
    </section >
  );
};

export default ResumeSection;