import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  CORS_ORIGIN: z.string().optional(),

  JWT_SECRET: z.string().min(10, "JWT_SECRET is too short"),

  DB_HOST: z.string(),

  DB_PORT: z.coerce.number(),

  DB_NAME: z.string(),

  DB_USER: z.string(),

  DB_PASSWORD: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  process.stderr.write("❌ Invalid environment variables\n\n");

  for (const issue of parsedEnv.error.issues) {
    process.stderr.write(`• ${issue.path.join(".")} → ${issue.message}\n`);
  }

  process.exit(1);
}

export const env = parsedEnv.data;
