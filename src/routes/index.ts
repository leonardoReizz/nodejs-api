import { Router } from "express";
import { userRoutes } from "./user.routes";
import { authenticationRoutes } from "./authentication.routes";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/authentication", authenticationRoutes);

export { routes };
