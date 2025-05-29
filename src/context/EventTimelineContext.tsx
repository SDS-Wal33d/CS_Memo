import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface EventTimeline {
  graduationDate: string;
  projectSubmissionStart: string;
  projectSubmissionEnd: string;
  seatReservationStart: string;
  seatReservationEnd: string;
  eventLocation: {
    venue: string;
    address: string;
  };
  eventDetails: {
    endTime: string;
    description: string;
    attendeeTypes: string[];
    capacity: string;
  };
}

interface EventTimelineContextType {
  timeline: EventTimeline;
  updateTimeline: (newTimeline: EventTimeline) => void;
}

const EventTimelineContext = createContext<
  EventTimelineContextType | undefined
>(undefined);

export const EventTimelineProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [timeline, setTimeline] = useState<EventTimeline>({
    graduationDate: "2025-06-15T10:00",
    projectSubmissionStart: "2025-03-01T00:00",
    projectSubmissionEnd: "2025-05-15T23:59",
    seatReservationStart: "2025-04-01T00:00",
    seatReservationEnd: "2025-06-01T23:59",
    eventLocation: {
      venue: "University Conference Center",
      address: "Main Campus, Building 5",
    },
    eventDetails: {
      endTime: "18:00", // 6:00 PM
      description: "Full day event with breaks",
      attendeeTypes: ["Students", "Faculty", "Industry Partners"],
      capacity: "Limited seats available",
    },
  });

  const updateTimeline = (newTimeline: EventTimeline) => {
    setTimeline(newTimeline);
  };

  return (
    <EventTimelineContext.Provider value={{ timeline, updateTimeline }}>
      {children}
    </EventTimelineContext.Provider>
  );
};

export const useEventTimeline = () => {
  const context = useContext(EventTimelineContext);
  if (context === undefined) {
    throw new Error(
      "useEventTimeline must be used within an EventTimelineProvider"
    );
  }
  return context;
};
