import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      name: "pf2e-expanded-summoner",
      entry: "src/main.ts",
      formats: ["es"],
      fileName: "pf2e-expanded-summoner",
    },
  }
});
