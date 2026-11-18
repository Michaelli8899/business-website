import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

/**
 * VITE_BASE_PATH sets the path the site is served under — "/business-website/"
 * for a GitHub Pages project site, "/" for a custom domain.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = `/${(env.VITE_BASE_PATH || "").replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");
  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: { port: 3000 },
    preview: { port: 4173 },
  };
});
