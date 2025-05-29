import React from 'react';
import { X, Users, Code, ExternalLink } from 'lucide-react';
import type { Project } from '../../pages/ProjectsPage';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Close modal when clicking outside the content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key press
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header with image */}
          <div className="relative h-64 md:h-80">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6 text-white">
                <div className="inline-block bg-primary-600 text-white py-1 px-3 rounded-lg text-sm font-medium mb-3">
                  {project.category}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2 font-display">{project.title}</h2>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-primary-900 mb-4 font-display">Project Description</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{project.details || project.description}</p>
                
                <h3 className="text-xl font-semibold text-primary-900 mb-4 font-display">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full"
                    >
                      <Code className="h-4 w-4 mr-1.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center font-display">
                    <Users className="h-5 w-5 mr-2 text-primary-600" />
                    Team Members
                  </h3>
                  <ul className="space-y-3">
                    {project.teamMembers.map((member, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-sm text-gray-500">{member.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-primary-900 mb-4 font-display">Project Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.repositoryUrl || 'https://github.com', '_blank');
                        }}
                        className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Project Repository
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.demoUrl || '#', '_blank');
                        }}
                        className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.documentationUrl || '#', '_blank');
                        }}
                        className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Project Documentation
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-8 pt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;