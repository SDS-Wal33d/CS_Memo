import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen || location.pathname !== '/' 
          ? 'bg-primary-950 shadow-lg py-2' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <GraduationCap className="h-8 w-8 text-accent-400" />
              <span className="ml-2 text-xl font-bold text-white font-display">CS GradConf</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              <Link to="/" className="text-white hover:text-accent-300 px-2 py-1 rounded-md font-medium">
                Home
              </Link>
              <Link to="/projects" className="text-white hover:text-accent-300 px-2 py-1 rounded-md font-medium">
                Projects
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to={isAdmin ? "/admin" : "/dashboard"} className="text-white hover:text-accent-300 px-2 py-1 rounded-md font-medium">
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                  Login
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-accent-300 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-950 shadow-lg">
          <div className="px-6 pt-2 pb-6 space-y-4">
            <Link 
              to="/" 
              className="block text-white hover:text-accent-300 px-2 py-2 rounded-md font-medium"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className="block text-white hover:text-accent-300 px-2 py-2 rounded-md font-medium"
              onClick={closeMenu}
            >
              Projects
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to={isAdmin ? "/admin" : "/dashboard"} 
                  className="block text-white hover:text-accent-300 px-2 py-2 rounded-md font-medium"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="w-full text-left bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;