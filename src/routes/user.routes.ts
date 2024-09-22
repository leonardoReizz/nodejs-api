import { Router } from "express";
import { createUserController } from "../components/user/use-cases/create-user";

const userRoutes = Router()

userRoutes.post("/", (request, response, next) => {
  return createUserController.handle(request, response, next)
})

export { userRoutes }