export default defineConfig({
  resolve: {
    preserveSymlinks: true,
  },
  optimizeDeps: {
    include: [],
    exclude: [],
  },
  build: {
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom'],
        framer: ['framer-motion'],
        icons: ['lucide-react'],
      },
    },
  },
}
});