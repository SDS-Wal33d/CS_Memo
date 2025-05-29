import { z } from "zod";

export const SettingsSchema = z.object({
  venueName: z.string().min(1),
  venueAddress: z.string().min(1),
  eventEndTime: z.date(),
  eventDescription: z.string().min(1),
  capacityStatus: z.string().min(1),
  attendeeTypes: z.array(z.string()),
  conferenceDateTime: z.date(),
  projectSubmissionStart: z.date(),
  projectSubmissionEnd: z.date(),
  seatReservationStart: z.date(),
  seatReservationEnd: z.date(),
});
