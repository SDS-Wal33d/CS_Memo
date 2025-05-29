import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventTimelineProvider } from './context/EventTimelineContext';

// Layout components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminUsers from './pages/admin/AdminUsers';
import AdminStudents from './pages/admin/AdminStudents';
import AdminOverview from './pages/admin/AdminOverview';
import AdminEventTimeline from './pages/admin/AdminEventTimeline';

function App() {
  return (
    <AuthProvider>
      <EventTimelineProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<AdminOverview />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="timeline" element={<AdminEventTimeline />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </EventTimelineProvider>
    </AuthProvider>
  );
}

export default App;