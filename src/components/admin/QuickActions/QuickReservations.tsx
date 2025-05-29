import React from 'react';

const mockReservations = [
  { id: 1, name: 'Alex Johnson', email: 'alex@uni.edu', department: 'AI', type: 'student' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@uni.edu', department: 'Web Dev', type: 'faculty' },
  { id: 3, name: 'David Kim', email: 'david@uni.edu', department: 'Cybersecurity', type: 'industry' },
];

const QuickReservations: React.FC = () => (
  <div className="overflow-x-auto max-h-80">
    <table className="min-w-full text-sm">
      <thead>
        <tr>
          <th className="px-2 py-1 text-left">Name</th>
          <th className="px-2 py-1 text-left">Email</th>
          <th className="px-2 py-1 text-left">Department</th>
          <th className="px-2 py-1 text-left">Type</th>
        </tr>
      </thead>
      <tbody>
        {mockReservations.map(r => (
          <tr key={r.id}>
            <td className="px-2 py-1">{r.name}</td>
            <td className="px-2 py-1">{r.email}</td>
            <td className="px-2 py-1">{r.department}</td>
            <td className="px-2 py-1 capitalize">{r.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default QuickReservations; 