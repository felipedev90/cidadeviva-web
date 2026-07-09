import { describe, expect, it } from 'vitest'

import { formattedDate } from './formattedDate'

describe('formattedDate', () => {
  it('formata uma data ISO para o padrão "dd mmm aaaa" em pt-BR', () => {
    expect(formattedDate('2026-03-05T12:00:00.000Z')).toBe('05 mar 2026')
  })

  it('retorna "Invalid Date" quando a string não é uma data válida', () => {
    // formattedDate hoje não trata esse caso — este teste documenta o
    // comportamento atual, não um comportamento desejado.
    expect(formattedDate('não-é-uma-data')).toBe('Invalid Date')
  })
})
