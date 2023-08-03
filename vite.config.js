import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        app: resolve(root, "app", "index.html"),
        tool: resolve(root, "tool", "index.html"),
      },
    },
  },
});
