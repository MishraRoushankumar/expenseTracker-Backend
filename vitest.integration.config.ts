import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config({
  path: ".env.test.local",
  quiet: true,
});

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./tests/integration/setup.ts"],
    include: ["tests/integration/**/*.test.ts"],
    fileParallelism: false,
    coverage: {
      provider: "v8",
      enabled: false,
    },
  },
});
