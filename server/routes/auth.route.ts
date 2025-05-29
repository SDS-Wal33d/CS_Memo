import { baseFactory } from "@server/lib/utils/factory";
import { prisma } from "@server/lib/prisma";
import { loginSchema } from "@server/lib/schemas/auth.schema";
import { zValidator } from "@hono/zod-validator";
import { createJWT, makeSiteUser } from "@server/lib/utils/auth";

const authRoute = baseFactory
  .createApp()
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const { id, password } = c.req.valid("json");

    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        admin: true,
        student: true,
      },
    });
    if (!existingUser) {
      return c.json({ message: "invalid credentials" }, 401);
    }

    const { admin, student, ...user } = existingUser;

    const isPasswordValid = await Bun.password.verify(
      password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      return c.json({ message: "invalid credentials" }, 401);
    }

    const siteUser = makeSiteUser({ user, admin, student });
    const token = await createJWT(siteUser);

    return c.json({ token });
  })
  .get("/me", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    return c.json({ user });
  });

export default authRoute;
