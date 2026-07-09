import { cookies } from 'next/headers'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { redirectToLogin } from './auth'
import { apiFetch } from './client'

// vi.mock é "hoisted" pelo Vitest para antes dos imports acima, então `cookies` e
// `clearAuthAndRedirect` importados já vêm como as versões mockadas.
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}))

vi.mock('./auth', () => ({
  redirectToLogin: vi.fn(),
}))

function mockCookies(token?: string) {
  vi.mocked(cookies).mockResolvedValue({
    get: vi.fn().mockReturnValue(token ? { value: token } : undefined),
  } as unknown as Awaited<ReturnType<typeof cookies>>)
}

beforeEach(() => {
  vi.resetAllMocks()
  mockCookies()
})

describe('apiFetch', () => {
  it('retorna o JSON da resposta quando o status é de sucesso', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue({ mensagem: 'ok' }),
      }),
    )

    const result = await apiFetch('/qualquer-coisa')

    expect(result).toEqual({ mensagem: 'ok' })
  })

  it('não chama .json() e retorna undefined quando o status é 204', async () => {
    const json = vi.fn()
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
        json,
      }),
    )

    const result = await apiFetch('/qualquer-coisa')

    expect(result).toBeUndefined()
    expect(json).not.toHaveBeenCalled()
  })

  it('chama redirectToLogin quando o status é 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: vi.fn(),
      }),
    )

    // redirectToLogin está mockado e não lança (diferente do redirect() real do
    // Next.js, que interrompe a execução). Por isso a promise ainda rejeita aqui em
    // seguida — no app de verdade isso nunca é alcançado.
    await expect(apiFetch('/qualquer-coisa')).rejects.toThrow()
    expect(redirectToLogin).toHaveBeenCalledOnce()
  })

  it('lança um Error com a mensagem esperada quando a resposta não é ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: vi.fn(),
      }),
    )

    await expect(apiFetch('/meu-endpoint')).rejects.toThrow('Erro 500 em /meu-endpoint')
  })
})
