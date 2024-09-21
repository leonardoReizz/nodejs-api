import { generateHashedPassword } from "../../../../utils/generateHashedPassword";
import { User } from "../../model/user";
import { UserRepository } from "../../repositories/user.repository";

export class GetUserUseCase {
  constructor (private userRepository: UserRepository){}

  async execute(id: string): Promise<Omit<User, "hashed_password"> | null > {
    return this.userRepository.getById(id)
  }
}