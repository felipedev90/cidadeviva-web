import type { Locator, Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { login } from './utils'

const postSlug = process.env.E2E_POST_SLUG
if (!postSlug) {
  throw new Error('E2E_POST_SLUG precisa estar definido em .env.e2e.local')
}

test.beforeEach(async ({ page }) => {
  await login(page)
  await page.goto(`/posts/${postSlug}`)
})

// Cria um comentário e retorna um locator estável (por data-testid) para ele.
// Não usamos um locator baseado no texto porque, ao editar, o <p> vira <textarea>
// e o texto original some do DOM — o data-testid não muda.
async function createComment(page: Page, content: string): Promise<Locator> {
  await page.getByPlaceholder('Escreva um comentário...').fill(content)
  await page.getByRole('button', { name: 'Comentar' }).click()

  const byContent = page.locator('[data-testid^="comment-"]').filter({ hasText: content })
  await expect(byContent).toBeVisible()

  const testId = await byContent.getAttribute('data-testid')
  return page.getByTestId(testId as string)
}

async function deleteComment(page: Page, comment: Locator) {
  page.once('dialog', (dialog) => dialog.accept())
  await comment.getByRole('button', { name: 'Excluir comentário' }).click()
  await expect(comment).not.toBeVisible()
}

test('cria um comentário e ele aparece na lista sem reload', async ({ page }) => {
  const content = `Comentário de teste E2E ${Date.now()}`

  const comment = await createComment(page, content)
  await expect(comment).toContainText(content)

  await deleteComment(page, comment)
})

test('edita o próprio comentário e vê o texto atualizado', async ({ page }) => {
  const originalContent = `Comentário para editar ${Date.now()}`
  const editedContent = `${originalContent} (editado)`

  const comment = await createComment(page, originalContent)

  await comment.getByRole('button', { name: 'Editar comentário' }).click()
  await comment.getByRole('textbox').fill(editedContent)
  await comment.getByRole('button', { name: 'Salvar' }).click()

  await expect(comment).toContainText(editedContent)

  await deleteComment(page, comment)
})

test('deleta o próprio comentário e ele some da lista', async ({ page }) => {
  const content = `Comentário para deletar ${Date.now()}`

  const comment = await createComment(page, content)

  await deleteComment(page, comment)
})
