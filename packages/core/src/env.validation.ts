import { z } from "zod";

export const validationSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test", "provision"])
    .default("development"),
  PORT: z.coerce.number().int().default(4000),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  JWT_SECRET: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  MUX_TOKEN_ID: z.string(),
  MUX_TOKEN_SECRET: z.string(),
  MUX_WEBHOOK_SECRET: z.string(),
  CLIENT_URL: z.string(),
  BASE_URL: z.string(),
  GCS_BUCKET_NAME: z.string(),
  GC_PROJECT_ID: z.string(),
  GC_PRIVATE_KEY_ID: z.string(),
  GC_PRIVATE_KEY: z.string(),
  GC_CLIENT_EMAIL: z.string(),
  GC_CLIENT_ID: z.string(),
});

export type Env = z.infer<typeof validationSchema>;
