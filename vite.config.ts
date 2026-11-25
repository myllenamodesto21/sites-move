import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Três rotas independentes (multi-page): cada uma carrega só o próprio código,
// e os componentes comuns viram blocos compartilhados.
export default defineConfig(({ mode }) => ({
  // Na prévia, caminhos relativos para abrir em qualquer endereço.
  base: mode === "previa" ? "./" : "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: mode === "previa" ? "dist-previa" : "dist",
    rollupOptions: {
      input: {
        inicio: resolve(__dirname, "index.html"),
        planejamento: resolve(__dirname, "planejamento/index.html"),
        links: resolve(__dirname, "links/index.html"),
        black: resolve(__dirname, "black/index.html"),
        privacidade: resolve(__dirname, "privacidade/index.html"),
        termos: resolve(__dirname, "termos/index.html"),
        metodo: resolve(__dirname, "metodo/index.html"),
        jornada: resolve(__dirname, "jornada/index.html"),
      },
    },
  },
}));
