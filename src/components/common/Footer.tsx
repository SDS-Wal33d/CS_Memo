import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-950 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-accent-400" />
              <span className="ml-2 text-xl font-bold text-white font-display">CS GradConf</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Celebrating excellence in computer science through our annual graduation conference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-accent-400 transition-colors">Projects</Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-300 hover:text-accent-400 transition-colors">About the Event</a>
              </li>
              <li>
                <a href="/#reserve" className="text-gray-300 hover:text-accent-400 transition-colors">Reserve a Seat</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Conference Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">Schedule</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">Venue</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">Speakers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-accent-400 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mt-1 mr-3 text-accent-400 flex-shrink-0" />
                <span className="text-gray-300">University Campus, Computer Science Department, Building 5</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-accent-400 flex-shrink-0" />
                <a href="mailto:contact@csgraduation.edu" className="text-gray-300 hover:text-accent-400 transition-colors">
                  contact@csgraduation.edu
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-accent-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-accent-400 transition-colors">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CS Graduation Conference. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;