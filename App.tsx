import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ResumeSection from './components/ResumeSection';
import Contact from './components/Contact';
import GeminiChatbot from './components/GeminiChatbot';

function App() {
  return (
    <main className="bg-[#030014] min-h-screen text-white selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <ResumeSection />
      <Contact />
      <GeminiChatbot />
      
      {/* Global Glow Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-purple-900/10 rounded-full blur-[100px]" />
         <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>
    </main>
  );
}

export default App;