import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// This repo is a GitHub *user* page (DimitarLilov.github.io), so it is
// served from the domain root — base stays "/".
// If you ever turn this into a *project* page instead, change base to
// "/your-repo-name/".
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
  },
});
