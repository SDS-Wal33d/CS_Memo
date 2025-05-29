import { baseFactory } from "@server/lib/utils/factory";

function roleMiddleware(role: "admin" | "student") {
  return baseFactory.createMiddleware(async (c, next) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (user.role !== role) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    return next();
  });
}

export default roleMiddleware;
