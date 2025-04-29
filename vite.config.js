

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    port: 5174, // New port
    host: '127.0.0.1', // Force IPv4
    proxy: {
      '/api': {
        target: 'https://hubly-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});