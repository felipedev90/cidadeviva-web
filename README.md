# Cidade Viva

Blog independente sobre a vida em Jundiaí — a terra da uva. Cobre o que dá pra fazer, comer, pedalar e viver na cidade, com matérias organizadas por categoria (ciclismo, gastronomia, cultura e eventos), sistema de comentários e um painel para gerenciar publicações.

## Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Linguagem**: TypeScript 5 (strict + `noUncheckedIndexedAccess`)
- **Estilo**: Tailwind CSS v4 (CSS-first com `@theme inline`)
- **Dados**: TanStack Query, React Hook Form + Zod
- **Qualidade**: ESLint 9 (flat config), Prettier, Husky, lint-staged, commitlint

## Funcionalidades

- Página inicial com destaques, lista de posts paginada por categoria e newsletter
- Página de post individual (`/posts/[slug]`)
- Comentários (criar, editar e excluir) via React Query
- Autenticação (login/registro) e área de dashboard protegida
- CRUD de posts pelo dashboard (`/dashboard/posts/new`, `/dashboard/posts/[slug]/edit`)
- SEO: `robots.ts` e `sitemap.ts` gerados dinamicamente

O front-end consome uma API externa (posts, comentários e autenticação) configurada via `API_URL`.

## Como rodar

```bash
npm install
npm run dev
```

Crie um `.env.local` na raiz com a URL da API:

```
API_URL=http://localhost:xxxx
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Descrição                      |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento    |
| `npm run build`        | Build de produção              |
| `npm run start`        | Serve o build de produção      |
| `npm run lint`         | Roda o ESLint                  |
| `npm run lint:fix`     | ESLint com auto-fix            |
| `npm run typecheck`    | Checagem de tipos (TypeScript) |
| `npm run format`       | Formata com Prettier           |
| `npm run format:check` | Verifica formatação            |

## Estrutura de pastas

```
src/
├── app/                  # Rotas (App Router): (public), (auth), (dashboard), api/
├── components/
│   ├── ui/               # Primitivos reutilizáveis
│   ├── sections/         # Composições específicas de página
│   ├── layout/           # Nav, MenuOverlay, etc.
│   └── providers/        # Providers globais (React Query, etc.)
├── data/                 # Fonte única de dados estáticos (constants)
├── types/                # Tipagens compartilhadas
├── lib/                  # Utilities puras e client de API
└── hooks/                # Custom hooks
```

## Convenções

- Conventional Commits com scope obrigatório em kebab-case (`feat(hero): add cta button`)
- Branches: `feat/*`, `fix/*`, `chore/*`, `refactor/*`, `test/*`
- Componentes em PascalCase; demais arquivos em kebab-case
- Conteúdo/strings para o usuário em pt-BR; identificadores em inglês
- Dados estáticos com `as const satisfies Type`

Veja [AGENTS.md](AGENTS.md) para o guia completo de convenções do projeto.
