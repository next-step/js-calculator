import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  test: {
    includeSource: ["./test/**/*.js"],
  },
  plugins: [eslintPlugin.default()],
});
