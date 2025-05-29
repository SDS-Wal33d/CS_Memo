import { studentFactory } from "@server/lib/utils/factory";
import projectRoute from "./project.route";
import roleMiddleware from "@server/middlewares/role.middleware";

const studentRoute = studentFactory
  .createApp()
  .use(roleMiddleware("student"))
  .route("/project", projectRoute);

export default studentRoute;
