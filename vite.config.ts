// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // слушать все интерфейсы
  },
  preview: {
    port: 10000,
    host: true,
    allowedHosts: [
      'car-frontend-lp3p.onrender.com',
      'localhost',
      '127.0.0.1',
      '0.0.0.0'
    ]
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
        }
      }
    },
    chunkSizeWarningLimit: 1000, // увеличим лимит предупреждения
  }
})