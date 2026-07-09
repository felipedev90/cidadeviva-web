import { expect, test } from '@playwright/test'

test('redireciona para /auth/login ao acessar /dashboard com cookie de sessão inválido', async ({
  page,
  context,
}) => {
  await context.addCookies([
    {
      name: 'auth-token',
      value: 'token-invalido-e-expirado',
      url: 'http://localhost:3000',
    },
  ])

  await page.goto('/dashboard')

  await expect(page).toHaveURL('/auth/login')
})
