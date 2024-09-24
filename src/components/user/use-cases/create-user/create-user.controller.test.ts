import request from "supertest"
import { app } from "../../../../server"
import { CreateUserRequestDTO } from "./create-user.request-dto"
import MYSQL from "../../../../services/mysql/connection"

describe("Create user controller", () => {
  test("Should be able to create user", async () => {
    const user : CreateUserRequestDTO = {
      email: "test@gmail.com",
      first_name: "user",
      last_name: "example",
      password: "teste123"
    }

    const req = await request(app).post("/user").type("form").send(user).expect(200)
    expect(req?.body?.message?.id).toBeDefined()
    if(req?.body?.message?.id) {
      return new Promise((resolve, reject) => {
        MYSQL.query("DELETE FROM users WHERE id = ?", [req?.body?.message?.id], (err) => {
          if (err) reject(err)
          resolve(true)
        })
      })
    }
  })

  test("Should not be able to create user when invalid email", async () => {
    const user : CreateUserRequestDTO = {
      email: "examplegmail.com",
      first_name: "user",
      last_name: "example",
      password: "teste123"
    }
    const req = await request(app).post("/user").type("form").send(user).expect(400)
    expect(req?.body?.message?.id).toBeUndefined()
    if(req?.body?.message?.id) {
      MYSQL.query("DELETE * FROM users WHERE id = ? ", [req.body.message.id])
    }
  })

  test("Should not be able to create user when invalid password", async () => {
    const user : CreateUserRequestDTO = {
      email: "examplegmail.com",
      first_name: "user",
      last_name: "example",
      password: "123"
    }
    const req = await request(app).post("/user").type("form").send(user).expect(400)
    expect(req?.body?.message?.id).toBeUndefined()
    if(req?.body?.message?.id) {
      MYSQL.query("DELETE * FROM users WHERE id = ? ", [req.body.message.id])
    }
  })

  test("Should not be able to create user when invalid first name", async () => {
    const user : CreateUserRequestDTO = {
      email: "examplegmail.com",
      first_name: "",
      last_name: "example",
      password: "123"
    }
    const req = await request(app).post("/user").type("form").send(user).expect(400)
    expect(req?.body?.message?.id).toBeUndefined()
    if(req?.body?.message?.id) {
      MYSQL.query("DELETE * FROM users WHERE id = ? ", [req.body.message.id])
    }
  })

  test("Should not be able to create user when invalid last name", async () => {
    const user : CreateUserRequestDTO = {
      email: "examplegmail.com",
      first_name: "user",
      last_name: "",
      password: "teste123"
    }
    const req = await request(app).post("/user").type("form").send(user).expect(400)
    expect(req?.body?.message?.id).toBeUndefined()
    if(req?.body?.message?.id) {
      MYSQL.query("DELETE * FROM users WHERE id = ? ", [req.body.message.id])
    }
  })
})