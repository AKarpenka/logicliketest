import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Оптимизация для уменьшения размера bundle
    minify: 'terser',
    rollupOptions: {
      output: {
        // Разделяем vendor и app код
        manualChunks: {
          vendor: ['react', 'react-dom'],
          antd: ['antd'],
        },
        // Оптимизация имен файлов
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Увеличиваем лимит для предупреждений о размере
    chunkSizeWarningLimit: 1000,
  },
  // Оптимизация dev сервера
  server: {
    hmr: {
      overlay: false, // Отключаем overlay для лучшей производительности
    },
  },
})