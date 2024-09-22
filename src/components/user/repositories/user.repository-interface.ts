import { User } from "../model/user";

export interface UserRepositoryInterface {
  create: (user: Omit<User, "created_at" | "id">) => Promise<number>;
  getById: (id: number) => Promise<Omit<User, "hashed_password"> | undefined>;
  getByEmail: (email: string ) => Promise<Omit<User, "hashed_password"> | undefined>
}