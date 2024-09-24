import { GetUserUseCase } from "./get-user.use-case";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../../utils/verifyJWT";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const userId = request.userId;
      const user = await this.getUserUseCase.execute(userId);

      return response.status(200).json({ message: user });
    } catch (error) {
      next(error);
    }
  }
}
