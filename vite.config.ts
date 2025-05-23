import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgrPlugin from "vite-plugin-svgr";
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    exclude: [
      ...configDefaults.exclude,
    ],
    include: [
      'src/**/*.test.ts',
      'src/**/*.test.tsx'
    ]
  },
});