import { NextFunction, Request, Response } from "express";
import { AuthenticationUseCase } from "./authentication.use-case";
import { z } from "zod";

export class AuthenticationController {
  constructor(private authenticationUseCase: AuthenticationUseCase) {}

  async handle(request: Request, response: Response, next: NextFunction) {
    const schema = z.object({
      email: z.string().email().max(100),
      password: z.string().min(8).max(32),
    });

    try {
      const data = schema.parse(request.body);
      const res = await this.authenticationUseCase.execute(data);
      return response.status(200).json({ message: res });
    } catch (error) {
      next(error);
    }
  }
}
