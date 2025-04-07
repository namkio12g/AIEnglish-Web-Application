import {
  defineConfig
} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: { // Corrected 'server' from 'sever'
    proxy: {
      '/api': {
        target: process.env.BACK_END_URL || 'http://localhost:3000', // Ensure this URL is correct
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove the '/api' prefix before sending the request to the backend
        logLevel: 'debug',
      },
    },
    port: 3100,
  },
});
