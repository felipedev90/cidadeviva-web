type InstitutionalLinks = {
  label: string
  href: string
}

type SocialMediaLinks = {
  platform: 'github' | 'linkedin' | 'portfolio'
  href: string
}

export const INSTITUTIONAL_LINKS: InstitutionalLinks[] = [
  { label: 'Sobre nós', href: '/' },
  { label: 'Contato', href: '/' },
  { label: 'Anuncie aqui', href: '/' },
  { label: 'Privacidade', href: '/' },
]

export const SOCIAL_MEDIA_LINKS: SocialMediaLinks[] = [
  { platform: 'github', href: 'https://www.github.com/felipedev90' },
  { platform: 'linkedin', href: 'https://www.linkedin.com/in/felipesilva90' },
  { platform: 'portfolio', href: 'https://www.devfelipeaugusto.com.br' },
]
