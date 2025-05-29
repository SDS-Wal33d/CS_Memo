import React, { useState } from 'react';

const mockStudents = [
  { id: 1, name: 'Alex Johnson', email: 'alex@uni.edu', team: 'Team Alpha' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@uni.edu', team: 'Team Alpha' },
  { id: 3, name: 'David Kim', email: 'david@uni.edu', team: 'Team Beta' },
];

const QuickStudents: React.FC = () => {
  const [students, setStudents] = useState(mockStudents);

  const handleDelete = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  return (
    <div className="overflow-x-auto max-h-80">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Name</th>
            <th className="px-2 py-1 text-left">Email</th>
            <th className="px-2 py-1 text-left">Team</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="px-2 py-1">{student.name}</td>
              <td className="px-2 py-1">{student.email}</td>
              <td className="px-2 py-1">{student.team}</td>
              <td className="px-2 py-1">
                <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuickStudents; 