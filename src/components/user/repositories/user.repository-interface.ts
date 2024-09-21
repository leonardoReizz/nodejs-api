import { User } from "../model/user";

export interface UserRepositoryInterface {
  create: (user: Omit<User, "created_at" | "id">) => Promise<Number>;
  getById: (id: string) => Promise<Omit<User, "hashed_password"> | null>;
}