import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/itbank",
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        error: "./404.html",
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: new URL("./src", import.meta.url).pathname,
      },
      {
        find: "@components",
        replacement: new URL("./src/components", import.meta.url).pathname,
      },
      {
        find: "@app",
        replacement: new URL("./src/app", import.meta.url).pathname,
      },
      {
        find: "@types",
        replacement: new URL("./src/types.d.ts", import.meta.url).pathname,
      },
    ],
  },
});
