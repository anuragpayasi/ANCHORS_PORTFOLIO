import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  // --- Faster local dev (important for monorepo) ---
  server: {
    host: true,
    port: 5173,
    open: false,
    strictPort: true,
  },

  // --- For monorepo support (very important) ---
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },

  // --- Handling large build sizes properly ---
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 900,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('framer-motion')) {
              return 'framer';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@reduxjs') || id.includes('zustand')) {
              return 'state';
            }
          }
        },
      },
    },
  },

  // --- Path Aliases / TS Config Paths ---
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});