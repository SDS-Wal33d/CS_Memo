import { prisma } from "@server/lib/prisma";
import { adminFactory } from "@server/lib/utils/factory";

const projectsRoute = adminFactory
  .createApp()
  .get("/", async (c) => {
    const projects = await prisma.project.findMany();
    return c.json({ projects });
  })
  .post("/accept/:id", async (c) => {
    const { id } = c.req.param();

    const project = await prisma.project.update({
      where: { id },
      data: { status: "ACCEPTED" },
    });

    return c.json({ project });
  })
  .post("/reject/:id", async (c) => {
    const { id } = c.req.param();

    const project = await prisma.project.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    return c.json({ project });
  });

export default projectsRoute;
