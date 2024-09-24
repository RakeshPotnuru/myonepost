import { z } from "zod";

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof ZodEnvironmentVariables> {}
  }
}

const ZodEnvironmentVariables = z.object({
  NODE_ENV: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string(),
});

ZodEnvironmentVariables.parse(process.env);

console.log("✅ Environment variables verified!");
