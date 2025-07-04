import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  build: {
    outDir: '../static/dist',
    emptyOutDir: true,
  }
})