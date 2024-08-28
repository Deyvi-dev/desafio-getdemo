import { defineConfig } from 'vitest/config.js';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'src/config/',
        'src/routes/',
        'src/models/',
        'src/utils/',
        'scripts/',
      ],
    },
  },
});
