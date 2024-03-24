// vite.config.js
import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: 'dist', // Specify the output directory here
  },
});
