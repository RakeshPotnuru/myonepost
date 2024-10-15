import { z } from "zod";

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test", "provision"])
    .default("development"),
  PORT: z.coerce.number().int().default(4000),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  JWT_SECRET: z.string(),
  CLOUDINARY_URL: z.string(),
  MUX_TOKEN_ID: z.string(),
  MUX_TOKEN_SECRET: z.string(),
  MUX_WEBHOOK_SECRET: z.string(),
  CLIENT_URL: z.string(),
});

export type Env = z.infer<typeof validationSchema>;
