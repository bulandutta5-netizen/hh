import { defineConfig } from 'vite'

export default defineConfig({
  // Root is where index.html lives (already in project root)
  root: '.',
  
  // Output directory for production build
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Ensure assets are copied correctly
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        dashboard: './dashboard.html'
      }
    }
  },

  // Dev server settings
  server: {
    port: 3000,
    open: true // Auto-opens browser on npm run dev
  },

  // Preview server (after build)
  preview: {
    port: 4173,
    open: true
  }
})
