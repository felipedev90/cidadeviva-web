import { defineConfig, devices } from '@playwright/test'

process.loadEnvFile('.env.e2e.local')

export default defineConfig({
  testDir: './e2e',
  // Os testes rodam contra a API de produção e compartilham o mesmo usuário/post de
  // teste, então rodam um de cada vez pra não ter dois testes mexendo no mesmo
  // comentário ao mesmo tempo.
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})
