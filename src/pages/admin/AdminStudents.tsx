import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus, Users, X, Check, Key, LayoutList } from 'lucide-react';
import Modal from '../../components/common/Modal';

// Mock students data for demonstration
const mockStudents = [
  {
    id: 1,
    name: 'Alex Johnson',
    studentId: 'CS2025001',
    email: 'alex.johnson@university.edu',
    teamId: 1,
    teamName: 'Team Alpha',
    projectAssigned: true
  },
  {
    id: 2,
    name: 'Sarah Chen',
    studentId: 'CS2025002',
    email: 'sarah.chen@university.edu',
    teamId: 1,
    teamName: 'Team Alpha',
    projectAssigned: true
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    studentId: 'CS2025003',
    email: 'michael.rodriguez@university.edu',
    teamId: 1,
    teamName: 'Team Alpha',
    projectAssigned: true
  },
  {
    id: 4,
    name: 'David Kim',
    studentId: 'CS2025004',
    email: 'david.kim@university.edu',
    teamId: 2,
    teamName: 'Team Beta',
    projectAssigned: true
  },
  {
    id: 5,
    name: 'Emma Watson',
    studentId: 'CS2025005',
    email: 'emma.watson@university.edu',
    teamId: 2,
    teamName: 'Team Beta',
    projectAssigned: true
  },
  {
    id: 6,
    name: 'James Smith',
    studentId: 'CS2025006',
    email: 'james.smith@university.edu',
    teamId: 2,
    teamName: 'Team Beta',
    projectAssigned: true
  },
  {
    id: 7,
    name: 'Sophia Garcia',
    studentId: 'CS2025007',
    email: 'sophia.garcia@university.edu',
    teamId: 3,
    teamName: 'Team Gamma',
    projectAssigned: false
  },
  {
    id: 8,
    name: 'Noah Lee',
    studentId: 'CS2025008',
    email: 'noah.lee@university.edu',
    teamId: 3,
    teamName: 'Team Gamma',
    projectAssigned: false
  }
];

