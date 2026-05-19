import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-standalone',
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
        name: 'HealthSphereApp',
        inlineDynamicImports: true,
        entryFileNames: 'app.js',
        assetFileNames: 'app.[ext]',
      },
    },
  },
  base: './',
})
