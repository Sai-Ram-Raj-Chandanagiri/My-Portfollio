import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ThreeDCard, CardItem } from './ThreeDCard';
import { ExternalLink, Github, ArrowRight, X, Sparkles, Box } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectScene } from './ThreeScene';

const ProjectCard = ({ project, onOpen3D }: { project: typeof PROJECTS[0], onOpen3D: (p: typeof PROJECTS[0]) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = project.icon as any;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handle3DClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen3D(project);
  }

  return (
    <div className="h-[450px] w-full cursor-pointer perspective-1000" onClick={handleFlip}>
      <ThreeDCard className="w-full h-full duration-500" enableTilt={!isFlipped}>
        <motion.div
          {...({ className: "w-full h-full relative preserve-3d" } as any)}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* FRONT FACE */}
          <div className="absolute inset-0 backface-hidden w-full h-full bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-xl group">
            {/* Dynamic Background with Project Color */}
            <div
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40 opacity-20"
              style={{
                background: `radial-gradient(circle at center, ${project.color} 0%, transparent 70%)`
              }}
            />

            {/* Centered Icon with Pulse Animation */}
            <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon
                  size={120}
                  strokeWidth={1}
                  className="text-white/90"
                  style={{ filter: `drop-shadow(0 0 25px ${project.color}60)` }}
                />
              </motion.div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent flex flex-col justify-end p-6">
              <CardItem translateZ={30}>
                <div className="flex justify-between items-end">
                  <div>
                    <span
                      className="inline-flex items-center gap-1 px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full border backdrop-blur-md"
                      style={{
                        color: project.color,
                        borderColor: `${project.color}50`,
                        backgroundColor: `${project.color}20`
                      }}
                    >
                      <Sparkles size={10} />
                      {project.type}
                    </span>
                    <h3 className="text-3xl font-bold text-white mb-1 leading-tight">{project.title}</h3>
                  </div>
                </div>

                <div
                  className="h-px w-full my-4"
                  style={{ background: `linear-gradient(90deg, ${project.color}80, transparent)` }}
                ></div>

                <div
                  className="flex items-center gap-2 font-medium text-sm transition-colors"
                  style={{ color: project.color }}
                >
                  <span>View Project Details</span>
                  <div className="bg-white/10 p-1 rounded-full">
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardItem>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            className="absolute inset-0 backface-hidden w-full h-full bg-[#0b0b0f] rounded-xl overflow-hidden border p-6 flex flex-col shadow-2xl rotate-y-180"
            style={{ borderColor: `${project.color}40`, boxShadow: `0 20px 50px -12px ${project.color}20` }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-[50px] -mr-10 -mt-10 pointer-events-none" style={{ backgroundColor: `${project.color}20` }}></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full blur-[50px] -ml-10 -mb-10 pointer-events-none" style={{ backgroundColor: `${project.color}20` }}></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>

            <CardItem translateZ={30} className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    {...({
                      animate: {
                        rotate: [0, 10, 0, -10, 0],
                        y: [0, -2, 0, -2, 0]
                      },
                      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                      className: "p-2 rounded-lg bg-white/5 border border-white/10",
                      style: { color: project.color, borderColor: `${project.color}30` }
                    } as any)}
                  >
                    <Icon size={28} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className="text-sm text-gray-400">{project.type}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1 rounded-full hover:bg-white/10">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-2">
                  <h4
                    className="text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
                    style={{ color: project.color }}
                  >
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-1.5 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-white/30 hover:text-white transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/10">
                <a
                  href={project.link || "#"}
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 bg-white text-black font-bold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  <Github size={16} /> Code
                </a>
                <button
                  onClick={handle3DClick}
                  className="py-2.5 bg-white/5 border border-white/10 font-bold text-sm rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg"
                  style={{ color: project.color, borderColor: `${project.color}50` }}
                >
                  <Box size={16} /> View 3D Model
                </button>
              </div>
            </CardItem>
          </div>
        </motion.div>
      </ThreeDCard>
    </div>
  )
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <section id="projects" className="py-24 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...({
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            className: "text-center mb-16"
          } as any)}
        >
          <h2 className="text-5xl font-bold text-white mb-6">Featured Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Dive into my portfolio of AI-driven applications and system designs.
            <span className="text-purple-400 font-medium block mt-2">Flip cards for details, or enter 3D mode.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} onOpen3D={setSelectedProject} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3D Model Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            {...({
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4",
              onClick: () => setSelectedProject(null)
            } as any)}
          >
            <div
              className="relative w-full max-w-5xl h-[80vh] bg-[#030014] rounded-2xl border overflow-hidden shadow-2xl flex flex-col md:flex-row"
              style={{ borderColor: `${selectedProject.color}40`, boxShadow: `0 0 50px ${selectedProject.color}20` }}
              onClick={e => e.stopPropagation()}
            >
              {/* 3D Viewport */}
              <div className="w-full md:w-2/3 h-2/3 md:h-full relative bg-gradient-to-br from-gray-900 to-black">
                <div
                  className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10"
                  style={{ borderColor: `${selectedProject.color}40` }}
                >
                  <p className="text-xs font-mono" style={{ color: selectedProject.color }}>INTERACTIVE MODE • ORBIT TO EXPLORE</p>
                </div>
                {/* Pass project color and title to 3D scene */}
                <ProjectScene color={selectedProject.color} projectTitle={selectedProject.title} />
              </div>

              {/* Details Panel */}
              <div className="w-full md:w-1/3 h-1/3 md:h-full p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 bg-[#05050a]">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-sm font-semibold tracking-wide uppercase mb-6" style={{ color: selectedProject.color }}>{selectedProject.type}</p>

                <p className="text-gray-300 mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mt-auto">
                  <h4 className="text-sm font-bold text-white mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.techStack.map(t => (
                      <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400">{t}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close Viewer
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors z-20"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;