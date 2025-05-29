import React, { useState } from "react";
import { Calendar, Clock, Save, AlertCircle, X, Plus } from "lucide-react";
import { useEventTimeline } from "../../context/EventTimelineContext";
import type { EventTimeline } from "../../context/EventTimelineContext";

const AdminEventTimeline: React.FC = () => {
  const { timeline: initialTimeline, updateTimeline } = useEventTimeline();
  const [timeline, setTimeline] = useState<EventTimeline>(initialTimeline);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTimeline(timeline);
    setSuccessMessage("Timeline updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setTimeline((prev: EventTimeline) => ({
        ...prev,
        [section as keyof EventTimeline]: {
          ...(prev[section as keyof EventTimeline] as Record<string, any>),
          [field as string]: value,
        },
      }));
    } else {
      setTimeline((prev: EventTimeline) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (value: string[]) => {
    setTimeline((prev: EventTimeline) => ({
      ...prev,
      eventDetails: {
        ...prev.eventDetails,
        attendeeTypes: value,
      },
    }));
  };

  return (
    <div className="px-4 md:px-8 mx-auto max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 font-display">
          Event Timeline
        </h1>
        <p className="text-gray-600">
          Manage important dates and deadlines for the graduation conference.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700">
          <Save className="h-5 w-5 mr-2" />
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Event Location Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Event Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    name="eventLocation.venue"
                    value={timeline.eventLocation.venue}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="eventLocation.address"
                    value={timeline.eventLocation.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="eventDetails.endTime"
                      value={timeline.eventDetails.endTime}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity Status
                    </label>
                    <input
                      type="text"
                      name="eventDetails.capacity"
                      value={timeline.eventDetails.capacity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Description
                  </label>
                  <textarea
                    name="eventDetails.description"
                    value={timeline.eventDetails.description}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attendee Types
                  </label>
                  <div className="space-y-2">
                    {timeline.eventDetails.attendeeTypes.map(
                      (type: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={type}
                            onChange={(e) => {
                              const newTypes = [
                                ...timeline.eventDetails.attendeeTypes,
                              ];
                              newTypes[index] = e.target.value;
                              handleArrayChange(newTypes);
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newTypes =
                                timeline.eventDetails.attendeeTypes.filter(
                                  (_: string, i: number) => i !== index
                                );
                              handleArrayChange(newTypes);
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        handleArrayChange([
                          ...timeline.eventDetails.attendeeTypes,
                          "",
                        ])
                      }
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Attendee Type
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Existing Sections */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Conference Schedule
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Graduation Conference Date & Time
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="datetime-local"
                    name="graduationDate"
                    value={timeline.graduationDate}
                    onChange={handleChange}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Submission Period */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project Submission Period
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="datetime-local"
                      name="projectSubmissionStart"
                      value={timeline.projectSubmissionStart}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="datetime-local"
                      name="projectSubmissionEnd"
                      value={timeline.projectSubmissionEnd}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Reservation Period */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Seat Reservation Period
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="datetime-local"
                      name="seatReservationStart"
                      value={timeline.seatReservationStart}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="datetime-local"
                      name="seatReservationEnd"
                      value={timeline.seatReservationEnd}
                      onChange={handleChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Note
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Updating these details will affect:
                      <ul className="list-disc list-inside mt-2">
                        <li>The event information displayed on the homepage</li>
                        <li>The countdown timer on the homepage</li>
                        <li>Project submission availability</li>
                        <li>Seat reservation system availability</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminEventTimeline;