// Mock teams data
const mockTeams = [
  { id: 1, name: 'Team Alpha', project: 'AI-Powered Health Assistant', projectDescription: '' },
  { id: 2, name: 'Team Beta', project: 'Secure Blockchain Voting System', projectDescription: '' },
  { id: 3, name: 'Team Gamma', project: null, projectDescription: '' }
];

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);
  const [teams, setTeams] = useState(mockTeams);
  const [searchTerm, setSearchTerm] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [studentToReset, setStudentToReset] = useState<number | null>(null);
  const [showManageTeamModal, setShowManageTeamModal] = useState(false);
  const [showAssignProjectModal, setShowAssignProjectModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // New student form state
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    teamId: '',
  });
  
  // New team form state
  const [newTeam, setNewTeam] = useState({
    name: '',
    project: '',
  });

  // Filter students based on search and team filter
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === 'all' || student.teamId.toString() === teamFilter;
    return matchesSearch && matchesTeam;
  });

  // Handler for deleting a student
  const handleDelete = (id: number) => {
    setStudentToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm student deletion
  const confirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter(student => student.id !== studentToDelete));
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  // Handler for resetting a student's password
  const handleResetPassword = (id: number) => {
    setStudentToReset(id);
    setShowResetPasswordModal(true);
  };

  // Handle adding a new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = Math.max(...students.map(s => s.id)) + 1;
    const teamObject = teams.find(t => t.id.toString() === newStudent.teamId);
    
    const createdStudent = {
      id: newId,
      name: newStudent.name,
      studentId: `CS2025${String(newId).padStart(3, '0')}`,
      email: newStudent.email,
      teamId: parseInt(newStudent.teamId),
      teamName: teamObject ? teamObject.name : 'Unassigned',
      projectAssigned: teamObject ? !!teamObject.project : false
    };
    
    setStudents([...students, createdStudent]);
    setNewStudent({ name: '', email: '', teamId: '' });
    setShowAddModal(false);
  };

  // Handle adding a new team
  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the team to the database
    setShowAddTeamModal(false);
    setNewTeam({ name: '', project: '' });
  };

  const handleManageTeam = (team: any) => {
    // Gather members for the team
    const members = students.filter(s => s.teamId === team.id);
    setSelectedTeam({ ...team, members });
    setShowManageTeamModal(true);
  };

  const handleAssignProject = (team: any) => {
    setSelectedTeam({
      ...team,
      projectDescription: team.projectDescription || ''
    });
    setShowAssignProjectModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowEditStudentModal(true);
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-7xl py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Student Teams</h1>
          <p className="text-gray-600">Manage student accounts and organize them into project teams.</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => setShowAddTeamModal(true)}
            className="bg-secondary-600 hover:bg-secondary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <Users className="h-4 w-4 mr-2" />
            Add Team
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search students..."
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
        
        <div className="relative sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
          >
            <option value="all">All Teams</option>
            {teams.map(team => (
              <option key={team.id} value={team.id.toString()}>
                {team.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Team Summary Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {team.project ? `Project: ${team.project}` : 'No project assigned'}
                </p>
              </div>
              <div className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {students.filter(s => s.teamId === team.id).length} Students
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex -space-x-2 overflow-hidden">
                {students
                  .filter(s => s.teamId === team.id)
                  .slice(0, 3)
                  .map(student => (
                    <div key={student.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  ))}
                {students.filter(s => s.teamId === team.id).length > 3 && (
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700">
                    +{students.filter(s => s.teamId === team.id).length - 3}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
              <button 
                onClick={() => handleManageTeam(team)}
                className="text-sm text-primary-600 hover:text-primary-800 font-medium"
              >
                Manage Team
              </button>
              <button 
                onClick={() => handleAssignProject(team)}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Assign Project
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Students Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.studentId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.teamName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.projectAssigned ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Assigned
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 items-center">
                          <LayoutList className="h-3 w-3 mr-1" />
                          Unassigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="text-primary-600 hover:text-primary-900"
                          title="Edit Student"
                          onClick={() => handleEditStudent(student)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-amber-600 hover:text-amber-900"
                          title="Reset Password"
                          onClick={() => handleResetPassword(student.id)}
                        >
                          <Key className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          title="Delete Student"
                          onClick={() => handleDelete(student.id)}
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
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Student</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete this student? This action cannot be undone.
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
      
      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mx-auto mb-4">
                <Key className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Reset Password</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to reset this student's password? A new temporary password will be generated and sent to their email.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowResetPasswordModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would reset the password
                    setShowResetPasswordModal(false);
                    setStudentToReset(null);
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Student</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent}>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                    Assign to Team
                  </label>
                  <select
                    id="team"
                    value={newStudent.teamId}
                    onChange={(e) => setNewStudent({...newStudent, teamId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a team</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id.toString()}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  A secure password will be generated automatically and sent to the student's email address.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Add Team Modal */}
      {showAddTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Team</h3>
              <button
                onClick={() => setShowAddTeamModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddTeam}>
              <div className="p-6">
                <div className="mb-4">
                  <label htmlFor="teamName" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    value={newTeam.project}
                    onChange={(e) => setNewTeam({...newTeam, project: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddTeamModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-secondary-600 text-white rounded-md hover:bg-secondary-700"
                  >
                    Create Team
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Team Modal */}
      <Modal
        isOpen={showManageTeamModal}
        onClose={() => setShowManageTeamModal(false)}
        title="Manage Team"
      >
        {selectedTeam && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={selectedTeam.name}
                onChange={e => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
              <div className="space-y-2">
                {selectedTeam.members.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <button className="text-red-600 hover:text-red-900" onClick={() => {
                      setSelectedTeam({
                        ...selectedTeam,
                        members: selectedTeam.members.filter((m: any) => m.id !== member.id)
                      });
                    }}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowManageTeamModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                onClick={() => {
                  // Update teams state
                  setTeams(teams.map(t => t.id === selectedTeam.id ? { ...t, name: selectedTeam.name } : t));
                  // Remove team from removed members
                  const removedIds = students.filter(s => s.teamId === selectedTeam.id && !selectedTeam.members.some((m: any) => m.id === s.id)).map(s => s.id);
                  setStudents(students.map(s =>
                    removedIds.includes(s.id)
                      ? { ...s, teamId: null, teamName: 'Unassigned' }
                      : s.teamId === selectedTeam.id
                        ? { ...s, teamName: selectedTeam.name }
                        : s
                  ));
                  setShowManageTeamModal(false);
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Project Modal */}
      <Modal
        isOpen={showAssignProjectModal}
        onClose={() => setShowAssignProjectModal(false)}
        title="Assign Project"
      >
        {selectedTeam && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={selectedTeam.project || ''}
                onChange={e => setSelectedTeam({ ...selectedTeam, project: e.target.value })}
                placeholder="Enter project title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                rows={4}
                value={typeof selectedTeam.projectDescription === 'string' ? selectedTeam.projectDescription : ''}
                onChange={e => setSelectedTeam({ ...selectedTeam, projectDescription: e.target.value })}
                placeholder="Enter project description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAssignProjectModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                onClick={() => {
                  // Update teams state
                  setTeams(teams.map(t => t.id === selectedTeam.id ? { ...t, project: selectedTeam.project, projectDescription: selectedTeam.projectDescription } : t));
                  // Set projectAssigned true for all students in this team
                  setStudents(students.map(s =>
                    s.teamId === selectedTeam.id
                      ? { ...s, projectAssigned: true }
                      : s
                  ));
                  setShowAssignProjectModal(false);
                }}
              >
                Assign Project
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={showEditStudentModal}
        onClose={() => setShowEditStudentModal(false)}
        title="Edit Student"
      >
        {selectedStudent && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={selectedStudent.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={selectedStudent.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team
              </label>
              <select
                value={selectedStudent.team || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Unassigned</option>
                {teams.map(team => (
                  <option key={team.id} value={team.name}>{team.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditStudentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminStudents;