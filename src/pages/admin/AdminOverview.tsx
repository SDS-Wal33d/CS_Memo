import React, { useState } from 'react';
import { Users, FolderKanban, CheckSquare, UserCheck, Ticket, Calendar, Link } from 'lucide-react';
import Modal from '../../components/common/Modal';
import QuickProjects from '../../components/admin/QuickActions/QuickProjects';
import QuickReservations from '../../components/admin/QuickActions/QuickReservations';
import QuickStudents from '../../components/admin/QuickActions/QuickStudents';

const AdminOverview: React.FC = () => {
  // Mock data for demonstration
  const stats = {
    totalProjects: 24,
    approvedProjects: 18,
    pendingProjects: 6,
    totalReservations: 156,
    totalStudents: 42,
    daysUntilEvent: 45
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'projects' | 'reservations' | 'students' | null>(null);

  const handleOpenModal = (action: 'projects' | 'reservations' | 'students') => {
    setModalAction(action);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalAction(null);
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to the admin dashboard for the CS Graduation Conference.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FolderKanban className="h-10 w-10 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalProjects}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="flex justify-between text-sm">
              <div className="text-green-600 font-medium flex items-center">
                <CheckSquare className="h-4 w-4 mr-1" />
                <span>{stats.approvedProjects} Approved</span>
              </div>
              <div className="text-amber-600 font-medium">
                {stats.pendingProjects} Pending
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Ticket className="h-10 w-10 text-accent-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Seat Reservations</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalReservations}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm text-gray-600">
              <div className="flex items-center">
                <UserCheck className="h-4 w-4 mr-1 text-green-600" />
                <span>All confirmation emails sent</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-10 w-10 text-secondary-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Student Teams</dt>
                  <dd>
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-1 text-primary-600" />
                <span>{stats.daysUntilEvent} days until the event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg mb-10">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 font-display">Recent Activity</h3>
        </div>
        <div className="px-6 py-5">
          <ul className="divide-y divide-gray-200">
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckSquare className="h-5 w-5 text-green-600" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Project "Smart Urban Farming System" has been approved
                  </p>
                  <p className="text-sm text-gray-500">
                    2 hours ago
                  </p>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-blue-600" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    15 new seat reservations have been received
                  </p>
                  <p className="text-sm text-gray-500">
                    5 hours ago
                  </p>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <FolderKanban className="h-5 w-5 text-yellow-600" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    New project "AR Campus Tour" has been submitted for approval
                  </p>
                  <p className="text-sm text-gray-500">
                    1 day ago
                  </p>
                </div>
              </div>
            </li>
            <li className="py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    3 new student accounts have been created
                  </p>
                  <p className="text-sm text-gray-500">
                    2 days ago
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900 font-display">Quick Actions</h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <FolderKanban className="h-8 w-8 text-primary-600 mx-auto mb-2" />
              <h4 className="text-sm font-medium text-gray-900 mb-1">Manage Projects</h4>
              <p className="text-xs text-gray-500 mb-3">Review and approve submitted projects</p>
              <button 
                onClick={() => handleOpenModal('projects')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                Go to Projects
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Ticket className="h-8 w-8 text-accent-500 mx-auto mb-2" />
              <h4 className="text-sm font-medium text-gray-900 mb-1">View Reservations</h4>
              <p className="text-xs text-gray-500 mb-3">See all seat reservations for the event</p>
              <button 
                onClick={() => handleOpenModal('reservations')}
                className="w-full bg-accent-600 hover:bg-accent-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                View Reservations
              </button>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Users className="h-8 w-8 text-secondary-500 mx-auto mb-2" />
              <h4 className="text-sm font-medium text-gray-900 mb-1">Manage Students</h4>
              <p className="text-xs text-gray-500 mb-3">Add, edit or remove student accounts</p>
              <button 
                onClick={() => handleOpenModal('students')}
                className="w-full bg-secondary-600 hover:bg-secondary-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                Manage Students
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        title={
          modalAction === 'projects' ? 'Manage Projects' :
          modalAction === 'reservations' ? 'View Reservations' :
          modalAction === 'students' ? 'Manage Students' : ''
        }
      >
        {modalAction === 'projects' && <QuickProjects />}
        {modalAction === 'reservations' && <QuickReservations />}
        {modalAction === 'students' && <QuickStudents />}
      </Modal>
    </div>
  );
};

export default AdminOverview;