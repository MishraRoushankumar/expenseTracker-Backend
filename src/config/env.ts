import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("5000"),

  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  JWT_SECRET: z.string().min(10, "JWT_SECRET is too short"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variable");

  for (const issue of parsedEnv.error.issues) {
    console.error(`${issue.path.join(".")} → ${issue.message}`);
  }

  process.exit(1);
}

export const env = parsedEnv.data;
