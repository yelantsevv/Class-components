import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Class-components/',
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
    coverage: {
      thresholds: {
        // statements: 80,
        // branches: 50,
        // functions: 50,
        // lines: 50,
      },
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/main.tsx',
        '**/types/**',
        '**/__tests__/**',
        '**/vite-env.d.ts',
      ],
    },
  },
});
