import { User } from "../../model/user"
import { UserRepositoryInterface } from "../user.repository-interface"

export class UserMemoryRepository implements UserRepositoryInterface {
    public users: User[] = []
    
    async getByEmailWithPassword(email: string): Promise<User | undefined> {
        const user = this.users.find((t) => t.email === email)
        return user
    }
    
    async getByEmail(email: string): Promise<Omit<User, "hashed_password"> | undefined> {
        const user = this.users.find((t) => t.email === email)
        if (user) {
            const {hashed_password, ...rest} = user
            return rest
        }
        return user
    }


    async getById(id: number): Promise<Omit<User, "hashed_password"> | undefined> {
        const user = this.users.find((t) => t.id === id);
        if(user) {
            const {hashed_password, ...rest } = user
            return rest
        }
        return user
    }


    async create(user: Omit<User, "created_at" | "id">): Promise<number> {
        const id = (this.users?.[this.users.length -1]?.id+1 || 1)
        this.users  = [...this.users, {...user, created_at: new Date().toString(), id}]
        return id
    }
}