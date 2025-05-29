import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  Filter, 
  X, 
  Check 
} from 'lucide-react';
import Modal from '../../components/common/Modal';

// Mock projects for demonstration
const mockProjects = [
  {
    id: 1,
    title: 'AI-Powered Health Assistant',
    description: 'An intelligent healthcare assistant that uses machine learning to provide personalized health recommendations and monitor vital signs through wearable integration.',
    category: 'Artificial Intelligence',
    submittedBy: 'Team Alpha',
    submitDate: '2024-04-12',
    status: 'approved',
    technologies: ['TensorFlow', 'Python', 'React Native', 'AWS'],
    presentationSlot: '10:00 AM - 10:30 AM',
    presentationDate: '2025-06-15',
    venue: 'Room A101',
    team: ['Alex Johnson', 'Sarah Chen', 'Michael Rodriguez'],
    links: {
      documentation: 'https://docs.healthai.project',
      repository: 'https://github.com/team-alpha/health-ai',
      demo: 'https://demo.healthai.project'
    }
  },
  {
    id: 2,
    title: 'Secure Blockchain Voting System',
    description: 'A decentralized voting platform that ensures transparency and security using blockchain technology. Features include voter verification, real-time vote counting, and audit trails.',
    category: 'Cybersecurity',
    submittedBy: 'Team Beta',
    submitDate: '2024-04-10',
    status: 'approved',
    technologies: ['Ethereum', 'Solidity', 'Web3.js', 'React'],
    presentationSlot: '10:45 AM - 11:15 AM',
    presentationDate: '2025-06-15',
    venue: 'Room A101',
    team: ['David Kim', 'Emma Watson', 'James Smith'],
    links: {
      documentation: 'https://docs.blockvote.project',
      repository: 'https://github.com/team-beta/block-vote',
      demo: 'https://demo.blockvote.project'
    }
  },
  {
    id: 3,
    title: 'Augmented Reality Campus Tour',
    description: 'An AR application that provides interactive virtual tours of the university campus. Users can explore buildings, get information about facilities, and navigate using their mobile devices.',
    category: 'Mobile Applications',
    submittedBy: 'Team Gamma',
    submitDate: '2024-04-15',
    status: 'pending',
    technologies: ['Unity', 'ARKit', 'ARCore', 'C#'],
    presentationSlot: 'Not Assigned',
    presentationDate: 'Not Assigned',
    venue: 'Not Assigned',
    team: ['Sophia Garcia', 'Noah Lee'],
    links: {
      documentation: 'https://docs.arcampus.project',
      repository: 'https://github.com/team-gamma/ar-campus',
      demo: 'https://demo.arcampus.project'
    }
  },
  {
    id: 4,
    title: 'Smart Urban Farming System',
    description: 'An IoT-based solution for urban farming that automates plant care through sensors and smart controls. Includes features for monitoring soil health, water usage, and growth patterns.',
    category: 'Robotics & IoT',
    submittedBy: 'Team Delta',
    submitDate: '2024-04-11',
    status: 'approved',
    technologies: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT'],
    presentationSlot: '11:30 AM - 12:00 PM',
    presentationDate: '2025-06-15',
    venue: 'Room A102',
    team: ['Daniel Park', 'Emily Brown', 'Ryan Wilson'],
    links: {
      documentation: 'https://docs.smartfarm.project',
      repository: 'https://github.com/team-delta/smart-farm',
      demo: 'https://demo.smartfarm.project'
    }
  },
  {
    id: 5,
    title: 'Collaborative Code Editor',
    description: 'A real-time collaborative code editor with features like syntax highlighting, version control integration, and video chat for pair programming sessions.',
    category: 'Web Development',
    submittedBy: 'Team Epsilon',
    submitDate: '2024-04-13',
    status: 'rejected',
    technologies: ['WebSocket', 'Monaco Editor', 'Node.js', 'WebRTC'],
    presentationSlot: 'Rejected',
    presentationDate: 'Rejected',
    venue: 'Rejected',
    team: ['Liam Taylor', 'Olivia Martinez'],
    links: {
      documentation: 'https://docs.codeedit.project',
      repository: 'https://github.com/team-epsilon/code-edit',
      demo: 'https://demo.codeedit.project'
    }
  },
  {
    id: 6,
    title: 'Predictive Analytics for Education',
    description: 'A machine learning system that analyzes student performance data to predict academic outcomes and provide personalized learning recommendations.',
    category: 'Data Science',
    submittedBy: 'Team Zeta',
    submitDate: '2024-04-16',
    status: 'pending',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    presentationSlot: 'Not Assigned',
    presentationDate: 'Not Assigned',
    venue: 'Not Assigned',
    team: ['Mason Clark', 'Ava Thompson'],
    links: {
      documentation: 'https://docs.eduanalytics.project',
      repository: 'https://github.com/team-zeta/edu-analytics',
      demo: 'https://demo.eduanalytics.project'
    }
  }
];

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [projectToApprove, setProjectToApprove] = useState<number | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [projectToReject, setProjectToReject] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on search term and status filter
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handler for approving a project
  const handleApprove = (id: number) => {
    setProjectToApprove(id);
    setShowApproveModal(true);
  };

  // Confirm project approval
  const confirmApprove = () => {
    if (projectToApprove) {
      setProjects(projects.map(project => 
        project.id === projectToApprove ? { ...project, status: 'approved' } : project
      ));
      setShowApproveModal(false);
      setProjectToApprove(null);
    }
  };

  // Handler for rejecting a project
  const handleReject = (id: number) => {
    setProjectToReject(id);
    setShowRejectModal(true);
  };

  // Confirm project rejection
  const confirmReject = () => {
    if (projectToReject) {
      setProjects(projects.map(project => 
        project.id === projectToReject ? { ...project, status: 'rejected' } : project
      ));
      setShowRejectModal(false);
      setProjectToReject(null);
    }
  };

  // Handler for deleting a project
  const handleDelete = (id: number) => {
    setProjectToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm project deletion
  const confirmDelete = () => {
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== projectToDelete));
      setShowDeleteModal(false);
      setProjectToDelete(null);
    }
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  // Render status badge based on project status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
      case 'rejected':
        return (
          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 items-center">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-7xl py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Manage Projects</h1>
          <p className="text-gray-600">Review, approve, or reject project submissions.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add New Project
          </button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="relative sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Projects Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submit Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{project.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{project.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{project.submittedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{project.submitDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Details"
                          onClick={() => handleViewProject(project)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-gray-600 hover:text-gray-900"
                          title="Edit Project"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        {project.status === 'pending' && (
                          <>
                            <button 
                              className="text-green-600 hover:text-green-900"
                              title="Approve Project"
                              onClick={() => handleApprove(project.id)}
                            >
                              <Check className="h-5 w-5" />
                            </button>
                            <button 
                              className="text-red-600 hover:text-red-900"
                              title="Reject Project"
                              onClick={() => handleReject(project.id)}
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button 
                          className="text-red-600 hover:text-red-900"
                          title="Delete Project"
                          onClick={() => handleDelete(project.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Project</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Approve Confirmation Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Approve Project</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to approve this project? It will be displayed on the public projects page.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmApprove}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Reject Project</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to reject this project? The student will be notified about the rejection.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Project Details"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Title</h4>
              <p className="mt-1 text-lg font-medium text-gray-900">{selectedProject.title}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedProject.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="mt-1 text-sm text-gray-900">{selectedProject.category}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <div className="mt-1">{renderStatusBadge(selectedProject.status)}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Team Members</h4>
              <div className="mt-2 space-y-2">
                {selectedProject.team.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-medium">
                      {member.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-900">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Technologies</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Presentation Schedule</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm text-gray-900">{selectedProject.presentationDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Time Slot</p>
                  <p className="text-sm text-gray-900">{selectedProject.presentationSlot}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Venue</p>
                  <p className="text-sm text-gray-900">{selectedProject.venue}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Project Links</h4>
              <div className="space-y-2">
                {selectedProject.links.documentation && (
                  <a 
                    href={selectedProject.links.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Documentation
                  </a>
                )}
                {selectedProject.links.repository && (
                  <a 
                    href={selectedProject.links.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Repository
                  </a>
                )}
                {selectedProject.links.demo && (
                  <a 
                    href={selectedProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Submission Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Submitted By</p>
                  <p className="text-sm text-gray-900">{selectedProject.submittedBy}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Submit Date</p>
                  <p className="text-sm text-gray-900">{selectedProject.submitDate}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Project Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Project"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={selectedProject.title}
                onChange={(e) => setSelectedProject({...selectedProject, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={selectedProject.description}
                onChange={(e) => setSelectedProject({...selectedProject, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedProject.category}
                  onChange={(e) => setSelectedProject({...selectedProject, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Mobile Applications">Mobile Applications</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Robotics & IoT">Robotics & IoT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={selectedProject.status}
                  onChange={(e) => setSelectedProject({...selectedProject, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Members
              </label>
              <div className="space-y-2">
                {selectedProject.team.map((member, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={member}
                      onChange={(e) => {
                        const newTeam = [...selectedProject.team];
                        newTeam[index] = e.target.value;
                        setSelectedProject({...selectedProject, team: newTeam});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => {
                        const newTeam = selectedProject.team.filter((_, i) => i !== index);
                        setSelectedProject({...selectedProject, team: newTeam});
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setSelectedProject({
                    ...selectedProject,
                    team: [...selectedProject.team, '']
                  })}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Team Member
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies
              </label>
              <div className="space-y-2">
                {selectedProject.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => {
                        const newTech = [...selectedProject.technologies];
                        newTech[index] = e.target.value;
                        setSelectedProject({...selectedProject, technologies: newTech});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <button
                      onClick={() => {
                        const newTech = selectedProject.technologies.filter((_, i) => i !== index);
                        setSelectedProject({...selectedProject, technologies: newTech});
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setSelectedProject({
                    ...selectedProject,
                    technologies: [...selectedProject.technologies, '']
                  })}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Technology
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Presentation Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={selectedProject.presentationDate}
                    onChange={(e) => setSelectedProject({...selectedProject, presentationDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={selectedProject.presentationSlot}
                    onChange={(e) => setSelectedProject({...selectedProject, presentationSlot: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={selectedProject.venue}
                    onChange={(e) => setSelectedProject({...selectedProject, venue: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Project Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documentation URL
                  </label>
                  <input
                    type="url"
                    value={selectedProject.links.documentation}
                    onChange={(e) => setSelectedProject({
                      ...selectedProject,
                      links: {...selectedProject.links, documentation: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    value={selectedProject.links.repository}
                    onChange={(e) => setSelectedProject({
                      ...selectedProject,
                      links: {...selectedProject.links, repository: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demo URL
                  </label>
                  <input
                    type="url"
                    value={selectedProject.links.demo}
                    onChange={(e) => setSelectedProject({
                      ...selectedProject,
                      links: {...selectedProject.links, demo: e.target.value}
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would update the project in the database
                  setProjects(projects.map(p => 
                    p.id === selectedProject.id ? selectedProject : p
                  ));
                  setShowEditModal(false);
                }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Project Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Project"
      >
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Enter project description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team
            </label>
            <input
              type="text"
              placeholder="Enter team name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Links
            </label>
            <div className="space-y-3">
              <input
                type="url"
                placeholder="Documentation URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="url"
                placeholder="Repository URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="url"
                placeholder="Demo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              Add Project
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProjects;