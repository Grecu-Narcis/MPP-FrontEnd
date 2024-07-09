/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

import {configDefaults} from 'vitest/config'
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
  ],
  
  server: {
    port: 3000,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    pool: 'forks',
    exclude: [
      ...configDefaults.exclude,
      './src/types/**'
    ],
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        '**/src/types/**',
        '.eslintrc.cjs',
        '**/src/vite-env.d.ts',
        '**/src/index.tsx',
        '**/src/main.tsx',
        '**/src/models/User.ts',
        '**/src/contexts/**',
        '**/src/App.tsx'
      ]
    },
  },
  define: {
    global: 'window',
  },
})
