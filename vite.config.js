import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Key: The path your frontend will use
      '/v1': { 
        // Target: The real API domain
        target: 'https://api.weatherapi.com',
        // Must be true to change the request host header to the target's host
        changeOrigin: true, 
        // If the target is HTTPS, this can sometimes help
        secure: false, 
      },
    },
  },
});