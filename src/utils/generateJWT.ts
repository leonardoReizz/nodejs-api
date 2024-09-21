import jwt from "jsonwebtoken";
import { env } from "../env";

export function generateJWT(role: string, userId: string) {
  const payload = {
    role,
    userId,
  };

  const secretKey = env.JWT_SECRET;

  const options: jwt.SignOptions = {
    expiresIn: "2h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return { token };
}
