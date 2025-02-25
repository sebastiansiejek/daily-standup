import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,ts,jsx,tsx}'],
      exclude: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']
    }
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src')
    }
  }
}) 