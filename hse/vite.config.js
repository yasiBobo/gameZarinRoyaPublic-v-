// vite.config.js
import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3004', // Update this to the correct port
        changeOrigin: true,
      },
    },
  },
};