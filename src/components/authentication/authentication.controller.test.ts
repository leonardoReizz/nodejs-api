import { app } from "../../server"
import MYSQL from "../../services/mysql/connection"
import { UserRepository } from "../user/repositories/user.repository"
import { CreateUserUseCase } from "../user/use-cases/create-user/create-user.use-case"
import request from "supertest"

describe("Authenticate controller", () => {
  let userId: number | undefined
  let userRepository: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  const user = {
    email: "test@gmail.com",
    first_name: "user",
    last_name: "example",
    password: "teste123"
  }

  beforeAll(async() => {
    userRepository = new UserRepository()
    createUserUseCase = new CreateUserUseCase(userRepository)
    
    await createUserUseCase.execute(user).then((t) => {
      userId = t
    })
  })

  afterAll(async () => {
    return new Promise((resolve, reject) => {
      MYSQL.query("DELETE FROM users WHERE id = ?", [userId], (err) => {
        if (err) reject(err)
        resolve(true)
      })
    })
  })

  
  test("Should be able to authenticate", async () => {
    const req = await request(app).post("/authentication").type("form").send({email: user.email, password: user.password})
    expect(req.body.message.token).toBeDefined()
  })
})