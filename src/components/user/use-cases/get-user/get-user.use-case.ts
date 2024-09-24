import { ResourceNotFoundException } from "../../../../errors/ResourceNotFoundException";
import { User } from "../../model/user";
import { UserRepository } from "../../repositories/user.repository";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<Omit<User, "hashed_password"> | null> {
    const user = await this.userRepository.getById(id);
    if (!user) throw new ResourceNotFoundException();
    return user;
  }
}
