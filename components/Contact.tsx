import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#02000d] border-t border-white/10 pt-20 pb-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's create something <br />extraordinary.</h2>
            <p className="text-gray-400 text-lg max-w-md">
              Whether you have a question, a project proposal, or just want to discuss the latest in AI, feel free to reach out.
            </p>
          </div>
          
          <div className="space-y-6">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-all">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Me</p>
                <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Call Me</p>
                <p className="text-white font-medium">{PERSONAL_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center text-green-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white font-medium">{PERSONAL_INFO.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Sai Ram Raj Chandanagiri. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="https://github.com/Sai-Ram-Raj-Chandanagiri" className="text-gray-400 hover:text-white transition-colors">Github</a>
             <a href="https://www.linkedin.com/in/sai-ram-raj-chandanagiri/" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;