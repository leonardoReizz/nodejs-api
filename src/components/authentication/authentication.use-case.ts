import { compare } from "bcryptjs";
import { BadRequestException } from "../../errors/BadRequestException";
import { UserRepository } from "../user/repositories/user.repository";
import { AuthenticationRequestDTO } from "./authentication.request-dto";
import { generateJWT } from "../../utils/generateJWT";

export class AuthenticationUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: AuthenticationRequestDTO) {
    const user = await this.userRepository.getByEmailWithPassword(data.email);

    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }

    const doesPasswordMatches = await compare(
      data.password,
      user?.hashed_password,
    );

    if (!doesPasswordMatches) {
      throw new BadRequestException("Invalid email or password");
    }

    const { token } = generateJWT(user.id);

    return { token };
  }
}
