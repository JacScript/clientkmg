import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    exclude: [
      'lightningcss',
      'fsevents',
      '@tailwindcss/vite',
      'tailwindcss'
    ],
    force: true ,
    esbuildOptions: {
      target: 'esnext'
    }
  },
  define: {
    global: 'globalThis',
  },
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    rollupOptions: {
      external: ['fsevents', 'lightningcss']
    }
  }
})