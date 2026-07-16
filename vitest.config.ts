import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,

    environment: "node",

    setupFiles: ["./tests/setup.ts"],

    include: ["tests/**/*.test.ts"],

    fileParallelism: false,

    coverage: {
      provider: "v8",

      reporter: ["text", "text-summary", "html", "lcov"],

      reportsDirectory: "./coverage",

      exclude: [
        "tests/**",
        "dist/**",
        "node_modules/**",
        "**/*.d.ts",
        "**/openapi/**",
      ],
    },
  },
});
