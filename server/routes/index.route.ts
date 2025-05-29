import { baseFactory } from "@server/lib/utils/factory";
import authRoute from "./auth.route";
import studentRoute from "./student/index.route";
import adminRoute from "./admin/index.route";
import attendeesRoute from "./attendees.route";

const indexRoute = baseFactory
  .createApp()
  .route("/student", studentRoute)
  .route("/admin", adminRoute)
  .route("/attendees", attendeesRoute)
  .route("/auth", authRoute);

export default indexRoute;
