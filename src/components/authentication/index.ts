import { UserRepository } from "../user/repositories/user.repository";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationUseCase } from "./authentication.use-case";

const userRepository = new UserRepository
const authenticationUseCase = new AuthenticationUseCase(userRepository)
const authenticationController = new AuthenticationController(authenticationUseCase)

export { authenticationController }