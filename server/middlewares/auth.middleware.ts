import { verifyJWT } from "@server/lib/utils/auth";
import { baseFactory } from "@server/lib/utils/factory";

const authMiddleware = baseFactory.createMiddleware(async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1];
  if (!token) {
    c.set("user", null);
    return next();
  }
  try {
    const user = await verifyJWT(token);
    c.set("user", user);
    return next();
  } catch {
    c.set("user", null);
    return next();
  }
});

export default authMiddleware;
