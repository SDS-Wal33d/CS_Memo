import React, { useState } from 'react';
import { Book, Upload, Users, Award, BarChart2, Loader, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FormData {
  title: string;
  description: string;
  category: string;
  teamMembers: string;
  technologies: string;
}

const categories = [
  'Artificial Intelligence',
  'Web Development',
  'Mobile Applications',
  'Cybersecurity',
  'Data Science',
  'Game Development',
  'Robotics & IoT'
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('submit');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    teamMembers: '',
    technologies: ''
  });
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProjectImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    
    // In a real app, this would upload the image and form data to your backend
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitted(true);
      setFormData({
        title: '',
        description: '',
        category: '',
        teamMembers: '',
        technologies: ''
      });
      setProjectImage(null);
      setImagePreview(null);
    } catch (err) {
      setError('Failed to submit project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-primary-600 text-white rounded-t-xl p-6">
            <h1 className="text-2xl font-bold font-display">Student Dashboard</h1>
            <p className="text-primary-100">Welcome back, {user?.name || 'Student'}</p>
          </div>
          
          <div className="bg-white rounded-b-xl shadow-md overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('submit')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'submit'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Project
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('status')}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === 'status'
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Project Status
                  </div>
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'submit' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 font-display">Submit Your Graduation Project</h2>
                    <p className="text-gray-600">
                      Fill out the form below to submit your project for the graduation event. All projects require approval from the administrator.
                    </p>
                  </div>
                  
                  {submitted ? (
                    <div className="bg-green-50 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Project Submitted Successfully!</h3>
                      <p className="text-green-700 mb-4">
                        Your project has been submitted and is now awaiting approval from the administrator. You will be notified once it's approved.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Submit Another Project
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start">
                          <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-red-700">{error}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Project Title *</label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Enter project title"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Project Category *</label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            required
                          >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Project Description *</label>
                        <textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Provide a detailed description of your project"
                          required
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="teamMembers" className="block text-gray-700 font-medium mb-2">Team Members *</label>
                          <textarea
                            id="teamMembers"
                            name="teamMembers"
                            value={formData.teamMembers}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="List team members and their roles (e.g., John Doe - Frontend Developer)"
                            required
                          ></textarea>
                        </div>
                        
                        <div>
                          <label htmlFor="technologies" className="block text-gray-700 font-medium mb-2">Technologies Used *</label>
                          <textarea
                            id="technologies"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="List technologies used (e.g., React, Node.js, MongoDB)"
                            required
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-2">Project Image *</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          {imagePreview ? (
                            <div>
                              <img 
                                src={imagePreview} 
                                alt="Project Preview" 
                                className="mx-auto h-48 object-contain mb-4"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setProjectImage(null);
                                  setImagePreview(null);
                                }}
                                className="text-red-600 hover:text-red-800 font-medium text-sm"
                              >
                                Remove Image
                              </button>
                            </div>
                          ) : (
                            <div>
                              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-600 mb-2">Drag and drop a project image here, or click to browse</p>
                              <p className="text-gray-500 text-sm">Recommended size: 1200x800px, max 5MB</p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="projectImage"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById('projectImage')?.click()}
                                className="mt-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                              >
                                Browse Files
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-primary-300 flex items-center"
                        >
                          {submitting ? (
                            <>
                              <Loader className="animate-spin h-5 w-5 mr-2" />
                              Submitting...
                            </>
                          ) : (
                            'Submit Project'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
              
              {activeTab === 'status' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 font-display">Project Status</h2>
                    <p className="text-gray-600">
                      Track the status of your submitted projects here. Projects require admin approval before they appear in the public showcase.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Book className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Projects Submitted Yet</h3>
                    <p className="text-gray-600 mb-4">
                      You haven't submitted any projects yet. Go to the "Submit Project" tab to submit your first project.
                    </p>
                    <button
                      onClick={() => setActiveTab('submit')}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Submit a Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;