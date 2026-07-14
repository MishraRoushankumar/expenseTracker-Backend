import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    environment: "node",

    setupFiles: ["./tests/setup.ts"],

    include: ["tests/**/*.test.ts"],

    coverage: {
      provider: "v8",

      reporter: ["text", "html", "lcov"],

      reportsDirectory: "./coverage",

      exclude: ["tests/**", "dist/**", "node_modules/**"],
    },
  },
});
