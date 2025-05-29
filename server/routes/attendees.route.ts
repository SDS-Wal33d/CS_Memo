import { prisma } from "@server/lib/prisma";
import { baseFactory } from "@server/lib/utils/factory";
import { zValidator } from "@hono/zod-validator";
import { attendeeSchema } from "@server/lib/schemas/attendee.schema";

const attendeesRoute = baseFactory
  .createApp()
  .post("/", zValidator("json", attendeeSchema), async (c) => {
    const data = c.req.valid("json");

    const count = await prisma.attendee.count();
    const attendee = await prisma.attendee.create({
      data: {
        fullname: data.name,
        email: data.email,
        phone: data.phone,
        ticket: `GRAD2024-${String(count + 1).padStart(3, "0")}`,
        attendStatus: "ACCEPTED",
        department: data.department,
        attendeeTypeId: data.type,
      },
    });

    return c.json({ attendee });
  });

export default attendeesRoute;
