import { Router } from "express";
import { createUserController } from "../components/user/use-cases/create-user";
import { getUserController } from "../components/user/use-cases/get-user";
import { AuthenticatedRequest, verifyJWT } from "../utils/verifyJWT";

const userRoutes = Router();

userRoutes.post("/", (request, response, next) => {
  return createUserController.handle(request, response, next);
});

userRoutes.get("/", verifyJWT, (request, response, next) => {
  return getUserController.handle(
    request as AuthenticatedRequest,
    response,
    next,
  );
});

export { userRoutes };
