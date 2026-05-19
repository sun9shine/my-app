import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'app.js',
        inlineDynamicImports: true,
        manualChunks: undefined,
      },
    },
  },
  base: './',
})
