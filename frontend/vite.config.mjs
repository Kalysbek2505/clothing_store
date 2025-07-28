// vite.config.mjs
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  publicDir: 'public',
  resolve: {
    alias: {
      react:     path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    }
  },
  server: {
    proxy: {
      '/backend/api': 'http://127.0.0.1:8000'
    }
  }
});

