import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export interface AuthenticatedRequest extends Request {
  userId: number;
}

interface Decoded extends jwt.JwtPayload {
  userId?: number;
}

export function verifyJWT(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const secretKey = env.JWT_SECRET;
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded: Decoded = jwt.verify(token, secretKey) as Decoded;
    if (!decoded?.userId)
      return response.status(401).json({ message: "Not authenticated" });
    (request as AuthenticatedRequest).userId = decoded.userId as number;
    next();
  } catch (error) {
    return response.status(401).json({ message: "Not authenticated" });
  }
}
