import { UserRepository } from "../../repositories/user.repository";
import { GetUserController } from "./get-user.controller";
import { GetUserUseCase } from "./get-user.use-case";

const userRepository = new UserRepository();
const getUserUseCase = new GetUserUseCase(userRepository);
const getUserController = new GetUserController(getUserUseCase);

export { getUserController };
