import { baseFactory } from "@server/lib/utils/factory";
import indexRoute from "@server/routes/index.route";
import authMiddleware from "@server/middlewares/auth.middleware";
import { cors } from "hono/cors";

const app = baseFactory
  .createApp()
  .basePath("/api")
  .use(
    cors({
      origin: "*",
      allowHeaders: ["Authorization", "Content-Type"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  )
  .use(authMiddleware)
  .route("/", indexRoute);

export default app;
