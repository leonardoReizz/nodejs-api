import jwt from "jsonwebtoken";
import { env } from "../env";

export function generateJWT(userId: number) {
  const payload = {
    userId,
  };

  const secretKey = env.JWT_SECRET;

  const options: jwt.SignOptions = {
    expiresIn: "8h",
  };

  const token = jwt.sign(payload, secretKey, options);
  return { token };
}
