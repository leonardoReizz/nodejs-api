import { z } from "zod";
import { CreateUserUseCase } from "./create-user.use-case";
import { NextFunction, Request, Response } from "express";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      first_name: z.string().min(3).max(20),
      last_name: z.string().min(3).max(20),
      email: z.string().email().max(100),
      password: z.string().min(8).max(32),
    });

    try {
      const parsedData = schema.parse(request.body);
      const userId = await this.createUserUseCase.execute(parsedData);

      return response.status(200).json({ message: { id: userId } });
    } catch (error) {
      next(error);
    }
  }
}
