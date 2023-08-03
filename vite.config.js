import { resolve } from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig(({ mode }) => {
  return {
    root,
    build: {
      outDir,
      rollupOptions: {
        input: {
          app: resolve(root, "app", "index.html"),
          tool: resolve(root, "tool", "index.html"),
        },
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "dist/stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
        ],
      },
    },
  };
});
