import { Router } from "express";
import { authenticationController } from "../components/authentication";

const authenticationRoutes = Router();

authenticationRoutes.post("/", (request, response, next) => {
  return authenticationController.handle(request, response, next);
});

export { authenticationRoutes };
