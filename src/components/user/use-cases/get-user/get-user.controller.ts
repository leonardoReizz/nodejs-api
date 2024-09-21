import { z } from "zod";
import { GetUserUseCase } from "./get-user.use-case";
import { NextFunction, Request, Response } from "express";

export class GetUserController {
  constructor (private getUserUseCase: GetUserUseCase){}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      first_name: z.string().max(20),
      last_name: z.string().max(20),
      email: z.string().email().max(100),
      password: z.string().min(8).max(32),
    })

    try {
      const parsedData = schema.parse(request.body)
      const user = await this.getUserUseCase.execute("")

      return response.status(200).json({message: user})
    } catch (error) {
      next(error)
    }
  
  }
}