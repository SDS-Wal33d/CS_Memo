import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/projects/ProjectModal';

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  teamMembers: { name: string; role: string }[];
  technologies: string[];
  details: string;
}

const categories = [
  'All',
  'Artificial Intelligence',
  'Web Development',
  'Mobile Applications',
  'Cybersecurity',
  'Data Science',
  'Game Development',
  'Robotics & IoT'
];

// Dummy projects data for demonstration
const dummyProjects: Project[] = [
  {
    _id: '1',
    title: 'AI-Powered Health Assistant',
    description: 'A machine learning application that provides personalized health recommendations based on user data.',
    category: 'Artificial Intelligence',
    image: 'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg',
    teamMembers: [
      { name: 'Alex Johnson', role: 'ML Engineer' },
      { name: 'Sarah Chen', role: 'Data Scientist' },
      { name: 'Michael Rodriguez', role: 'Frontend Developer' }
    ],
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js'],
    details: 'Our AI Health Assistant leverages machine learning algorithms to analyze user health data and provide personalized recommendations. The system uses natural language processing to understand user queries and responds with evidence-based health advice. The application includes features such as meal planning, exercise recommendations, and medication reminders, all tailored to individual user profiles. We implemented a hybrid recommendation system that combines collaborative filtering with content-based approaches to deliver highly relevant suggestions.'
  },
  {
    _id: '2',
    title: 'Secure Blockchain Voting System',
    description: 'A decentralized electronic voting system built on blockchain technology to ensure security and transparency.',
    category: 'Cybersecurity',
    image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg',
    teamMembers: [
      { name: 'David Kim', role: 'Blockchain Developer' },
      { name: 'Emma Watson', role: 'Security Specialist' },
      { name: 'James Smith', role: 'Backend Developer' }
    ],
    technologies: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    details: 'Our blockchain voting system addresses the security and transparency concerns in electronic voting by leveraging Ethereum\'s smart contract capabilities. Each vote is recorded as a transaction on the blockchain, providing an immutable record that can be publicly verified while maintaining voter anonymity. The system includes features such as voter authentication, vote encryption, and real-time result tabulation. We implemented a zero-knowledge proof mechanism to verify voter eligibility without revealing identity information, ensuring both security and privacy.'
  },
  {
    _id: '3',
    title: 'Augmented Reality Campus Tour',
    description: 'An AR application that provides interactive tours of the university campus for new students and visitors.',
    category: 'Mobile Applications',
    image: 'https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg',
    teamMembers: [
      { name: 'Sophia Garcia', role: 'AR Developer' },
      { name: 'Noah Lee', role: 'UI/UX Designer' },
      { name: 'Olivia Martin', role: 'Mobile Developer' }
    ],
    technologies: ['Unity', 'ARKit', 'ARCore', 'Swift', 'Kotlin'],
    details: 'Our Augmented Reality Campus Tour transforms the orientation experience for new students and visitors. Using AR markers placed at key locations around campus, users can point their phones to access interactive 3D models, historical information, and navigation assistance. The application features virtual guides, time-lapse visualizations showing how buildings have changed over time, and inside looks at facilities that might not be accessible during normal tour hours. We implemented geolocation tracking and a custom pathfinding algorithm to create optimal tour routes based on user interests and time constraints.'
  },
  {
    _id: '4',
    title: 'Smart Urban Farming System',
    description: 'An IoT-based solution for monitoring and automating small-scale urban farming operations.',
    category: 'Robotics & IoT',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
    teamMembers: [
      { name: 'Daniel Park', role: 'IoT Specialist' },
      { name: 'Isabella White', role: 'Embedded Systems Engineer' },
      { name: 'William Brown', role: 'Full Stack Developer' }
    ],
    technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'Python', 'React'],
    details: 'Our Smart Urban Farming System enables efficient management of small-scale agricultural projects in urban environments. The system incorporates various sensors to monitor soil moisture, ambient temperature, humidity, and light levels, automatically adjusting irrigation and lighting systems for optimal plant growth. The web dashboard provides real-time monitoring, alerts, and data visualization, allowing users to track plant health and resource usage over time. We implemented machine learning algorithms that analyze growth patterns and environmental data to provide predictive maintenance and yield optimization recommendations.'
  },
  {
    _id: '5',
    title: 'Collaborative Code Editor',
    description: 'A real-time collaborative code editing platform designed for distributed software development teams.',
    category: 'Web Development',
    image: 'https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg',
    teamMembers: [
      { name: 'Liam Taylor', role: 'Frontend Developer' },
      { name: 'Ava Johnson', role: 'Backend Developer' },
      { name: 'Ethan Anderson', role: 'DevOps Engineer' }
    ],
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Docker'],
    details: 'Our Collaborative Code Editor facilitates seamless real-time collaboration for distributed development teams. Multiple users can simultaneously edit the same file with changes synchronized instantly across all connected clients. The platform supports syntax highlighting for over 30 programming languages, code linting, and integrated terminal for running code directly in the browser. Additional features include video chat, commenting, version history, and GitHub integration. We implemented operational transformation algorithms to resolve conflicts when multiple users edit the same section of code, ensuring consistent state across all clients.'
  },
  {
    _id: '6',
    title: 'Predictive Analytics for Education',
    description: 'A data science solution that predicts student performance and identifies intervention opportunities.',
    category: 'Data Science',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
    teamMembers: [
      { name: 'Mason Clark', role: 'Data Scientist' },
      { name: 'Charlotte Lewis', role: 'ML Engineer' },
      { name: 'Benjamin Moore', role: 'Education Specialist' }
    ],
    technologies: ['Python', 'scikit-learn', 'Pandas', 'Flask', 'React'],
    details: 'Our Predictive Analytics for Education platform helps educators identify at-risk students and provide timely interventions. The system analyzes various data points including attendance, assignment completion, participation metrics, and past performance to predict academic outcomes. Interactive dashboards help visualize trends at both individual and class levels, while automated alerts notify instructors when specific student metrics indicate potential issues. We implemented a multi-factorial prediction model that accounts for both academic and behavioral factors, achieving 83% accuracy in identifying students who might require additional support at least 4 weeks before traditional assessment methods would detect problems.'
  }
];

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-950 mb-4 font-display">
            Graduation Projects
          </h1>
          <p className="text-gray-600 text-lg">
            Explore innovative projects created by our graduating computer science students
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm p-4 md:flex items-center justify-between">
            <div className="relative mb-4 md:mb-0 md:flex-grow md:mr-4">
              <input
                type="text"
                placeholder="Search for projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="relative md:w-64 flex">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} onClick={() => openProjectModal(project)} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}
    </div>
  );
};

export default ProjectsPage;