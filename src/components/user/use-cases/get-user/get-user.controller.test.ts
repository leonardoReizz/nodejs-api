import { CreateUserRequestDTO } from "../create-user/create-user.request-dto";
import { CreateUserUseCase } from "../create-user/create-user.use-case";
import request from "supertest";
import { app } from "../../../../server";
import { UserRepository } from "../../repositories/user.repository";
import { AuthenticationUseCase } from "../../../authentication/authentication.use-case";
import MYSQL from "../../../../services/mysql/connection";

describe("Get user controller", () => {
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let authenticationUseCase: AuthenticationUseCase;
  let token: string = "";
  let userId: number;

  const user: CreateUserRequestDTO = {
    email: "example@gmail.com",
    first_name: "Example",
    last_name: "Last Name",
    password: "teste123",
  };

  beforeAll(async () => {
    userRepository = new UserRepository();
    authenticationUseCase = new AuthenticationUseCase(userRepository);
    createUserUseCase = new CreateUserUseCase(userRepository);
    await createUserUseCase.execute(user).then((res) => (userId = res));
    await authenticationUseCase
      .execute({ email: user.email, password: user.password })
      .then((res) => (token = `Bearer ${res.token}`));
  });

  afterAll(() => {
    return new Promise((resolve, reject) => {
      MYSQL.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  });

  test("Should be able to get user", async () => {
    const res = await request(app).get("/user").set("Authorization", token);
    expect(res.status).toEqual(200);
    const { password: _, ...rest } = user;
    expect(res?.body?.message).toMatchObject(rest);
  });

  test("Should not be able to get user when invalid token", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", `${token}F0s`);
    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Not authenticated");
  });

  test("Should not be able to get user when token is not defined", async () => {
    const res = await request(app).get("/user");
    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Not authenticated");
  });
});
