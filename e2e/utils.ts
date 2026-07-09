import type { Page } from '@playwright/test'

export async function login(page: Page) {
  const email = process.env.E2E_USER_EMAIL
  const password = process.env.E2E_USER_PASSWORD

  if (!email || !password) {
    throw new Error('E2E_USER_EMAIL e E2E_USER_PASSWORD precisam estar definidos em .env.e2e.local')
  }

  await page.goto('/auth/login')
  await page.getByPlaceholder('voce@email.com').fill(email)
  await page.getByPlaceholder('••••••••').fill(password)
  await page.getByRole('button', { name: 'Entrar' }).click()
  await page.waitForURL('/dashboard')
}
