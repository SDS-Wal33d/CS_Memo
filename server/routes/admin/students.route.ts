import { prisma } from "@server/lib/prisma";
import { studentSchema } from "@server/lib/schemas/student.schema";
import { adminFactory } from "@server/lib/utils/factory";
import { zValidator } from "@hono/zod-validator";

const studentsRoute = adminFactory
  .createApp()
  .get("/", async (c) => {
    const students = await prisma.user.findMany({
      where: {
        student: {
          isNot: null,
        },
        admin: null,
      },
      include: {
        student: {
          include: {
            project: true,
          },
        },
      },
    });

    return c.json({ students });
  })
  .post("/", zValidator("json", studentSchema), async (c) => {
    const data = c.req.valid("json");

    const count = await prisma.student.count();

    const user = await prisma.user.create({
      data: {
        id: `CS2025${String(count + 1).padStart(3, "0")}`,
        passwordHash: "password123456",
        student: {
          create: {
            fullname: data.name,
            email: data.email,
          },
        },
      },
    });

    return c.json({ user });
  })
  .patch("/:id", zValidator("json", studentSchema), async (c) => {
    const { id } = c.req.param();
    const data = c.req.valid("json");

    const student = await prisma.student.update({
      where: { id },
      data: {
        fullname: data.name,
        email: data.email,
      },
    });

    return c.json({ student });
  })
  .delete("/:id", async (c) => {
    const { id } = c.req.param();

    await prisma.user.delete({
      where: { id },
    });

    return c.json({ message: "Student deleted successfully" });
  });

export default studentsRoute;
