import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        { 
          src: 'netlify/functions/*', 
          dest: 'dist/netlify/functions'
        }
      ],
      hook: 'writeBundle'
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});