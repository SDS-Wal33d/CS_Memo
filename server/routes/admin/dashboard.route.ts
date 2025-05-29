import { prisma } from "@server/lib/prisma";
import { adminFactory } from "@server/lib/utils/factory";

const dashboardRoute = adminFactory.createApp().get("/", async (c) => {
  const user = c.get("user");

  return c.json({
    projects: {
      count: await prisma.project.count(),
      pending: await prisma.project.count({
        where: {
          status: "PENDING",
        },
      }),
      approved: await prisma.project.count({
        where: {
          status: "ACCEPTED",
        },
      }),
    },
    teams: {
      count: await prisma.project.count(),
    },
    attendees: {
      count: await prisma.attendee.count(),
      isAllNotified:
        (await prisma.attendee.findFirst({
          where: {
            isNotified: false,
          },
        })) === null,
    },
    settings: await prisma.settings.findUnique({
      where: {
        adminId: user.id,
      },
    }),
  } as const);
});

export default dashboardRoute;
