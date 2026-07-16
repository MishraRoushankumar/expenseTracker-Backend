import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    environment: "node",

    setupFiles: ["./tests/integration/setup.ts"],

    include: ["tests/integration/**/*.test.ts"],

    coverage: {
      provider: "v8",

      enabled: false,
    },
  },
});
