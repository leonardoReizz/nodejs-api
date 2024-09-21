import MYSQL from "../../../services/mysql";
import { User } from "../model/user";
import { UserRepositoryInterface } from "./user.repository-interface";

export class UserRepository implements UserRepositoryInterface {
  async getById (id: string) {
    const sql = "SELECT id, first_name, last_name, email, created_at FROM users WHERE id = ?"
    
    return new Promise<Omit<User, "hashed_password"> | null>((resolve, reject) => {
      MYSQL.query(
        sql,
        [id],
        (error, results) => {
          if(error) {
            reject(error)
          } else{
            if (results?.[0]) {
              resolve(results?.[0])
            } else {
              resolve(null)
            }
          }
        }
      )
    })
  
  }


  async create(user: Omit<User, "created_at" | "id">) {
    const sql = "INSERT INTO users (first_name, last_name, email,hashed_password) VALUES(?,?,?,?)"

    return new Promise<Number>((resolve, reject) => {
      MYSQL.query(
        sql, 
        [user.first_name, user.last_name, user.email, user.hashed_password],
        (error, results) => {
          if (error) {
            reject(error)
          } else {
            resolve(1)
          }
        }
      )
    })
  }
}