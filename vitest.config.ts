import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.spec.ts"],
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/**",
        "dist/**",
        "tests/**",
        "src/server.ts",
        "src/types/**",
        "**/*.d.ts",
        "**/*.config.*",
        "vitest.config.ts",
        "tsconfig.json"
      ]
    }
  }
});
