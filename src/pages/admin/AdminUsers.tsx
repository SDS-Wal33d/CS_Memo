import React, { useState } from 'react';
import { Search, Download, Mail, Phone, User, X, MapPin, Eye } from 'lucide-react';
import Modal from '../../components/common/Modal';

// Mock reservation data for demonstration
const mockReservations = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    department: 'Artificial Intelligence',
    attendeeType: 'student',
    registrationDate: '2024-04-10',
    ticketNumber: 'GRAD2024-001',
    status: 'Confirmed'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '(555) 234-5678',
    department: 'Web Development',
    attendeeType: 'student',
    registrationDate: '2024-04-11',
    ticketNumber: 'GRAD2024-002',
    status: 'Confirmed'
  },
  {
    id: 3,
    name: 'Dr. Michael Brown',
    email: 'michael.brown@example.com',
    phone: '(555) 345-6789',
    department: 'Data Science',
    attendeeType: 'faculty',
    registrationDate: '2024-04-12',
    ticketNumber: 'GRAD2024-003',
    status: 'Confirmed'
  },
  {
    id: 4,
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    phone: '(555) 456-7890',
    department: 'Cybersecurity',
    attendeeType: 'student',
    registrationDate: '2024-04-13',
    ticketNumber: 'GRAD2024-004',
    status: 'Confirmed'
  },
  {
    id: 5,
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '(555) 567-8901',
    department: 'Mobile Applications',
    attendeeType: 'student',
    registrationDate: '2024-04-14',
    ticketNumber: 'GRAD2024-005',
    status: 'Confirmed'
  },
  {
    id: 6,
    name: 'Jennifer Miller',
    email: 'jennifer.miller@techcorp.com',
    phone: '(555) 678-9012',
    department: 'Game Development',
    attendeeType: 'industry',
    registrationDate: '2024-04-15',
    ticketNumber: 'GRAD2024-006',
    status: 'Confirmed'
  },
  {
    id: 7,
    name: 'Robert Taylor',
    email: 'robert.taylor@example.com',
    phone: '(555) 789-0123',
    department: 'Robotics & IoT',
    attendeeType: 'student',
    registrationDate: '2024-04-16',
    ticketNumber: 'GRAD2024-007',
    status: 'Confirmed'
  },
  {
    id: 8,
    name: 'Prof. Elizabeth Clark',
    email: 'elizabeth.clark@example.com',
    phone: '(555) 890-1234',
    department: 'Artificial Intelligence',
    attendeeType: 'faculty',
    registrationDate: '2024-04-17',
    ticketNumber: 'GRAD2024-008',
    status: 'Confirmed'
  }
];

const AdminUsers: React.FC = () => {
  const [reservations] = useState(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendeeFilter, setAttendeeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedReservation, setSelectedReservation] = useState<typeof reservations[number] | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  
  // Extract unique departments for filter dropdown
  const departments = ['all', ...new Set(reservations.map(r => r.department))];
  
  // Filter reservations based on search and filters
  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reservation.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAttendee = attendeeFilter === 'all' || reservation.attendeeType === attendeeFilter;
    const matchesDepartment = departmentFilter === 'all' || reservation.department === departmentFilter;
    return matchesSearch && matchesAttendee && matchesDepartment;
  });

  // Render attendee type badge
  const renderAttendeeBadge = (type: string) => {
    switch (type) {
      case 'student':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Student
          </span>
        );
      case 'faculty':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
            Faculty
          </span>
        );
      case 'industry':
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Industry
          </span>
        );
      default:
        return null;
    }
  };

  const handleResendTicket = async (reservation: typeof reservations[number]) => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsResendModalOpen(false);
      // Show success message
      window.alert(`Ticket successfully resent to ${reservation.email}`);
    } catch (error) {
      // Handle error
      console.error('Error resending ticket:', error);
      window.alert('Failed to resend ticket. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-7xl py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Reserved Attendees</h1>
          <p className="text-gray-600">View and manage attendees who have reserved seats for the event.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, email, or ticket number..."
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
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={attendeeFilter}
            onChange={(e) => setAttendeeFilter(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
          >
            <option value="all">All Attendees</option>
            <option value="student">Students</option>
            <option value="faculty">Faculty</option>
            <option value="industry">Industry</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="block w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
          >
            <option value="all">All Departments</option>
            {departments.filter(d => d !== 'all').map(department => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Reservations Summary */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Attendees</p>
            <p className="text-xl font-semibold text-gray-900">{filteredReservations.length}</p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Student Attendees</p>
            <p className="text-xl font-semibold text-gray-900">
              {filteredReservations.filter(r => r.attendeeType === 'student').length}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Unique Departments</p>
            <p className="text-xl font-semibold text-gray-900">
              {new Set(filteredReservations.map(r => r.department)).size}
            </p>
          </div>
        </div>
      </div>
      
      {/* Reservations Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendee Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No reservations found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm">
                          {reservation.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-1" />
                        {reservation.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="h-4 w-4 text-gray-500 mr-1" />
                        {reservation.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderAttendeeBadge(reservation.attendeeType)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{reservation.ticketNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setIsViewModalOpen(true);
                        }}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-primary-600 hover:text-primary-900"
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setIsResendModalOpen(true);
                        }}
                      >
                        <Mail className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Reservation Details"
      >
        {selectedReservation && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.email}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Attendee Type</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.attendeeType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Ticket Number</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.ticketNumber}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.status}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Registration Date</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedReservation.registrationDate}</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Resend Ticket Modal */}
      <Modal
        isOpen={isResendModalOpen}
        onClose={() => setIsResendModalOpen(false)}
        title="Resend Ticket"
      >
        {selectedReservation && (
          <div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to resend the ticket to {selectedReservation.email}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsResendModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleResendTicket(selectedReservation)}
                disabled={isResending}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors flex items-center"
              >
                {isResending ? (
                  <>
                    <span className="animate-spin mr-2">⌛</span>
                    Sending...
                  </>
                ) : (
                  'Resend Ticket'
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminUsers;