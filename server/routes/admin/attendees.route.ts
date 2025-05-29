import { prisma } from "@server/lib/prisma";
import { adminFactory } from "@server/lib/utils/factory";

const attendeesRoute = adminFactory.createApp().get("/", async (c) => {
  const attendees = await prisma.attendee.findMany({
    include: {
      attendeeType: true,
    },
  });

  return c.json({ attendees });
});

export default attendeesRoute;
