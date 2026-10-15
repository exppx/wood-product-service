import { defineConfig, coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    pool: "vmThreads",
    globals: true,
    setupFiles: "src/setupTests.ts",
    coverage: {
      reporter: "text",
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/shared/assets/images/**",
        "src/shared/ui/icons/**",
        "src/**/*.scss",
        "src/**/*index.ts",
      ],
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
