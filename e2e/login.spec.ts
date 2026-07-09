import { expect, test } from '@playwright/test'

import { login } from './utils'

test('usuário faz login e é redirecionado para o dashboard vendo seu nome na navbar', async ({
  page,
}) => {
  await login(page)

  await expect(page).toHaveURL('/dashboard')

  // Nome do usuário aparece no header do dashboard (span com a classe text-on-dark,
  // única entre os spans do header — ver DashboardNav.tsx).
  const userNameLocator = page.locator('header span.text-on-dark')
  await expect(userNameLocator).toBeVisible()
  await expect(userNameLocator).not.toHaveText('')
})
