import React, { useState } from 'react';
import axios from 'axios';
import { Check, Loader } from 'lucide-react';

const departments = [
  'Artificial Intelligence',
  'Web Development',
  'Mobile Applications',
  'Cybersecurity',
  'Data Science',
  'Game Development',
  'Robotics & IoT'
];

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    attendeeType: 'student'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // In a real application, this would be a call to your backend API
      await axios.post('http://localhost:5000/api/reservations', formData);
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        attendeeType: 'student'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Failed to submit reservation. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {success ? (
        <div className="p-8 bg-green-50 flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 mb-2 font-display text-center">Reservation Successful!</h3>
          <p className="text-green-700 text-center">
            Thank you for reserving your seat. A confirmation email with your ticket and event details has been sent to your email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter your phone number"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="department" className="block text-gray-700 font-medium mb-2">Department Event</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Select a department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Attendee Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendeeType"
                  value="student"
                  checked={formData.attendeeType === 'student'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendeeType"
                  value="faculty"
                  checked={formData.attendeeType === 'faculty'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Faculty</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="attendeeType"
                  value="industry"
                  checked={formData.attendeeType === 'industry'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Industry</span>
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-primary-300 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Processing...
              </>
            ) : (
              'Reserve My Seat'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;