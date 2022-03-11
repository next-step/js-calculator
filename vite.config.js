import { defineConfig } from "vitest/config";
import * as eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  test: {
    includeSource: ["./test/**/*.js"],
  },
  plugins: [eslintPlugin.default()],
});
