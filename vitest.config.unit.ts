import { defineConfig } from 'vitest/config'

// Config separado do vitest.config.ts (que é do Storybook) para não depender
// dos presets do Storybook só para rodar os testes unitários em src/**/*.test.ts.
export default defineConfig({
  test: {
    name: 'unit',
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
