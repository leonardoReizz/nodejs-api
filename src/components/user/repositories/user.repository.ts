import { type ResultSetHeader } from "mysql2"
import MYSQL from "../../../services/mysql/connection";
import { User, UserResultSetHeader } from "../model/user";
import { UserRepositoryInterface } from "./user.repository-interface";

export class UserRepository implements UserRepositoryInterface {
  getByEmail (email: string): Promise<Omit<User, "hashed_password"> | undefined> {
    const sql = "SELECT id, first_name, last_name, email, created_at FROM users WHERE email = ?"
    return new Promise<Omit<User, "hashed_password"> & ResultSetHeader | undefined>(async (resolve, reject) => {
      MYSQL.query<Omit<UserResultSetHeader, "hashed_password">[]>(
        sql,
        [email],
        (error, results) => {
          if(error) {
            reject(error)
          } else{
            resolve(results?.[0])
          }
        }
      )
    })
  }
  
  getByEmailWithPassword (email: string): Promise<User | undefined> {
    const sql = "SELECT * FROM users WHERE email = ?"
    return new Promise<User | undefined>(async (resolve, reject) => {
      MYSQL.query<UserResultSetHeader[]>(
        sql,
        [email],
        (error, results) => {
          if(error) {
            reject(error)
          } else{
            resolve(results?.[0])
          }
        }
      )
    })
  }

  getById (id: number) {
    const sql = "SELECT id, first_name, last_name, email, created_at FROM users WHERE id = ?"
    return new Promise<Omit<User, "hashed_password"> | undefined>((resolve, reject) => {
      MYSQL.query<UserResultSetHeader[]>(
        sql,
        [id],
        (error, results) => {
          if(error) {
            reject(error)
          } else{
            resolve(results?.[0])
          }
        }
      )
    })
  }

  create(user: Omit<User, "created_at" | "id">) {
    const sql = "INSERT INTO users (first_name, last_name, email,hashed_password) VALUES(?,?,?,?)"

    return new Promise<number>((resolve, reject) => {
      MYSQL.query<ResultSetHeader>(
        sql, 
        [user.first_name, user.last_name, user.email, user.hashed_password],
        (error, results) => {
          if (error) {
            reject(error)
          } else {
            resolve(results.insertId)
          }
        }
      )
    })
  }
}