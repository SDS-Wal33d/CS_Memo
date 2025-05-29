import React, { useState } from 'react';

const mockProjects = [
  { id: 1, title: 'AI Health Assistant', status: 'pending', team: 'Team Alpha' },
  { id: 2, title: 'Blockchain Voting', status: 'approved', team: 'Team Beta' },
  { id: 3, title: 'AR Campus Tour', status: 'pending', team: 'Team Gamma' },
];

const QuickProjects: React.FC = () => {
  const [projects, setProjects] = useState(mockProjects);

  const handleApprove = (id: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };
  const handleReject = (id: number) => {
    setProjects(projects.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  };

  return (
    <div className="overflow-x-auto max-h-80">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 text-left">Title</th>
            <th className="px-2 py-1 text-left">Team</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td className="px-2 py-1">{project.title}</td>
              <td className="px-2 py-1">{project.team}</td>
              <td className="px-2 py-1 capitalize">{project.status}</td>
              <td className="px-2 py-1 space-x-1">
                {project.status === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(project.id)} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Approve</button>
                    <button onClick={() => handleReject(project.id)} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Reject</button>
                  </>
                )}
                {project.status !== 'pending' && <span className="text-gray-400 text-xs">No actions</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuickProjects; 