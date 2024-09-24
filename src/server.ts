import { Request, Response } from "express";
import app from "./app";
import dotenv from "dotenv";
import { ZodError } from "zod";
import { env } from "./env";
import { BadRequestException } from "./errors/BadRequestException";
import { UnauthorizedException } from "./errors/UnauthorizedException";

dotenv.config();

app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (error instanceof UnauthorizedException) {
    return res.status(401).json({
      message: error.message,
    });
  }

  if (error instanceof BadRequestException) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return res.status(500).json({ message: error.message });
});

if (env.NODE_ENV !== "test") {
  app.listen(env.PORT, () => {
    console.log("Express connected, port: " + env.PORT);
  });
}

export { app };
