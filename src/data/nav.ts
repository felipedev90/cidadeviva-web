export type NavLink = {
  label: string
  href: string
}

export const NAV_BAR_DATA = [
  { label: 'Início', href: '/' },
  { label: 'Ciclismo', href: '/?category=ciclismo' },
  { label: 'Gastronomia', href: '/?category=gastronomia' },
  { label: 'Cultura', href: '/?category=cultura' },
  { label: 'Eventos', href: '/?category=eventos' },
] as const satisfies NavLink[]
