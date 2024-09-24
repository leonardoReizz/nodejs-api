import "dotenv/config"
import { z } from "zod";

const envScheme = z.object({
  NODE_ENV: z.string(),
  JWT_SECRET: z.string(),
  MYSQL_HOST: z.string(),
  MYSQL_USER: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string(),
  PORT: z.coerce.number().default(5000).optional()
})

const _env = envScheme.safeParse(process.env);

if(_env.success === false) {
  console.error("Invalid Enviroments Variables", _env.error.format())
  throw new Error("Invalid Enviroments Variables")
}

export const env = _env.data