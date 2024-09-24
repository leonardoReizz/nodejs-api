import MYSQL from "../../services/mysql/connection";
import { AuthenticationUseCase } from "./authentication.use-case";
import { CreateUserUseCase } from "../user/use-cases/create-user/create-user.use-case";
import { UserMemoryRepository } from "../user/repositories/memory/user-memory.repository";

describe("Authenticate use case", () => {
  let userRepository: UserMemoryRepository;
  let authenticationUseCase: AuthenticationUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userId: number;

  const user = {
    email: "test@gmail.com",
    first_name: "user",
    last_name: "example",
    password: "teste123",
  };

  beforeAll(async () => {
    userRepository = new UserMemoryRepository();
    authenticationUseCase = new AuthenticationUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute(user).then((t) => {
      userId = t;
    });
  });

  afterAll(async () => {
    return new Promise((resolve, reject) => {
      MYSQL.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  });

  test("Should be able to authenticate", async () => {
    const response = await authenticationUseCase.execute({
      email: user.email,
      password: user.password,
    });
    expect(response.token).toBeDefined();
  });

  test("Should not be able to authenticate when invalid password", async () => {
    await expect(
      authenticationUseCase.execute({
        email: user.email,
        password: "randompassword",
      }),
    ).rejects.toThrow("Invalid email or password");
  });

  test("Should not be able to authenticate when invalid email", async () => {
    await expect(
      authenticationUseCase.execute({
        email: "emailnotexists@gmail.com",
        password: user.password,
      }),
    ).rejects.toThrow("Invalid email or password");
  });
});
