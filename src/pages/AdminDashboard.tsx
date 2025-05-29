import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  UserSquare2, 
  LogOut,
  ChevronRight,
  Calendar 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-primary-950 border-r border-primary-900">
            <div className="pt-5 pb-4 flex flex-col h-full">
              <div className="px-4 flex items-center">
                <div className="h-10 w-10 bg-primary-800 text-white rounded-md flex items-center justify-center font-bold text-xl">
                  A
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium text-sm">{user?.name}</p>
                  <p className="text-primary-400 text-xs">Administrator</p>
                </div>
              </div>
              
              <div className="mt-8 flex-grow">
                <nav className="px-2 space-y-1">
                  <Link
                    to="/admin"
                    className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                      location.pathname === '/admin'
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5 text-primary-400" />
                    Overview
                    <ChevronRight className="ml-auto h-4 w-4 text-primary-500" />
                  </Link>
                  
                  <Link
                    to="/admin/users"
                    className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                      location.pathname === '/admin/users'
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <Users className="mr-3 h-5 w-5 text-primary-400" />
                    Reserved Users
                    <ChevronRight className="ml-auto h-4 w-4 text-primary-500" />
                  </Link>
                  
                  <Link
                    to="/admin/projects"
                    className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                      location.pathname === '/admin/projects'
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <FolderKanban className="mr-3 h-5 w-5 text-primary-400" />
                    Projects
                    <ChevronRight className="ml-auto h-4 w-4 text-primary-500" />
                  </Link>
                  
                  <Link
                    to="/admin/students"
                    className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                      location.pathname === '/admin/students'
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <UserSquare2 className="mr-3 h-5 w-5 text-primary-400" />
                    Student Teams
                    <ChevronRight className="ml-auto h-4 w-4 text-primary-500" />
                  </Link>
                  
                  <Link
                    to="/admin/timeline"
                    className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                      location.pathname === '/admin/timeline'
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                    }`}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-primary-400" />
                    Event Timeline
                    <ChevronRight className="ml-auto h-4 w-4 text-primary-500" />
                  </Link>
                </nav>
              </div>
              
              <div className="px-3 mb-6">
                <button
                  onClick={() => {
                    logout();
                    // You might want to redirect to the login page after logout
                    window.location.href = '/login';
                  }}
                  className="w-full flex items-center px-2 py-2 text-sm font-medium text-primary-300 hover:text-white rounded-md hover:bg-primary-800"
                >
                  <LogOut className="mr-3 h-5 w-5 text-primary-400" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="pb-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;