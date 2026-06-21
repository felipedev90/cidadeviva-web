export type HeroImage = {
  src: string
  alt: string
}

export type HeroLink = {
  label: string
  href: string
}

export const HERO_IMAGE: HeroImage = {
  src: '/images/hero/hero2.webp',
  alt: 'Imagem da igreja Matriz de Jundiaí',
}

export const HERO_LINKS: HeroLink[] = [
  { label: 'Ciclismo', href: '/?category=ciclismo' },
  { label: 'Gastronomia', href: '/?category=gastronomia' },
  { label: 'Cultura', href: '/?category=cultura' },
  { label: 'Eventos', href: '/?category=eventos' },
]
