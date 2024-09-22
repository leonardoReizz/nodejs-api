import { UserMemoryRepository } from "../../repositories/memory/user-memory.repository"
import { UserRepository } from "../../repositories/user.repository"
import { CreateUserRequestDTO } from "./create-user.request-dto"
import { CreateUserUseCase } from "./create-user.use-case"

describe("Create user use case", () => {
    let userRepository: UserRepository
    let createUserUseCase: CreateUserUseCase
    
    beforeAll(() =>{
        userRepository = new UserMemoryRepository()
        createUserUseCase = new CreateUserUseCase(userRepository)
    })

    test("Should be able to create user" , async () => {
        const user: CreateUserRequestDTO = {
            email: "example@gmail.com",
            first_name: "Example",
            last_name: "Last Name",
            password: "teste123"
        }

        const userId = await createUserUseCase.execute(user)

        expect(userId).toEqual(1)
    })

    test("Should not be able to create user if email already exists" , async () => {    
        let user = {
            email: "example@gmail.com",
            first_name: "Example",
            last_name: "Last Name",
            password: "teste123"
        }

        await expect(createUserUseCase.execute(user)).rejects.toThrow("Email already exists")
    })
})