import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginChecker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [react(), pluginChecker({ typescript: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
