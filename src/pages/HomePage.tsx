import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Clock, Users } from 'lucide-react';
import CountdownDisplay from '../components/home/CountdownDisplay';
import PastEventsSlider from '../components/home/PastEventsSlider';
import ReservationForm from '../components/home/ReservationForm';
import EventTimelineDisplay from '../components/home/EventTimelineDisplay';
import { useEventTimeline } from '../context/EventTimelineContext';

const HomePage: React.FC = () => {
  const reserveRef = useRef<HTMLDivElement>(null);
  const { timeline } = useEventTimeline();

  const scrollToReserve = () => {
    reserveRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 to-primary-950/95"></div>
          <img 
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg" 
            alt="Graduation Backdrop" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-display">
              CS Graduation<br />Conference 2025
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Celebrating innovation and excellence in computer science through projects, presentations, and networking.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Countdown 
              date={new Date(timeline.graduationDate).getTime()}
              renderer={props => <CountdownDisplay {...props} />} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <Link to="/login" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center">
              Login <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button 
              onClick={scrollToReserve}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center"
            >
              Reserve a Seat <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a 
              href="#about"
              className="bg-transparent border-2 border-gray-300 hover:border-white text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-12 text-center font-display">
              Event Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <Calendar className="text-primary-600 h-8 w-8 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 font-display">Date</h3>
                    <p className="text-gray-700">{new Date(timeline.graduationDate).toLocaleDateString('en-US', { 
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}</p>
                    <p className="text-gray-600 mt-1">{timeline.eventDetails.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <MapPin className="text-primary-600 h-8 w-8 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 font-display">Location</h3>
                    <p className="text-gray-700">{timeline.eventLocation.venue}</p>
                    <p className="text-gray-600 mt-1">{timeline.eventLocation.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <Clock className="text-primary-600 h-8 w-8 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 font-display">Time</h3>
                    <p className="text-gray-700">
                      {new Date(timeline.graduationDate).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                      })} - {timeline.eventDetails.endTime}
                    </p>
                    <p className="text-gray-600 mt-1">{timeline.eventDetails.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <div className="flex items-start">
                  <Users className="text-primary-600 h-8 w-8 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 font-display">Attendees</h3>
                    <p className="text-gray-700">{timeline.eventDetails.attendeeTypes.join(', ')}</p>
                    <p className="text-gray-600 mt-1">{timeline.eventDetails.capacity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add the EventTimelineDisplay component here */}
      <EventTimelineDisplay />

      {/* About the Event */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6 text-center font-display">
              About the Event
            </h2>
            <p className="text-gray-600 text-center mb-12">
              Discover highlights from our previous graduation events
            </p>
            
            <PastEventsSlider />
            
            <div className="mt-12 bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-primary-900 mb-4 font-display">What to Expect</h3>
              <p className="text-gray-700 mb-6">
                The Computer Science Graduation Conference is our department's premier event celebrating the achievements of our graduating students. The conference features:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span>Student project showcases with live demonstrations</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span>Guest speakers from leading tech companies</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span>Networking opportunities with industry professionals</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">4</span>
                  <span>Award ceremony for outstanding projects and students</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">5</span>
                  <span>Graduation celebration reception</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reserve a Seat */}
      <section id="reserve" ref={reserveRef} className="py-20 bg-primary-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center font-display">
              Reserve Your Seat
            </h2>
            <p className="text-gray-300 text-center mb-12">
              Fill out the form below to reserve your spot at the CS Graduation Conference
            </p>
            
            <ReservationForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;