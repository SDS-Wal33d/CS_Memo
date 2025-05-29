import React from 'react';
import { Calendar, Clock, Users, FolderKanban } from 'lucide-react';
import { useEventTimeline } from '../../context/EventTimelineContext';

const EventTimelineDisplay: React.FC = () => {
  const { timeline } = useEventTimeline();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-950 mb-6 text-center font-display">
            Important Dates
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Mark your calendar with these key dates for the CS Graduation Conference
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Submission Period */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <FolderKanban className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2 font-display">Project Submission</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(timeline.projectSubmissionStart)} - {formatDate(timeline.projectSubmissionEnd)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Opens: {formatTime(timeline.projectSubmissionStart)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Closes: {formatTime(timeline.projectSubmissionEnd)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Reservation Period */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-start">
                <div className="h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-accent-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-primary-900 mb-2 font-display">Seat Reservation</h3>
                  <div className="space-y-1">
                    <p className="text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDate(timeline.seatReservationStart)} - {formatDate(timeline.seatReservationEnd)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Opens: {formatTime(timeline.seatReservationStart)}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      Closes: {formatTime(timeline.seatReservationEnd)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventTimelineDisplay; 