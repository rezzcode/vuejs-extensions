import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist/temp',
    emptyOutDir: true,
    lib: {
      entry: resolve(process.cwd(), './src/content/index.ts'),
      name: 'ContentScript',
      fileName: 'content',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});