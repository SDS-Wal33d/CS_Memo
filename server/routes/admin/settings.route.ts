import { prisma } from "@server/lib/prisma";
import { SettingsSchema } from "@server/lib/schemas/settings.schema";
import { adminFactory } from "@server/lib/utils/factory";
import { zValidator } from "@hono/zod-validator";

const settingsRoute = adminFactory
  .createApp()
  .get("/", async (c) => {
    const user = c.get("user");

    const settings = await prisma.settings.findUnique({
      where: {
        adminId: user.id,
      },
    });

    return c.json({ settings });
  })
  .post("/", zValidator("json", SettingsSchema), async (c) => {
    const user = c.get("user");
    const { attendeeTypes, ...data } = c.req.valid("json");

    await prisma.attendeeType.deleteMany({
      where: {
        settings: {
          adminId: user.id,
        },
      },
    });

    const settings = await prisma.settings.update({
      where: { adminId: user.id },
      data: {
        ...data,
        attendeeTypes: {
          create: attendeeTypes.map((type) => ({ name: type })),
        },
      },
    });

    return c.json({ settings });
  });

export default settingsRoute;
