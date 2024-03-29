import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    svgLoader({
      defaultImport: 'component' // or 'raw'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // this will be on all components
        additionalData: `@use "sass:math";`
      }
    },
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  build:{
    rollupOptions: {
      output: {
        manualChunks,
      },
    },    
  }
})


function manualChunks(id: string) {
  const fndIdx = chunkVendors.findIndex((el) =>
    id.includes("node_modules/" + el.compare)
  );
  if (fndIdx >= 0) {
    return "vendors_" + chunkVendors[fndIdx].filename;
  } else if (id.includes("node_modules")) {
    return "vendors";
  }
};


const chunkVendors = [
  { compare: "radix-vue", filename: "radix-vue" },
  { compare: "lucide-vue-next", filename: "lucide-vue-next" },
  { compare: "class-variance-authority", filename: "class-variance-authority" },
  { compare: "pinia", filename: "pinia" },
  { compare: "tailwind-merge", filename: "tailwind-merge" },
  { compare: "@vueuse/core", filename: "at-vueuse-core" },
  { compare: "@faker-js/faker", filename: "at-faker-js" },
];
