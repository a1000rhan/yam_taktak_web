import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: "/",
    define: {
      "process.env": env,
    },
    server: {
      port: 8080,
    },
    build: {
      outDir: "./build",
      emptyOutDir: true, // also necessary
    },
    plugins: [react(), splitVendorChunkPlugin()],
  };
});
