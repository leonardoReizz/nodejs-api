import { generateHashedPassword } from "../../../../utils/generateHashedPassword";
import { UserRepository } from "../../repositories/user.repository";
import { CreateUserRequestDTO } from "./create-user.request-dto";

export class CreateUserUseCase {
  constructor (private userRepository: UserRepository){}

  async execute({password, ...data}: CreateUserRequestDTO): Promise<Number> {
    const hashedPassword = await generateHashedPassword(password)
    const user = await this.userRepository.create({...data, hashed_password: hashedPassword})
    return user;
  }
}