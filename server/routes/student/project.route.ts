import { prisma } from "@server/lib/prisma";
import { createProjectSchema } from "@server/lib/schemas/projects.schema";
import { studentFactory } from "@server/lib/utils/factory";
import { zValidator } from "@hono/zod-validator";

const projectRoute = studentFactory
  .createApp()
  .get("/", async (c) => {
    const user = c.get("user");
    const project = await prisma.project.findFirst({
      where: {
        authorId: user.id,
      },
      include: {
        members: true,
      },
    });

    return c.json({ project });
  })
  .post("/", zValidator("json", createProjectSchema), async (c) => {
    const data = c.req.valid("json");
    const user = c.get("user");

    const existingProject = await prisma.project.findFirst({
      where: {
        authorId: user.id,
      },
    });

    if (existingProject) {
      return c.json({ message: "Project already exists" }, 400);
    }

    const project = await prisma.project.create({
      data: {
        authorId: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        techStack: data.techStack,
        teamName: data.teamName,
        members: {
          create:
            data.members?.map((member) => ({
              id: member.memberId,
              fullname: member.fullname,
              email: member.email,
            })) || [],
        },
      },
      include: {
        members: true,
      },
    });

    return c.json({ project }, 201);
  });

export default projectRoute;
