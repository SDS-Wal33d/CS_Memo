import { adminFactory } from "@server/lib/utils/factory";
import roleMiddleware from "@server/middlewares/role.middleware";
import dashboardRoute from "./dashboard.route";
import settingsRoute from "./settings.route";
import attendeesRoute from "./attendees.route";

const adminRoute = adminFactory
  .createApp()
  .use(roleMiddleware("admin"))
  .route("/dashboard", dashboardRoute)
  .route("/settings", settingsRoute)
  .route("/attendees", attendeesRoute);

export default adminRoute;
