import { UserMemoryRepository } from "../../repositories/memory/user-memory.repository";
import { CreateUserRequestDTO } from "../create-user/create-user.request-dto";
import { CreateUserUseCase } from "../create-user/create-user.use-case";
import { GetUserUseCase } from "./get-user.use-case";
import { ResourceNotFoundException } from "../../../../errors/ResourceNotFoundException";

describe("Get user use case", () => {
  let getUserUseCase: GetUserUseCase;
  let userMemoryRepository: UserMemoryRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    userMemoryRepository = new UserMemoryRepository();
    getUserUseCase = new GetUserUseCase(userMemoryRepository);
    createUserUseCase = new CreateUserUseCase(userMemoryRepository);
  });

  test("Should be able to get user", async () => {
    const user: CreateUserRequestDTO = {
      email: "example@gmail.com",
      first_name: "Example",
      last_name: "Last Name",
      password: "teste123",
    };

    const userId = await createUserUseCase.execute(user);
    const userFinded = await getUserUseCase.execute(userId);

    expect(userFinded).toBeDefined();
    expect(userFinded).not.toHaveProperty("hashed_password");
    expect(userFinded).toMatchObject({
      email: "example@gmail.com",
      first_name: "Example",
      last_name: "Last Name",
    });
  });

  test("Should not be able to get user when user id not exists", async () => {
    await expect(getUserUseCase.execute(2)).rejects.toThrow(
      ResourceNotFoundException,
    );
  });
});
