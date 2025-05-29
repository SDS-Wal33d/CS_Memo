import React from 'react';
import type { Project } from '../../pages/ProjectsPage';
import { Users, Code } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
          {project.category}
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-primary-900 mb-2 font-display">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Users className="h-4 w-4 mr-1" />
          <span>{project.teamMembers.length} team members</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span 
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
            >
              <Code className="h-3 w-3 mr-1" />
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-3 text-right">
        <button className="text-primary-600 hover:text-primary-800 font-medium text-sm">
          View Project Details
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;