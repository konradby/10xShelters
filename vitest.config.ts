import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: [
      'node_modules/',
      'src/test/',
      '**/*.d.ts',
      '**/*.spec.{ts,tsx}',
      '**/*.config.{ts,js}',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.spec.{ts,tsx}',
        '**/*.config.{ts,js}',
      ],
    },
    deps: {
      inline: ['@testing-library/react'],
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
